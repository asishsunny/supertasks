/**
 * Token resolution — CSS var tokens → Tailwind classes.
 * All maps derived from token-maps.json at startup. Zero hardcoded lookups.
 */

export function createTokenResolver(MAPS) {
  const TOKENS = { ...MAPS.tokens };

  const SHADOW_MAP = MAPS.shadows || {};
  const ARBITRARY_MAP = MAPS.arbitraryMap || {};
  const NOISE_SET = new Set((MAPS.noise || {}).strip || []);
  const noiseConfig = MAPS.noise || {};
  const TEXT_STYLE_RULES = MAPS.textStyles || [];

  // Derive spacing map from tokens
  const SPACING_MAP = {};
  for (const [key, val] of Object.entries(MAPS.tokens)) {
    if (key.startsWith("spacing-")) SPACING_MAP[key.replace("spacing-", "")] = val;
  }

  // Derive font maps from tokens (no hardcoded sizeMap/weightMap)
  const WEIGHT_MAP = {};
  const SIZE_MAP = {};
  for (const [key, val] of Object.entries(MAPS.tokens)) {
    if (key.startsWith("font/weight/") && val) WEIGHT_MAP[key.replace("font/weight/", "")] = val;
    if (key.startsWith("font/size/") && val) SIZE_MAP[key.replace("font/size/", "")] = val;
  }

  const SPACING_PREFIXES = new Set([
    "px-","py-","pt-","pb-","pl-","pr-","p-",
    "mx-","my-","mt-","mb-","ml-","mr-","m-",
    "gap-","gap-x-","gap-y-","space-x-","space-y-",
  ]);

  const PREFIX_SWAP = {
    "bg":     { "text-": "bg-",     "border-": "bg-" },
    "text":   { "bg-":   "text-",   "border-": "text-" },
    "border": { "text-": "border-", "bg-":     "border-" },
  };

  function resolveClass(cls) {
    cls = cls.replace(/\\\//g, "/");

    if (cls.startsWith("font-['") || cls.startsWith("font-[\"")) return null;

    if (cls.startsWith("shadow-[")) {
      const inner = cls.slice(8, -1);
      return SHADOW_MAP[inner] || cls;
    }
    if (cls.startsWith("drop-shadow-[")) {
      return cls.includes("rgba(0,0,0,0.04)") ? "shadow-elevation-card-rest" : cls;
    }

    const varMatch = cls.match(/^([a-z-]+)-\[(?:color:|length:|family-name:)?var\(--(.+?)(?:,\s*(.+?))?\)\]$/);
    if (varMatch) {
      const prefix = varMatch[1];
      const path = varMatch[2];
      const fallback = varMatch[3];

      if (path.startsWith("font/family/")) return null;

      const alphaMatch = path.match(/^alpha-black\/alpha-(\d+)$/);
      if (alphaMatch) {
        const n = alphaMatch[1];
        return `${prefix}-black/[.${n}] dark:${prefix}-white/[.${n}]`;
      }

      const resolved = TOKENS[path];
      if (!resolved) {
        if (fallback) return `${prefix}-[${fallback}]`;
        return cls;
      }

      if (resolved.includes("/") && fallback) {
        return `${prefix}-[${fallback}]`;
      }

      if (/^[\d.]+$/.test(resolved)) {
        if (prefix === "rounded") {
          const pxM = fallback?.match(/^(\d+)px$/);
          return pxM ? `rounded-[${fallback}]` : `${prefix}-${resolved}`;
        }
        return `${prefix}-${resolved}`;
      }

      const resolvedPrefix = resolved.match(/^(bg-|text-|border-|shadow-|rounded-)/)?.[1];
      if (resolvedPrefix) {
        if (resolved.startsWith("rounded") && prefix.startsWith("gap")) {
          const pxM = fallback?.match(/^(\d+)px$/);
          if (pxM) {
            const spacing = TOKENS[`spacing-${pxM[1]}`];
            return spacing ? `${prefix}-${spacing}` : `${prefix}-[${fallback}]`;
          }
          return cls;
        }
        const swaps = PREFIX_SWAP[prefix];
        if (swaps?.[resolvedPrefix]) return resolved.replace(resolvedPrefix, swaps[resolvedPrefix]);
        return resolved;
      }

      return resolved;
    }

    // Raw pixel → spacing (tokens first, then px/4 math for standard Tailwind values)
    const rawPxMatch = cls.match(/^(.+?-)\[(\d+)px\]$/);
    if (rawPxMatch) {
      const prefix = rawPxMatch[1];
      const px = rawPxMatch[2];
      const fromTokens = SPACING_MAP[px];
      const fromMath = Number(px) % 4 === 0 && Number(px) <= 384 ? String(Number(px) / 4) : null;
      const val = fromTokens || fromMath;
      if ((SPACING_PREFIXES.has(prefix) || prefix === "h-") && val) return `${prefix}${val}`;
      return cls;
    }

    if (cls in ARBITRARY_MAP) return ARBITRARY_MAP[cls];

    const fixedW = noiseConfig.replace_fixed_widths?.[cls];
    if (fixedW) return fixedW;

    return cls;
  }

  function resolveTextStyles(classes) {
    let fontFamily = null, fontWeight = null, fontSize = null, leading = null, trackingSeen = null;
    const rest = [];

    for (const cls of classes) {
      if (cls.match(/^font-\[family-name:var\(--font\/family\//)) { fontFamily = cls; continue; }
      const wm = cls.match(/^font-\[var\(--font\/weight\/(\d+)/);
      if (wm) { fontWeight = wm[1]; continue; }
      const sm = cls.match(/^text-\[length:var\(--font\/size\/(\w+)/);
      if (sm) { fontSize = sm[1]; continue; }
      const rawSz = cls.match(/^text-\[(\d+px)\]$/);
      if (rawSz && !fontSize) { fontSize = rawSz[1]; continue; }
      const lm = cls.match(/^leading-\[(.+)\]$/);
      if (lm) { leading = lm[1]; continue; }
      if (cls === "tracking-[-0.16px]" && !trackingSeen) { trackingSeen = cls; continue; }
      rest.push(cls);
    }

    if (fontWeight && fontSize && leading) {
      const rule = TEXT_STYLE_RULES.find(r =>
        r.weight === fontWeight && r.size === fontSize && r.leading === leading
      );
      if (rule) { rest.push(rule.out); return rest; }
    }

    // Fallback: derive from token maps
    if (fontWeight) rest.push(WEIGHT_MAP[fontWeight] || `font-[${fontWeight}]`);
    if (fontSize) {
      rest.push(fontSize.endsWith("px") ? `text-[${fontSize}]` : (SIZE_MAP[fontSize] || `text-[${fontSize}]`));
    }
    if (leading) rest.push(`leading-[${leading}]`);
    if (trackingSeen) rest.push(trackingSeen);
    return rest;
  }

  function splitClasses(str) {
    const result = [];
    let current = "";
    let depth = 0;
    for (const ch of str) {
      if (ch === "[") depth++;
      if (ch === "]") depth--;
      if (ch === " " && depth === 0) {
        if (current) result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    if (current) result.push(current);
    return result;
  }

  function transformClassList(raw) {
    const normalized = raw.replace(/\\\//g, "/");
    const classes = splitClasses(normalized);
    const filtered = classes.filter(c => !NOISE_SET.has(c));
    const afterText = resolveTextStyles(filtered);
    const resolved = [];
    for (const cls of afterText) {
      const result = resolveClass(cls);
      if (result === null) continue;
      if (result.includes(" ")) {
        resolved.push(...result.split(" "));
      } else {
        resolved.push(result);
      }
    }
    return resolved.filter(Boolean).join(" ");
  }

  return { transformClassList };
}
