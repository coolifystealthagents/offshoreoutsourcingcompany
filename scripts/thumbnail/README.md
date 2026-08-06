# v2.4 thumbnail support

`composite.py` is the deterministic, per-article thumbnail stage required by
the daily blog and research routines. It uses Pillow only, writes 1200x630
WebP files, and never calls Gemini or another image API. The CSV is the single
source of truth for title, template, category, and subtitle.

Run from the repository root:

```sh
python3 scripts/thumbnail/composite.py \
  --config scripts/thumbnail/brand_config.json \
  --csv scripts/thumbnail/assignments.csv
```

The official Blader Humanizer is pinned in the agent environment at v2.9.1,
from `https://github.com/blader/humanizer` tag `v2.9.1`. Humanization remains a
content-run step before this renderer and is never substituted by this script.
