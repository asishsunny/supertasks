# Generate transform-rules.json

You are generating a transform-rules.json file for a Figma-to-React pipeline. This file defines project-specific transformation rules that aren't derivable from the design system reference data.

## Input

You will be given:
1. **reference/tokens.json** — all design tokens from the Figma DS
2. **reference/components/*.json** — component variant definitions
3. **A sample raw JSX file** — showing what Figma outputs before transformation
4. **The UI library docs** (e.g., Medusa UI) — so you know what components exist

## Output

A single JSON file with these sections:

```json
{
  "__doc": "Project-specific overrides. Not derivable from reference/. Edit by hand.",
  "tokens": {},
  "radius": { ... },
  "spacing": { ... },
  "font": { ... },
  "components": [ ... ],
  "statusDotPattern": "...",
  "imports": { ... },
  "noise": { ... }
}
```

## Section guide

### tokens
Custom token overrides when the auto-generated token-maps.json gets it wrong. Usually empty `{}` — only add entries if a specific token needs a non-standard Tailwind class.

### radius
Map Figma radius variables to Tailwind rounded classes:
```json
{
  "radius-0": "rounded-[0px]",
  "radius-4": "rounded",
  "radius-8": "rounded-lg",
  "radius-12": "rounded-xl",
  "radius-full": "rounded-full"
}
```
Look at reference/tokens.json for all radius variables. Map each to the nearest Tailwind `rounded-*` class. Use arbitrary values `rounded-[Npx]` when no standard class matches.

### spacing
Map Figma spacing variables to Tailwind spacing scale numbers:
```json
{
  "spacing-0": "0",
  "spacing-4": "1",
  "spacing-8": "2",
  "spacing-16": "4"
}
```
Formula: Tailwind value = Figma px / 4. So spacing-8 → 2, spacing-16 → 4, spacing-24 → 6.

### font
Map Figma font variables to Tailwind classes:
- `font/family/*` → usually `null` (handled by CSS)
- `font/weight/400` → `font-normal`, `font/weight/500` → `font-medium`
- `font/size/*` → nearest Tailwind `text-*` class or arbitrary `text-[Npx]`

Look at reference/tokens.json and reference/text-styles.json for all font variables.

### components
Array of component detection + emission rules. Each entry:

```json
{
  "name": "Badge",
  "detect": { "dataName": "Badge" },
  "emit": {
    "tag": "Badge",
    "props": { "color": "...", "size": "2xsmall" },
    "children": "text"
  },
  "fallbackDetect": { "classAll": ["tag/", "rounded-", "border"] }
}
```

**Detection methods:**
- `dataName` — matches `data-name` attribute exactly
- `dataNamePrefix` — matches `data-name` starting with value
- `element` — matches JSX element name
- `propMatch` — matches specific prop values
- `classAll` — fallback: matches if ALL listed class fragments present

**Emission fields:**
- `tag` — the React component to emit
- `props` — static props to set
- `iconChild` — render an icon component as child
- `selfClosing` — no children
- `children: "text"` — use text content from original
- `wrapper` — wrap in an outer element
- `pattern` — use a named pattern (like statusDotPattern)

Look at the raw JSX to identify repeating patterns (icon buttons, badges, avatars, status indicators) and write detection rules for each.

### imports
Map component names to their module paths:
```json
{
  "Badge": { "module": "@medusajs/ui", "name": "Badge" },
  "IconButton": { "module": "@medusajs/ui", "name": "IconButton" }
}
```

### noise
Classes and patterns to strip from Figma output:

- **strip** — exact class names or attributes to remove (e.g., `pointer-events-none`, `aria-hidden`, `data-node-id`)
- **strip_patterns** — regex patterns for classes to remove (e.g., font variable references)
- **replace_classes** — Figma shorthand → idiomatic Tailwind (e.g., `flex-[1_0_0]` → `flex-1`, `min-w-px` → strip)
- **replace_fixed_widths** — map large fixed widths to responsive (e.g., `w-[1440px]` → `w-full`)
- **keep_fixed_widths** — small fixed widths that are intentional (column widths, icon sizes)

Look at the raw JSX for:
1. Attributes that are Figma artifacts (data-node-id, aria-hidden on decorative divs)
2. Classes that reference CSS variables (these get resolved by token-maps, but leftover patterns need stripping)
3. Large fixed dimensions that should be responsive
4. Small fixed dimensions that are real column/icon sizes

## Tips

- Start with the raw JSX — it shows exactly what noise Figma produces
- Cross-reference with reference/tokens.json for radius, spacing, font values
- Check the UI library for available component names and their props
- The `tokens` section should almost always be empty — only override if token-maps.json generates wrong output
- Be conservative with noise stripping — only strip what's genuinely noise, not meaningful styles

Now generate transform-rules.json based on the provided reference data and raw JSX samples.
