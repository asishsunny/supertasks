#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const PORT = parseInt(process.env.FIGMA_BRIDGE_PORT || '3333', 10);
const MCP_CMD = process.env.MCP_CMD || 'npx';
const MCP_ARGS = (process.env.MCP_ARGS || '-y figma-console-mcp@latest').split(' ');

// ── MCP process ──

let mcpProc = null;
let nextId = 1;
const pending = new Map();
let lineBuf = '';
let ready = false;

function startMcp() {
  mcpProc = spawn(MCP_CMD, MCP_ARGS, {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env },
  });

  mcpProc.stdout.on('data', (chunk) => {
    lineBuf += chunk.toString();
    let nl;
    while ((nl = lineBuf.indexOf('\n')) !== -1) {
      const line = lineBuf.slice(0, nl).trim();
      lineBuf = lineBuf.slice(nl + 1);
      if (!line) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id !== undefined && pending.has(msg.id)) {
          const { resolve, timer } = pending.get(msg.id);
          clearTimeout(timer);
          pending.delete(msg.id);
          resolve(msg);
        }
      } catch {}
    }
  });

  mcpProc.stderr.on('data', (chunk) => {
    const text = chunk.toString().trim();
    if (text) console.error(`[mcp] ${text}`);
  });

  mcpProc.on('exit', (code) => {
    console.error(`[mcp] exited ${code}`);
    for (const { resolve, timer } of pending.values()) {
      clearTimeout(timer);
      resolve({ error: { message: 'MCP process exited' } });
    }
    pending.clear();
  });
}

function rpc(method, params, timeout = 10000) {
  return new Promise((resolve) => {
    const id = nextId++;
    const timer = setTimeout(() => {
      pending.delete(id);
      resolve({ error: { message: `timeout after ${timeout}ms` } });
    }, timeout);
    pending.set(id, { resolve, timer });
    const msg = JSON.stringify({ jsonrpc: '2.0', id, method, params });
    mcpProc.stdin.write(msg + '\n');
  });
}

function notify(method, params) {
  const msg = JSON.stringify({ jsonrpc: '2.0', method, ...(params ? { params } : {}) });
  mcpProc.stdin.write(msg + '\n');
}

async function callTool(name, args = {}, timeout = 30000) {
  return rpc('tools/call', { name, arguments: args }, timeout);
}

// ── Initialize ──

async function initialize() {
  startMcp();

  const initRes = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'figma-bridge', version: '1.0.0' },
  }, 15000);

  if (initRes.error) {
    console.error('[bridge] initialize failed:', initRes.error);
    process.exit(1);
  }

  notify('notifications/initialized');
  console.error('[bridge] MCP initialized, probing Figma connection...');

  for (let i = 0; i < 30; i++) {
    const res = await callTool('figma_execute', { code: 'return "ok"', timeout: 3000 }, 5000);
    const text = res?.result?.content?.[0]?.text;
    if (text) {
      try {
        const parsed = JSON.parse(text);
        if (parsed.success && parsed.result === 'ok') {
          ready = true;
          console.error(`[bridge] Bridge ready on port ${PORT}`);
          return;
        }
      } catch {}
    }
    console.error(`[bridge] probe ${i + 1}/30 — waiting for Figma plugin...`);
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.error('[bridge] Figma plugin not connected after 30 retries');
  process.exit(1);
}

// ── Pre-warm ──

async function prewarm() {
  const ref = (name) => readFile(join(ROOT, 'reference', name), 'utf8').then(JSON.parse);

  const [compKeys, tokens, textStyles, effectStyles] = await Promise.all([
    ref('component-keys.json'),
    ref('tokens.json'),
    ref('text-styles.json'),
    ref('effect-styles.json'),
  ]);

  const compEntries = Object.values(compKeys);
  const varIds = Object.values(tokens.variableIds || {});
  const txtStyleKeys = Object.values(textStyles);
  const fxEntries = Object.values(effectStyles).map((e) => (typeof e === 'string' ? e : e.key));

  const code = `
const compKeys = ${JSON.stringify(compEntries)};
const varIds = ${JSON.stringify(varIds)};
const txtKeys = ${JSON.stringify(txtStyleKeys)};
const fxKeys = ${JSON.stringify(fxEntries)};

await Promise.all([
  figma.loadFontAsync({ family: 'Geist', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Geist', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
]);

const comps = (await Promise.all(compKeys.map(k => figma.importComponentByKeyAsync(k).catch(() => null)))).filter(Boolean).length;
const styles = (await Promise.all([...txtKeys, ...fxKeys].map(k => figma.importStyleByKeyAsync(k).catch(() => null)))).filter(Boolean).length;
const vars = (await Promise.all(varIds.map(id => figma.variables.getVariableByIdAsync(id).catch(() => null)))).filter(Boolean).length;

return { comps, styles, vars };
`;

  const t0 = Date.now();
  const res = await callTool('figma_execute', { code, timeout: 30000 }, 35000);
  const ms = Date.now() - t0;
  return { res, ms };
}

// ── HTTP server ──

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
  });
}

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/health') {
    return json(res, 200, { ok: true, ready });
  }

  if (req.method === 'POST' && url.pathname === '/execute') {
    const body = JSON.parse(await readBody(req));
    const t0 = Date.now();
    const result = await callTool('figma_execute', {
      code: body.code,
      ...(body.timeout ? { timeout: body.timeout } : {}),
    }, (body.timeout || 30000) + 5000);
    const ms = Date.now() - t0;
    return json(res, 200, { ...result, ms });
  }

  if (req.method === 'POST' && url.pathname === '/tool') {
    const body = JSON.parse(await readBody(req));
    const t0 = Date.now();
    const result = await callTool(body.name, body.args || {}, (body.timeout || 30000) + 5000);
    const ms = Date.now() - t0;
    return json(res, 200, { ...result, ms });
  }

  if (req.method === 'POST' && url.pathname === '/warm') {
    try {
      const { res: warmRes, ms } = await prewarm();
      return json(res, 200, { ...warmRes, ms });
    } catch (err) {
      return json(res, 500, { error: err.message });
    }
  }

  json(res, 404, { error: 'not found' });
});

// ── Lifecycle ──

function shutdown() {
  console.error('\n[bridge] shutting down...');
  server.close();
  if (mcpProc) {
    mcpProc.stdin.end();
    mcpProc.kill('SIGTERM');
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

await initialize();
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[bridge] port ${PORT} in use — kill existing or set FIGMA_BRIDGE_PORT`);
    if (mcpProc) mcpProc.kill('SIGTERM');
    process.exit(1);
  }
  throw err;
});
server.listen(PORT, () => {
  console.error(`[bridge] http://localhost:${PORT}`);
});
