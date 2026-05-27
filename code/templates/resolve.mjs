/**
 * resolve.mjs — Mechanical derivation from Figma snippets to Tailwind
 *
 * Three chains:
 *   1. Token:  snippet VariableID → tokens.json (key→name) → token-maps.json (name→class)
 *   2. Style:  snippet style key → text-styles.json (key→name) → class from name
 *   3. Layout: snippet Figma API property → layout-maps.json (prop.value→class)
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const tokensRef = JSON.parse(readFileSync(resolve(ROOT, "reference/tokens.json"), "utf8"));
const tokenMaps = JSON.parse(readFileSync(resolve(ROOT, "code/maps/token-maps.json"), "utf8"));
const textStylesRef = JSON.parse(readFileSync(resolve(ROOT, "reference/text-styles.json"), "utf8"));
const layoutMaps = JSON.parse(readFileSync(resolve(ROOT, "code/maps/layout-maps.json"), "utf8"));

// ── Token resolution chain ──

const keyToName = {};
for (const [name, entry] of Object.entries(tokensRef.variableIds)) {
  keyToName[entry.key] = name;
}

const styleKeyToClass = {};
for (const [name, key] of Object.entries(textStylesRef)) {
  styleKeyToClass[key] = name.split("/").pop();
}

function tok(varId) {
  const key = varId.match(/^VariableID:([a-f0-9]+)\//)?.[1];
  const name = key ? keyToName[key] : null;
  return name ? tokenMaps.tokens[name] : null;
}

// ── Layout resolution chain ──

function lay(prop, value) {
  const map = layoutMaps[prop];
  return map?.[String(value)] ?? null;
}

function gap(px) {
  return `gap-${layoutMaps.pxToSpacing[String(px)] ?? `[${px}px]`}`;
}

function pad(side, px) {
  const prefix = layoutMaps.paddingPrefix[side];
  const val = layoutMaps.pxToSpacing[String(px)] ?? `[${px}px]`;
  return `${prefix}-${val}`;
}

function padAll(px) {
  const val = layoutMaps.pxToSpacing[String(px)] ?? `[${px}px]`;
  return `p-${val}`;
}

function padX(px) {
  const val = layoutMaps.pxToSpacing[String(px)] ?? `[${px}px]`;
  return `px-${val}`;
}

function padY(px) {
  const val = layoutMaps.pxToSpacing[String(px)] ?? `[${px}px]`;
  return `py-${val}`;
}

function radius(px) {
  return layoutMaps.pxToRadius[String(px)] ?? `rounded-[${px}px]`;
}

// ── Snippet variable IDs (verbatim from figma/snippets/*.js) ──

const T = {
  sp0:      "VariableID:a1c28706a42ef7439875a76d07c22441141b8742/6996:1903",
  sp4:      "VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900",
  sp8:      "VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:12541",
  sp12:     "VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895",
  sp16:     "VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894",
  sp24:     "VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902",
  r4:       "VariableID:fc26ff4b40b530c2bed8b79f226427ca30f6de46/6996:1710",
  r12:      "VariableID:e92b5a3aa058a87489262fd5161b29f8b2b48d5e/6996:1718",
  bgBase:   "VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59",
  bgSubtle: "VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/17968:46",
  fgBase:   "VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47",
  fgSubtle: "VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158",
  fgMuted:  "VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159",
  fgError:  "VariableID:385bff17b274a766f7549d1344ddb987ca3e86ea/13723:1416",
  trackBg:  "VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/17968:192",
  borderSubtle: "VariableID:26e0b3a42c61f6a3cdd28a138ed083d8a6deacc8/17834:21",
  bgKanban: "VariableID:83de97d19f56bdd2967e86fcee94bbd7633b8f38/17834:32",
};

const S = {
  txtCompactMedPlus:   "edb007633bab9d52364f6c0d78da75d3f40197a7",
  txtCompactMed:       "d38ecc7f2765fa9e14c5cbd6c7831fe88d2ceabe",
  txtCompactSmall:     "184b1bd4001407d480ae493b95b84e90d347cb52",
  txtCompactSmallPlus: "76cc3f3552860444bb19f826d0c8428c8d7264dc",
  txtSmall:            "293209460cb844f3b3feacdbdb0d2c4205b35035",
  H2:                  "4278d08d0604b397e820783f5e1006b6477b0ef4",
  cardRest:            "018e45b617548e9ac778ceb6d8c1cf245108c5db",
};

// ── Resolved values (R = tokens, L = layout) ──

export const R = {
  sp0:  tok(T.sp0),
  sp4:  tok(T.sp4),
  sp8:  tok(T.sp8),
  sp12: tok(T.sp12),
  sp16: tok(T.sp16),
  sp24: tok(T.sp24),

  r4:  tok(T.r4),
  r12: tok(T.r12),

  bgBase:   tok(T.bgBase),
  bgSubtle: tok(T.bgSubtle),

  fgBase:   tok(T.fgBase),
  fgSubtle: tok(T.fgSubtle),
  fgMuted:  tok(T.fgMuted),
  fgError:  tok(T.fgError),

  trackBg:      tok(T.trackBg)?.replace(/^border-/, "bg-"),
  borderSubtle: tok(T.borderSubtle),
  bgKanban:     tok(T.bgKanban),

  txtCompactMedPlus:   styleKeyToClass[S.txtCompactMedPlus],
  txtCompactMed:       styleKeyToClass[S.txtCompactMed],
  txtCompactSmall:     styleKeyToClass[S.txtCompactSmall],
  txtCompactSmallPlus: styleKeyToClass[S.txtCompactSmallPlus],
  txtSmall:            styleKeyToClass[S.txtSmall],

  H2: tokenMaps.textStyles.find(s => s.size === "32px")?.out,

  cardRest: tokenMaps.shadows[
    "0px_0px_0px_1px_rgba(0,0,0,0.04),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)"
  ],
};

export const L = {
  // layoutMode → flex direction
  horiz:    lay("layoutMode", "HORIZONTAL"),        // "flex"
  vert:     lay("layoutMode", "VERTICAL"),           // "flex flex-col"

  // counterAxisAlignItems
  itemsCenter: lay("counterAxisAlignItems", "CENTER"),  // "items-center"
  itemsStart:  lay("counterAxisAlignItems", "MIN"),     // "items-start"
  itemsEnd:    lay("counterAxisAlignItems", "MAX"),     // "items-end"

  // primaryAxisAlignItems
  justifyEnd:     lay("primaryAxisAlignItems", "MAX"),           // "justify-end"
  justifyBetween: lay("primaryAxisAlignItems", "SPACE_BETWEEN"), // "justify-between"
  justifyCenter:  lay("primaryAxisAlignItems", "CENTER"),        // "justify-center"

  // layoutSizing
  fill: lay("layoutSizing", "FILL"),  // "flex-1"

  // clipsContent
  clip:   lay("clipsContent", "true"),   // "overflow-clip"

  // Direct px → Tailwind (from snippet hardcoded values)
  // Spacing
  gap0:   gap(0),    // "gap-0"
  gap2:   gap(2),    // "gap-0.5"
  gap4:   gap(4),    // "gap-1"
  gap6:   gap(6),    // "gap-1.5"
  gap8:   gap(8),    // "gap-2"
  gap12:  gap(12),   // "gap-3"
  gap16:  gap(16),   // "gap-4"
  gap20:  gap(20),   // "gap-5"
  gap24:  gap(24),   // "gap-6"

  // Padding (from snippet direct px assignments)
  p8:    padAll(8),    // "p-2"
  p12:   padAll(12),   // "p-3"
  p16:   padAll(16),   // "p-4"
  p20:   padAll(20),   // "p-5"
  p24:   padAll(24),   // "p-6"
  px4:   padX(4),      // "px-1"
  px16:  padX(16),     // "px-4"
  px24:  padX(24),     // "px-6"
  py2:   padY(2),      // "py-0.5"
  py4:   padY(4),      // "py-1"
  py8:   padY(8),      // "py-2"
  py10:  padY(10),     // "py-2.5"
  py12:  padY(12),     // "py-3"
  pt8:   pad("paddingTop", 8),     // "pt-2"
  pt12:  pad("paddingTop", 12),    // "pt-3"
  pt24:  pad("paddingTop", 24),    // "pt-6"
  pb12:  pad("paddingBottom", 12), // "pb-3"
  pb16:  pad("paddingBottom", 16), // "pb-4"
  pb20:  pad("paddingBottom", 20), // "pb-5"

  // Radius (from snippet cornerRadius = N)
  r8:  radius(8),   // "rounded-lg"
  r12: radius(12),  // "rounded-xl"

  // Fixed widths (from snippet resize(W, H))
  w88:  "w-[88px]",
  w120: "w-[120px]",
  w240: "w-[240px]",
  h8:   "h-2",
  h48:  "h-[48px]",
};

// Re-export resolution functions for builder to use dynamically
export { tok, lay, gap, pad, padAll, padX, padY, radius };
