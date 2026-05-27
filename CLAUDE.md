## Project
Product brief: docs/brief.md

## Figma
- DS: https://www.figma.com/design/6P0gLpgZPrpp7oHli10VmZ/SuperTasks-DS
- UI: https://www.figma.com/design/D4Hav0rqH4Zql11h0YgcRv/SuperTasks-UI

## Reference
DS contract: reference/
  component-keys.json, components/*.json, tokens.json,
  text-styles.json, effect-styles.json

## Data
Content: data/data.yaml

## Principles
- Always prefer elegance over hacky solutions
- Single source of truth — no duplicate maps or split configs
- Derive, don't duplicate — if data exists upstream, read it at startup
- Config for data, code for logic — don't force AST operations into JSON DSLs
- Fix at root, not leaf — patch the source, not the output

## Rules
See RULES.md (content below)
