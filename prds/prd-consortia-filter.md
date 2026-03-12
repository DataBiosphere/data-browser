# PRD: Consortia Filter and Column

## Goal

Add a `consortia` field to the Azul dataset entity and expose it as a facet across all entity endpoints.

## API Changes

### New field: `consortia`

Add `consortia` (string array) to each dataset object. We expect a dataset to belong to a single consortium, but the field should be multivalued to allow for exceptions. Datasets with no value should return `[]`.

**Source:** DUOS `study.properties[key=collaboratingSites].value`, looked up by the dataset's existing `duos_id`.

```bash
TOKEN=$(gcloud auth print-access-token)
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://consent.dsde-prod.broadinstitute.org/api/tdr/DUOS-000667" \
  | jq '.study.properties[] | select(.key == "collaboratingSites") | .value'
# => ["CCDG"]
```

### New facet: `datasets.consortia`

Add to all entity endpoints: `/index/datasets`, `/index/biosamples`, `/index/donors`, `/index/activities`, `/index/files`.

### Example response

```json
{
  "hits": [
    {
      "datasets": [
        {
          "title": "ANVIL_CCDG_Broad_NP_Epilepsy_AUSALF_HMB_IRB_GSA_MD",
          "registered_identifier": ["phs001489"],
          "consent_group": ["HMB-IRB-MDS"],
          "consortia": ["CCDG"],
          "duos_id": "DUOS-000667"
        }
      ]
    }
  ],
  "termFacets": {
    "datasets.consortia": {
      "terms": [
        { "term": "CCDG", "count": 283 },
        { "term": "CMG", "count": 20 },
        { "term": "CSER", "count": 8 },
        { "term": "GREGoR", "count": 7 }
      ],
      "total": 382,
      "type": "terms"
    }
  }
}
```

## Coverage (as of 2026-03-12)

| Metric                              | Count             |
| ----------------------------------- | ----------------- |
| Total AnVIL datasets                | 382               |
| With `collaboratingSites` populated | 365 (95.5%)       |
| Without DUOS ID                     | 8 (all CMG Broad) |
| Empty `collaboratingSites`          | 9                 |
| Unique consortium values            | 19                |

| Consortium              | Datasets |     | Consortium  | Datasets |
| ----------------------- | -------- | --- | ----------- | -------- |
| CCDG                    | 283      |     | CARD        | 3        |
| CMG                     | 20       |     | PAGE        | 3        |
| CSER                    | 8        |     | 1000G       | 2        |
| GREGoR                  | 7        |     | ALS-Compute | 2        |
| GTEx                    | 7        |     | ALS-FTD     | 2        |
| IGVF                    | 6        |     | T2T         | 2        |
| Convergent Neuroscience | 5        |     | ADOPT       | 2        |
| WGSPD1                  | 5        |     | ENCORE      | 2        |
| DepMap                  | 4        |     | HPRC        | 1        |
|                         |          |     | CMH         | 1        |

## Frontend Context

![Studies tab mockup](https://github.com/user-attachments/assets/3e28c6c4-2a59-482f-9e69-669b1954430d)

The front end will add a Consortia filter facet and column to the datasets table. This enables consortia to share direct links to the collection of their datasets in the explorer.

## References

- GitHub issue: https://github.com/DataBiosphere/data-browser/issues/4376
- DUOS endpoint: `GET /api/tdr/{DUOS-ID}` on `consent.dsde-prod.broadinstitute.org`
- Current datasets API: `https://service.explore.anvilproject.org/index/datasets?catalog=anvil13`

---

## Addendum: Coverage Study Script

Script used to generate the coverage data above. Requires `gcloud auth login` and `pip install requests`.

```python
#!/usr/bin/env python3
"""
Fetch all AnVIL datasets, look up consortia from DUOS, and report coverage.
"""

import json, subprocess, requests, sys
from collections import Counter

token = subprocess.check_output(["gcloud", "auth", "print-access-token"]).decode().strip()

# Fetch all AnVIL datasets
print("Fetching AnVIL datasets...")
all_hits = []
url = "https://service.explore.anvilproject.org/index/datasets?size=100&sort=datasets.title&catalog=anvil13&order=asc&filters=%7B%7D"
while url:
    resp = requests.get(url)
    resp.raise_for_status()
    data = resp.json()
    all_hits.extend(data["hits"])
    url = data.get("pagination", {}).get("next")

datasets = []
for h in all_hits:
    for ds in h.get("datasets", []):
        datasets.append({
            "title": ds.get("title"),
            "duos_id": ds.get("duos_id"),
            "registered_identifier": ds.get("registered_identifier", []),
        })

print(f"Total datasets: {len(datasets)}")
with_duos = [d for d in datasets if d["duos_id"]]
without_duos = [d for d in datasets if not d["duos_id"]]
print(f"With DUOS ID: {len(with_duos)}")
print(f"Without DUOS ID: {len(without_duos)}")
for d in without_duos:
    print(f"  - {d['title']}")

# Hit DUOS API for each unique duos_id
print("\nFetching consortia from DUOS...")
headers = {"Authorization": f"Bearer {token}"}
consortia_map = {}
errors = []
unique_duos_ids = list(set(d["duos_id"] for d in with_duos))
for i, duos_id in enumerate(unique_duos_ids):
    if i % 50 == 0:
        print(f"  Progress: {i}/{len(unique_duos_ids)}", file=sys.stderr)
    try:
        r = requests.get(
            f"https://consent.dsde-prod.broadinstitute.org/api/tdr/{duos_id}",
            headers=headers,
        )
        r.raise_for_status()
        data = r.json()
        study = data.get("study", {})
        props = {p["key"]: p.get("value") for p in study.get("properties", [])}
        consortia_map[duos_id] = props.get("collaboratingSites", [])
    except Exception as e:
        errors.append((duos_id, str(e)))
        consortia_map[duos_id] = None

# Analyze coverage
populated = 0
empty = 0
null_or_missing = 0
consortium_counter = Counter()

for d in with_duos:
    val = consortia_map.get(d["duos_id"])
    if val is None:
        null_or_missing += 1
    elif not val or val == "":
        empty += 1
    else:
        populated += 1
        for v in (val if isinstance(val, list) else [val]):
            consortium_counter[v] += 1

print(f"\n=== COVERAGE (across {len(with_duos)} datasets with DUOS IDs) ===")
print(f"Populated collaboratingSites: {populated}")
print(f"Empty collaboratingSites: {empty}")
print(f"Null/missing/error: {null_or_missing}")
print(f"Total with DUOS ID: {len(with_duos)}")
print(f"Coverage: {populated}/{len(datasets)} ({100*populated/len(datasets):.1f}%)")

print(f"\n=== CONSORTIUM VALUES (by dataset count) ===")
for name, count in consortium_counter.most_common():
    print(f"  {name}: {count}")

if errors:
    print(f"\n=== ERRORS ({len(errors)}) ===")
    for duos_id, err in errors:
        print(f"  {duos_id}: {err}")

print(f"\n=== DATASETS WITH EMPTY collaboratingSites ===")
for d in with_duos:
    val = consortia_map.get(d["duos_id"])
    if val is not None and (not val or val == ""):
        print(f"  - {d['title']} ({d['duos_id']})")
```
