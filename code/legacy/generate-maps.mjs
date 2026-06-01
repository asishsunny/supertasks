#!/usr/bin/env node
/**
 * Generate token-maps.json.
 *
 * Derived from reference/:  token classes, icon names, tag color map, badge defaults.
 * Project overrides:        transform-rules.json (components, noise, spacing, radius, font).
 *
 * Usage: node code/scripts/generate-maps.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (f) => JSON.parse(readFileSync(resolve(__dirname, f), "utf8"));
const ref = (f) => read(`../../reference/${f}`);

const tokens = ref("tokens.json");
const medusaMap = ref("medusa-map.json");
const componentKeys = ref("component-keys.json");
const overrides = read("../rules/transform-rules.json");

// ── Tokens (derived) ──
// Mechanical rule: Figma token prefix → Tailwind prefix
const PREFIX_RULES = [
  ["backgrounds/", "bg-ui-"],
  ["foregrounds/", "text-ui-"],
  ["borders/",     "border-ui-"],
  ["buttons/",     "bg-ui-"],
  ["contrast/",    { fg: "text-ui-", bg: "bg-ui-", border: "border-ui-" }],
  ["tag/",         "text-ui-"],
];

function deriveTokenClass(name) {
  for (const [prefix, mapping] of PREFIX_RULES) {
    if (!name.startsWith(prefix)) continue;
    const suffix = name.slice(prefix.length);

    if (typeof mapping === "string") return mapping + suffix;

    // Contrast: pick prefix by second segment
    for (const [seg, cls] of Object.entries(mapping)) {
      if (suffix.startsWith(`contrast-${seg}-`)) return cls + suffix;
    }
  }
  return undefined;
}

const tokenSection = {};

// Derive semantic color tokens from tokens.json
for (const name of Object.keys(tokens.variableIds)) {
  const v = tokens.variableIds[name];
  if (!["Semantic colors", "Typography"].includes(v.collection)) {
    // Radius + spacing come from overrides (Tailwind values aren't derivable)
    continue;
  }
  const cls = deriveTokenClass(name);
  if (cls !== undefined) tokenSection[name] = cls;
}

// ── Radius (derived: Tailwind rounded classes) ──
const RADIUS_MAP = {
  0: "rounded-[0px]", 2: "rounded-sm", 4: "rounded", 6: "rounded-md",
  8: "rounded-lg", 10: "rounded-[10px]", 12: "rounded-xl",
  16: "rounded-2xl", 20: "rounded-[20px]", 24: "rounded-[24px]",
};
for (const name of Object.keys(tokens.variableIds)) {
  if (!name.startsWith("radius-")) continue;
  if (name === "radius-full") { tokenSection[name] = "rounded-full"; continue; }
  const px = parseInt(name.replace("radius-", ""), 10);
  if (RADIUS_MAP[px]) tokenSection[name] = RADIUS_MAP[px];
}

// ── Spacing (derived: px ÷ 4) ──
for (const name of Object.keys(tokens.variableIds)) {
  if (!name.startsWith("spacing-")) continue;
  const px = parseInt(name.replace("spacing-", ""), 10);
  tokenSection[name] = String(px / 4);
}

// Merge font + token overrides (project-specific)
Object.assign(tokenSection, overrides.font, overrides.tokens);

// ── Icons (derived) ──
const toPascal = (s) => s.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join("");

const iconNameMap = {};
for (const name of Object.keys(componentKeys)) {
  if (name[0] === name[0].toLowerCase() && !name.includes(" ")) {
    iconNameMap[name] = toPascal(name);
  }
}

// ── Tag colors (derived from medusa-map Badge variants) ──
const tagColorMap = {};
for (const [k, v] of Object.entries(medusaMap.Badge?.variants?.State?.map || {})) {
  tagColorMap[k.toLowerCase()] = v;
}

// ── Component rules (overrides + derived defaults) ──
const badgeDefaults = medusaMap.Badge?.defaultProps || {};
const rules = overrides.components.map(r => {
  if (r.name === "Badge") {
    const props = { ...r.emit.props };
    if (props.size === "__from_medusa_map__") props.size = badgeDefaults.size || "small";
    if (props.rounded === "__from_medusa_map__") props.rounded = badgeDefaults.rounded || "full";
    return { ...r, emit: { ...r.emit, props } };
  }
  return r;
});

// ── Output ──
const output = {
  __doc: "Auto-generated. Derived from reference/ + transform-rules.json.",
  __generated: new Date().toISOString(),
  tokens: tokenSection,
  components: {
    rules,
    tagColorMap,
    statusDotPattern: overrides.statusDotPattern,
    iconNameMap,
    imports: overrides.imports,
  },
  noise: overrides.noise,
  shadows: overrides.shadows || {},
  textStyles: overrides.textStyles || [],
  arbitraryMap: overrides.arbitraryMap || {},
};

const outPath = resolve(__dirname, "../maps/token-maps.json");
writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

const t = Object.keys(tokenSection).length;
const i = Object.keys(iconNameMap).length;
console.log(`token-maps.json — ${t} tokens, ${i} icons, ${rules.length} rules`);
