# Step 2 checklist: controls

## Before adapting
- [ ] Fetch Figma screenshot: `mcp__figma__get_screenshot` → `/tmp/figma-controls.png`
- [ ] Compare icon colors against Figma screenshot (MCP loses SVG fill tokens)
- [ ] Compare avatar rendering (MCP exports as raster `<img>`, may need Medusa `<Avatar>`)

## During adapt
- [ ] Add imports for all referenced components (Button, Badge, IconButton, etc.)
- [ ] Replace hardcoded text with props
- [ ] Extract repeated subtrees into `.map()`
- [ ] Strip noise classes (relative/shrink-0) only where safe — check for absolute children

## After adapt
- [ ] Open gallery page in browser
- [ ] Side-by-side compare with `/tmp/figma-controls.png`
- [ ] Check: icon colors match? Avatar renders? Spacing correct?
