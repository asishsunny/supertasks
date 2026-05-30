## Components
- Prefer DS component instances over hand-built frames
- Keys from reference/component-keys.json — never search
- Props from reference/components/*.json — never guess enums

## Tokens
- Bind all fills, strokes, radius, spacing to tokens
- IDs from reference/tokens.json
- Never use raw hex or hardcoded numbers

## Data
- All content from data/data.yaml — never invent

## Cache

After every mcp__figma__get_design_context call:
- If the response contains JSX inline: Write it to artifacts/cache/{name}.jsx immediately.
  No python. No bash. No searching for files. No parse scripts. Just Write.
- If the harness saved to a .txt file (path in response): extract via Bash:
  python3 -c "import json,sys; print(json.load(open(sys.argv[1]))[0])" /path/to/file.txt > artifacts/cache/{name}.jsx
- Then run: node code/scripts/sync-figma.mjs --name {name}
- Never skip the Write step. Never search for cache files. Never run parse scripts on inline JSX results.

## Build
- Screenshot after major steps
- clipsContent=false on all wrapper frames
