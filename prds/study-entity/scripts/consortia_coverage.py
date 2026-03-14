#!/usr/bin/env python3
"""
Fetch all AnVIL datasets, look up consortia from DUOS, and report coverage.

Requires: gcloud auth login, pip install requests
"""

import subprocess
import sys
from collections import Counter

import requests

token = (
    subprocess.check_output(["gcloud", "auth", "print-access-token"])
    .decode()
    .strip()
)

# Fetch all AnVIL datasets
print("Fetching AnVIL datasets...")
all_hits = []
url = (
    "https://service.explore.anvilproject.org/index/datasets"
    "?size=100&sort=datasets.title&catalog=anvil13&order=asc&filters=%7B%7D"
)
while url:
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    all_hits.extend(data["hits"])
    url = data.get("pagination", {}).get("next")

datasets = []
for h in all_hits:
    for ds in h.get("datasets", []):
        datasets.append(
            {
                "title": ds.get("title"),
                "duos_id": ds.get("duos_id"),
            }
        )

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
            timeout=30,
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
        for v in val if isinstance(val, list) else [val]:
            consortium_counter[v] += 1

print(f"\n=== COVERAGE (across {len(with_duos)} datasets with DUOS IDs) ===")
print(f"Populated collaboratingSites: {populated}")
print(f"Empty collaboratingSites: {empty}")
print(f"Null/missing/error: {null_or_missing}")
print(f"Total with DUOS ID: {len(with_duos)}")
print(f"Coverage: {populated}/{len(datasets)} ({100 * populated / len(datasets):.1f}%)")

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
