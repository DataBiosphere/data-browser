#!/usr/bin/env python3
"""
Fetch all AnVIL datasets, extract unique studies from DUOS, and report coverage.

Requires: gcloud auth login, pip install requests
"""

import json
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
    resp = requests.get(url)
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
                "registered_identifier": ds.get("registered_identifier", []),
            }
        )

with_duos = [d for d in datasets if d["duos_id"]]
print(f"Total datasets: {len(datasets)}, with DUOS ID: {len(with_duos)}")

# Fetch study info from DUOS, dedupe by study name
print("Fetching study info from DUOS...")
headers = {"Authorization": f"Bearer {token}"}
studies = {}
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
        name = study.get("name")
        if name and name not in studies:
            props = {
                p["key"]: p.get("value") for p in study.get("properties", [])
            }
            studies[name] = {
                "name": name,
                "studyId": study.get("studyId"),
                "description": study.get("description"),
                "piName": study.get("piName"),
                "dataTypes": study.get("dataTypes"),
                "collaboratingSites": props.get("collaboratingSites"),
                "dbGaPPhsID": props.get("dbGaPPhsID"),
                "phenotypeIndication": props.get("phenotypeIndication"),
                "datasetCount": len(study.get("datasetIds", [])),
            }
    except Exception as e:
        print(f"  Error on {duos_id}: {e}")

print(f"\nUnique studies: {len(studies)}")

# Field coverage
print(f"\n=== FIELD COVERAGE (across {len(studies)} studies) ===")
for field in [
    "name",
    "description",
    "piName",
    "dataTypes",
    "phenotypeIndication",
    "dbGaPPhsID",
    "collaboratingSites",
]:
    n = sum(1 for s in studies.values() if s.get(field))
    print(f"  {field}: {n}/{len(studies)} ({100 * n / len(studies):.0f}%)")

# Dataset count distribution
print(f"\n=== DATASETS PER STUDY ===")
sizes = sorted([s["datasetCount"] for s in studies.values()], reverse=True)
print(f"  Max: {sizes[0]}, Median: {sizes[len(sizes) // 2]}, Min: {sizes[-1]}")
print(f"  Studies with 1 dataset: {sum(1 for s in sizes if s == 1)}")
print(f"  Top 10:")
for s in sorted(studies.values(), key=lambda x: x["datasetCount"], reverse=True)[:10]:
    print(f"    {s['name'][:70]}: {s['datasetCount']} datasets")

# Datasets with no registered_identifier
no_reg = [
    d
    for d in datasets
    if not d["registered_identifier"] or d["registered_identifier"] == ["none"]
]
print(f"\n=== DATASETS WITH NO registered_identifier: {len(no_reg)} ===")
for d in no_reg:
    print(f"  - {d['title']}")
