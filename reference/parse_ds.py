#!/usr/bin/env python3
"""Parse raw figma_execute DS extraction result into 5 reference files."""

import json, sys, os, pathlib

raw = json.loads(sys.stdin.read())

out = pathlib.Path(__file__).parent

# 1. component-keys.json
with open(out / "component-keys.json", "w") as f:
    json.dump(raw["componentKeys"], f, indent=2)

# 2. components/*.json — one file per component set
comp_dir = out / "components"
comp_dir.mkdir(exist_ok=True)
for name, data in raw["componentDetails"].items():
    safe = name.replace("/", "_").replace(" ", "_").replace("\\", "_")
    with open(comp_dir / f"{safe}.json", "w") as f:
        json.dump({name: data}, f, indent=2)

# 3. tokens.json
with open(out / "tokens.json", "w") as f:
    json.dump(raw["tokens"], f, indent=2)

# 4. text-styles.json
with open(out / "text-styles.json", "w") as f:
    json.dump(raw["textStyles"], f, indent=2)

# 5. effect-styles.json
with open(out / "effect-styles.json", "w") as f:
    json.dump(raw["effectStyles"], f, indent=2)

# Report counts
print(f"component-keys: {len(raw['componentKeys'])}")
print(f"component details: {len(raw['componentDetails'])}")
print(f"tokens: {len(raw['tokens'])}")
print(f"text-styles: {len(raw['textStyles'])}")
print(f"effect-styles: {len(raw['effectStyles'])}")
