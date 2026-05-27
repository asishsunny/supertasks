#!/usr/bin/env node
// Resolves raw extraction JSON into a COMPLETE runnable snippet.
// Usage: node resolve-snippet.mjs <name>
// Reads: figma/snippets/_raw/<name>.json + reference/{tokens,text-styles,effect-styles}.json
// Writes: figma/snippets/<name>-snippet.js

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

const name = process.argv[2];
if (!name) { console.error('Usage: node resolve-snippet.mjs <name>'); process.exit(1); }

const raw = JSON.parse(readFileSync(join(root, 'figma/snippets/_raw', `${name}.json`), 'utf8'));
const tokens = JSON.parse(readFileSync(join(root, 'reference/tokens.json'), 'utf8'));
const textStyles = JSON.parse(readFileSync(join(root, 'reference/text-styles.json'), 'utf8'));
const effectStyles = JSON.parse(readFileSync(join(root, 'reference/effect-styles.json'), 'utf8'));

// ── Helpers ──

function camel(str) {
  return str.replace(/[^a-zA-Z0-9]+/g, ' ').trim()
    .split(/\s+/)
    .map((w, i) => i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function shortName(n) {
  const parts = n.split('/');
  return parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '');
}

// ── Token map: variableId → camelName ──

const tokenByKey = {};
const varIdMap = tokens.variableIds || tokens;
if (typeof varIdMap === 'object' && !Array.isArray(varIdMap)) {
  for (const [tname, tval] of Object.entries(varIdMap)) {
    if (tval?.key) tokenByKey[tval.key] = { key: tval.key, name: tname, id: tval.id };
  }
} else {
  for (const t of varIdMap) tokenByKey[t.key] = t;
}

const varToToken = {};
const tLines = [];
const matchedTokens = {};
for (const vid of (raw.variableIds || [])) {
  const key = vid.replace('VariableID:', '').split('/')[0];
  const match = tokenByKey[key];
  if (match) {
    const cn = camel(match.name);
    varToToken[vid] = cn;
    if (!matchedTokens[cn]) {
      matchedTokens[cn] = true;
      tLines.push(`  ${cn}: '${vid}', // ${match.name}`);
    }
  }
}

// ── Style maps ──

const revTextStyles = {};
for (const [sname, skey] of Object.entries(textStyles)) revTextStyles[skey] = sname;

const revEffects = {};
for (const [ename, ekey] of Object.entries(effectStyles)) revEffects[ekey] = ename;

const styleMap = {}; // style key → camelName
const styleLines = [];
for (const [key, sname] of Object.entries(raw.styleKeys || {})) {
  if (revTextStyles[key]) {
    const cn = camel(sname);
    styleMap[key] = cn;
    styleLines.push(`  ${cn}: '${key}', // ${revTextStyles[key]}`);
  }
}

const effectMap = {}; // effect key → camelName
const effectLines = [];
for (const [key, sname] of Object.entries(raw.styleKeys || {})) {
  if (revEffects[key]) {
    const cn = camel(revEffects[key].split('/').pop());
    effectMap[key] = cn;
    effectLines.push(`  ${cn}: '${key}', // ${revEffects[key]}`);
  }
}

// ── COMP: unique variant names ──

function parseVariant(instName) {
  const variants = {};
  for (const part of instName.split(',').map(s => s.trim())) {
    const eq = part.indexOf('=');
    if (eq > 0) variants[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
  }
  return variants;
}

function makeCompName(inst) {
  if (!inst.set) return shortName(inst.name);
  const base = shortName(inst.set);
  const variants = parseVariant(inst.name);
  if (variants.Type) return base + shortName(variants.Type);
  const first = Object.values(variants)[0];
  if (first) return base + shortName(first);
  return base;
}

// Collect from tree
function collectTreeComps(node) {
  const comps = new Map();
  if (node.inst?.key) {
    comps.set(node.inst.key, { name: node.inst.name, set: node.inst.set });
  }
  if (node.children) {
    for (const child of node.children) {
      for (const [k, v] of collectTreeComps(child)) {
        if (!comps.has(k)) comps.set(k, v);
      }
    }
  }
  return comps;
}

// Collect INSTANCE_SWAP targets from overrides
function collectSwapComps(overrides) {
  const comps = new Map();
  for (const ov of (overrides || [])) {
    if (!ov.props) continue;
    for (const [, pv] of Object.entries(ov.props)) {
      if (pv && typeof pv === 'object' && pv.key && pv.name) {
        comps.set(pv.key, { name: pv.name, set: null });
      }
    }
  }
  return comps;
}

const treeComps = collectTreeComps(raw.tree || {});
const swapComps = collectSwapComps(raw.overrides);

// Collect components from override compKey fields (nested instance swaps)
const overrideComps = new Map();
for (const ov of (raw.overrides || [])) {
  if (ov.compKey && ov.compName) {
    overrideComps.set(ov.compKey, { name: ov.compName, set: null });
  }
}

const compNameToKey = {};
const compLines = [];
const allComps = new Map([...treeComps, ...swapComps, ...overrideComps]);

for (const [key, info] of allComps) {
  let cn = makeCompName(info);
  // Handle collisions
  if (compNameToKey[cn] && compNameToKey[cn] !== key) {
    cn = cn + '_' + key.slice(0, 6);
  }
  compNameToKey[cn] = key;
  const comment = info.set ? `${info.set}: ${info.name}` : info.name;
  compLines.push(`  ${cn}: '${key}', // ${comment}`);
}

// ── Fonts ──

const fontLines = (raw.fonts || []).map(f => {
  const [family, style] = f.split(':');
  return `await figma.loadFontAsync({ family: '${family}', style: '${style}' });`;
});

// ── Assemble output ──

const meta = raw.meta || {};
const out = `// ${name}-snippet.js — Snippet (${meta.w || '?'}×${meta.h || '?'})

// ── DATA (from data.yaml + views.yaml) ──
const DATA = {
  // TODO: fill from data.yaml + views.yaml
};

// ── Component keys ──
const COMP = {
${compLines.join('\n')}
};

// ── Text styles ──
const STYLES = {
${styleLines.join('\n')}
};

// ── Effect styles ──
const EFFECTS = {
${effectLines.join('\n')}
};

// ── Tokens ──
const T = {
${tLines.join('\n')}
};

// ── Frozen logic — do not edit below this line ──
${fontLines.join('\n')}
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error(\`Variable not found: \${id} — is SuperTasks-DS library enabled?\`);
  return v;
};
const SOLID = async (id) => {
  const v = await V(id);
  let c = v.valuesByMode[Object.keys(v.valuesByMode)[0]];
  while (c?.type === 'VARIABLE_ALIAS') {
    const av = await figma.variables.getVariableByIdAsync(c.id);
    if (!av) break;
    c = av.valuesByMode[Object.keys(av.valuesByMode)[0]];
  }
  const rgb = (c && typeof c.r === 'number') ? { r: c.r, g: c.g, b: c.b } : { r: 1, g: 1, b: 1 };
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: rgb, opacity: 1 }, 'color', v
  );
};
const findChild = (parent, name) => parent.findOne(n => n.name === name);
function setProps(inst, overrides) {
  const props = {};
  const cp = inst.componentProperties;
  for (const [k, v] of Object.entries(overrides)) {
    for (const cpk of Object.keys(cp)) {
      if (cpk === k || cpk.startsWith(k + '#')) { props[cpk] = v; break; }
    }
  }
  if (Object.keys(props).length) inst.setProperties(props);
}
async function applyIconFills(parent, varId) {
  const vectors = parent.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
  if (!vectors.length) return;
  const fill = await SOLID(varId);
  for (const v of vectors) v.fills = [fill];
}

const imp = {};
for (const [k, key] of Object.entries(COMP))
  imp[k] = await figma.importComponentByKeyAsync(key);
const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}
const eff = {};
for (const [k, key] of Object.entries(EFFECTS)) {
  const s = await figma.importStyleByKeyAsync(key);
  eff[k] = s.id;
}

const page = figma.currentPage;

// ── Render ──
// TODO: write render logic using raw JSON as blueprint + _reference/statcard.js as pattern
`;

writeFileSync(join(root, 'snippets', `${name}-snippet.js`), out);
console.log(`Wrote figma/snippets/${name}-snippet.js`);
