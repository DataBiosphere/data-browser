# PRD: Study Entity and Filters

## Background

Multiple datasets share the same parent study (`registered_identifier` / phsId). Currently there is no study-level entity in the API — partial study-level info is only available as repeated fields across dataset hits. A study entity collapses these into a single browsable entry with aggregated statistics.

It is also difficult for consortia to link directly to their collection of studies — they can only link to individual datasets, which may span multiple studies.

As of 2026-03-12: 382 datasets map to **73 unique studies** in DUOS. 4 datasets have no `registered_identifier`.

## Goal

Add a `studies` entity to the Azul index with study-level fields and aggregations. Enable studies and their child entities (datasets, biosamples, donors, activities, files) to be filterable by the new study properties.

The consortia filter enables consortia to share direct links to the collection of their datasets in the explorer.

## API Changes

### New endpoint: `/index/studies`

The new `/index/studies` endpoint returns study entities with the same filtering and facet structure as the other entity endpoints. Hits and termFacets are updated as outlined below.

Study info is sourced from the DUOS API (`GET /api/tdr/{DUOS-ID}` → `response.study`). In the DUOS API, study info is embedded in the dataset response — there is no "list all studies" endpoint, so studies must be deduped from dataset responses.

### Hits

#### New hit fields

These new study-level fields are sourced from DUOS and appear in full on the `/index/studies` hit response. On other entity endpoints (`/index/datasets`, `/index/files`, etc.), a `studies` object is included in hits but abbreviated to just `study_name` and `registered_identifier` — matching the existing pattern where related entities are summarized (e.g., `datasets` on `/index/files` hits only includes `dataset_id` and `title`).

| Field                  | Azul Key                         | DUOS Path                                                               | Notes                                                                                |
| ---------------------- | -------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Registered Identifier  | `studies.registered_identifier`  | `study.properties[key=dbGaPPhsID].value`                                | 66/73 studies (90% coverage). See open question below for studies missing this field |
| Study Name             | `studies.study_name`             | `study.name`                                                            | 73 unique values, 100% coverage                                                      |
| Consortia              | `studies.consortia`              | `study.properties[key=collaboratingSites].value`                        | 19 unique values, 95.5% coverage                                                     |
| Study Design           | `studies.study_design`           | `study.properties[key=data].value.tags` (prefix `dbGaP_study_design: `) | 11 unique values, 90% coverage                                                       |
| Description            | `studies.description`            | `study.description`                                                     | 100% coverage                                                                        |
| Phenotype Indication   | `studies.phenotype_indication`   | `study.properties[key=phenotypeIndication].value`                       | 72/73 studies (99% coverage). String type in DUOS (single value, not array)          |
| Data Types             | `studies.data_types`             | `study.dataTypes`                                                       | 100% coverage                                                                        |
| Principal Investigator | `studies.principal_investigator` | `study.piName`                                                          | 100% coverage                                                                        |

#### Existing hit fields rolled up from children to study

These fields already exist on child entity responses. On `/index/studies`, they are aggregated up from datasets sharing the same `registered_identifier` as the study's `dbGaPPhsID`.

| Field                      | Source field                         | Roll-up rule             |
| -------------------------- | ------------------------------------ | ------------------------ |
| Consent Group              | `datasets.consent_group`             | Union of unique values   |
| Data Use Permission        | `datasets.data_use_permission`       | Union of unique values   |
| Disease (Biosamples)       | `biosamples.disease`                 | Union of unique values   |
| Disease (Diagnoses)        | `diagnoses.disease`                  | Union of unique values   |
| Phenotype                  | `diagnoses.phenotype`                | Union of unique values   |
| Phenopacket                | `diagnoses.phenopacket`              | Union of unique values   |
| Data Modality (Files)      | `files.data_modality`                | Union of unique values   |
| Data Modality (Activities) | `activities.data_modality`           | Union of unique values   |
| Assay Type                 | `activities.assay_type`              | Union of unique values   |
| Activity Type              | `activities.activity_type`           | Union of unique values   |
| File Format                | `files.file_format`                  | Union of unique values   |
| Reference Assembly         | `files.reference_assembly`           | Union of unique values   |
| Is Supplementary           | `files.is_supplementary`             | Union of unique values   |
| Anatomical Site            | `biosamples.anatomical_site`         | Union of unique values   |
| Biosample Type             | `biosamples.biosample_type`          | Union of unique values   |
| Donor Age at Collection    | `biosamples.donor_age_at_collection` | Union of unique ranges   |
| Reported Ethnicity         | `donors.reported_ethnicity`          | Union of unique values   |
| Phenotypic Sex             | `donors.phenotypic_sex`              | Union of unique values   |
| Organism Type              | `donors.organism_type`               | Union of unique values   |
| Genetic Ancestry           | `donors.genetic_ancestry`            | Union of unique values   |
| Participant Count          | `donors`                             | Count of unique donors\* |
| File Count                 | `files.count`                        | Sum                      |
| File Size                  | `files.file_size`                    | Sum                      |

\*Some investigation may be needed to determine the unique donor count, as donors may belong to multiple datasets within a study.

### TermFacets

#### New facets

The following new facets are sourced from the DUOS study entity. These are singleton-valued per study, so their values are propagated down to all child entities for filtering. These facets apply to all entity endpoints: `/index/studies`, `/index/datasets`, `/index/biosamples`, `/index/donors`, `/index/activities`, `/index/files`.

| Facet                  | Source                                                                  |
| ---------------------- | ----------------------------------------------------------------------- |
| `studies.study_name`   | `study.name`                                                            |
| `studies.consortia`    | `study.properties[key=collaboratingSites].value`                        |
| `studies.study_design` | `study.properties[key=data].value.tags` (prefix `dbGaP_study_design: `) |

#### Existing facets

All existing termFacets from the current `/index/datasets` response are also available on `/index/studies`, aggregated from child entities using the same roll-up rules as the hit fields above.

| Facet                          | Source field                   |
| ------------------------------ | ------------------------------ |
| `datasets.consent_group`       | `datasets.consent_group`       |
| `datasets.data_use_permission` | `datasets.data_use_permission` |
| `datasets.title`               | `datasets.title`               |
| `biosamples.disease`           | `biosamples.disease`           |
| `biosamples.anatomical_site`   | `biosamples.anatomical_site`   |
| `biosamples.biosample_type`    | `biosamples.biosample_type`    |
| `diagnoses.disease`            | `diagnoses.disease`            |
| `diagnoses.phenotype`          | `diagnoses.phenotype`          |
| `diagnoses.phenopacket`        | `diagnoses.phenopacket`        |
| `files.data_modality`          | `files.data_modality`          |
| `files.file_format`            | `files.file_format`            |
| `files.is_supplementary`       | `files.is_supplementary`       |
| `activities.activity_type`     | `activities.activity_type`     |
| `activities.assay_type`        | `activities.assay_type`        |
| `activities.data_modality`     | `activities.data_modality`     |
| `donors.organism_type`         | `donors.organism_type`         |
| `donors.phenotypic_sex`        | `donors.phenotypic_sex`        |
| `donors.reported_ethnicity`    | `donors.reported_ethnicity`    |

### Example `/index/studies` response

Based on real data from DUOS study 111 (phs001489) and its dataset DUOS-000667. The `studies` inner object is new; child entity objects mirror the existing `/index/datasets` shape. Values marked `"..."` are truncated for brevity.

```json
{
  "hits": [
    {
      "entryId": "7658b452-7e09-478e-b49d-44611ce6b691",
      "sources": [
        {
          "source_prefix": "/0",
          "source_spec": "tdr:bigquery:gcp:datarepo-afe52c93:ANVIL_CCDG_Broad_NP_Epilepsy_AUSALF_HMB_IRB_GSA_MD_20250718_ANV5_202508070436",
          "source_id": "e358ba7e-dd04-4bc9-8ac0-50caf137c17d"
        }
      ],
      "bundles": [
        {
          "bundle_uuid": "2424203d-c29b-a3d9-9591-92187a9fe875",
          "bundle_version": "2022-06-01T00:00:00.000000Z"
        }
      ],
      "studies": [
        {
          "study_name": "Center for Common Disease Genomics [CCDG] - Neuropsychiatric: Epilepsy: Epi25 Consortium (phs001489)",
          "registered_identifier": "phs001489",
          "consortia": ["CCDG"],
          "description": "Epilepsy genetics research is at an exciting stage...",
          "study_design": ["Case-Control"],
          "data_types": ["GSA-MD", "WES"],
          "principal_investigator": "Ben Neale",
          "phenotype_indication": "Epilepsy"
        }
      ],
      "datasets": [
        {
          "document_id": "7658b452-7e09-478e-b49d-44611ce6b691",
          "source_datarepo_row_ids": [
            "workspace_attributes:fccb9378-c83c-43da-9f9d-6a0b5bd518b9"
          ],
          "dataset_id": "765586ca-b050-cad7-2968-0adc139b46af",
          "consent_group": ["HMB-IRB-MDS"],
          "data_use_permission": ["HMB-IRB-MDS"],
          "owner": [null],
          "principal_investigator": [null],
          "registered_identifier": ["phs001489"],
          "title": "ANVIL_CCDG_Broad_NP_Epilepsy_AUSALF_HMB_IRB_GSA_MD",
          "data_modality": [null],
          "description": "[Description currently not available]",
          "duos_id": "DUOS-000667",
          "accessible": false
        }
      ],
      "activities": [
        {
          "activity_type": ["Indexing", "Unknown"],
          "assay_type": [null],
          "data_modality": [null]
        }
      ],
      "biosamples": [
        {
          "anatomical_site": [null],
          "biosample_type": [null],
          "disease": [null],
          "donor_age_at_collection_unit": [null],
          "donor_age_at_collection": [{ "gte": null, "lte": null }]
        }
      ],
      "diagnoses": [],
      "donors": [],
      "files": [
        {
          "data_modality": [null],
          "file_format": [".vcf.gz"],
          "file_size": 2351439457,
          "reference_assembly": [null],
          "is_supplementary": [false, true],
          "count": 17
        },
        {
          "data_modality": [null],
          "file_format": [".idat"],
          "file_size": 295669520,
          "reference_assembly": [null],
          "is_supplementary": [false],
          "count": 32
        }
      ]
    }
  ],
  "termFacets": {
    "studies.study_name": {
      "terms": [
        {
          "term": "Center for Common Disease Genomics [CCDG] - Neuropsychiatric: Epilepsy: Epi25 Consortium (phs001489)",
          "count": 1
        }
      ],
      "total": 73,
      "type": "terms"
    },
    "studies.consortia": {
      "terms": [
        { "term": "CCDG", "count": 283 },
        { "term": "CMG", "count": 20 },
        { "term": "CSER", "count": 8 },
        { "term": "GREGoR", "count": 7 }
      ],
      "total": 73,
      "type": "terms"
    },
    "studies.study_design": {
      "terms": [
        { "term": "Case-Control", "count": "..." },
        { "term": "Cohort", "count": "..." }
      ],
      "total": 73,
      "type": "terms"
    },
    "datasets.consent_group": {
      "terms": [
        { "term": "HMB-IRB-MDS", "count": "..." },
        { "term": "GRU", "count": "..." }
      ],
      "total": 73,
      "type": "terms"
    },
    "datasets.data_use_permission": {
      "terms": [
        { "term": "HMB-IRB-MDS", "count": "..." },
        { "term": "GRU", "count": "..." }
      ],
      "total": 73,
      "type": "terms"
    },
    "datasets.title": {
      "terms": [
        {
          "term": "ANVIL_CCDG_Broad_NP_Epilepsy_AUSALF_HMB_IRB_GSA_MD",
          "count": 1
        }
      ],
      "total": 73,
      "type": "terms"
    },
    "biosamples.disease": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "biosamples.anatomical_site": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "biosamples.biosample_type": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "diagnoses.disease": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "diagnoses.phenotype": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "diagnoses.phenopacket": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "files.data_modality": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "files.file_format": {
      "terms": [
        { "term": ".vcf.gz", "count": "..." },
        { "term": ".idat", "count": "..." }
      ],
      "total": 73,
      "type": "terms"
    },
    "files.is_supplementary": {
      "terms": [
        { "term": "false", "count": "..." },
        { "term": "true", "count": "..." }
      ],
      "total": 73,
      "type": "terms"
    },
    "activities.activity_type": {
      "terms": [{ "term": "Indexing", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "activities.assay_type": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "activities.data_modality": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "donors.organism_type": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "donors.phenotypic_sex": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    },
    "donors.reported_ethnicity": {
      "terms": [{ "term": "...", "count": "..." }],
      "total": 73,
      "type": "terms"
    }
  }
}
```

### Study detail: `/index/studies/{studyId}`

Returns a single study entity. Modeled after the dataset detail response (`/index/datasets/{datasetId}`) but with study-specific fields added. The response shape is the same as a single hit from `/index/studies` above.

## Coverage (as of 2026-03-12)

### Study field coverage (across 73 studies)

| Field               | Coverage     |
| ------------------- | ------------ |
| name                | 73/73 (100%) |
| description         | 73/73 (100%) |
| piName              | 73/73 (100%) |
| dataTypes           | 73/73 (100%) |
| phenotypeIndication | 72/73 (99%)  |
| dbGaPPhsID          | 66/73 (90%)  |
| collaboratingSites  | 65/73 (89%)  |

### Consortia coverage (across 382 datasets)

| Metric                              | Count             |
| ----------------------------------- | ----------------- |
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

## Open Questions

1. **4 datasets with no `registered_identifier`** (ANVIL_1000G_high_coverage_2019, ANVIL_GTEx_public_data, ANVIL_T2T, ANVIL_T2T_CHRY): Treat as standalone single-dataset studies, exclude, or group as "Unregistered"?
2. **7 studies with no `dbGaPPhsID` in DUOS** (10% of studies): How should studies without a registered identifier be keyed and linked to their datasets?
3. **Dataset-specific descriptions:** All datasets in a study share the same DUOS description. How to differentiate them on a study detail view?

## Frontend Context

![Studies tab mockup](https://github.com/user-attachments/assets/3e28c6c4-2a59-482f-9e69-669b1954430d)

The front end will add a Studies tab, a study detail page, and a Consortia filter facet and column across entity tabs. This enables consortia to share direct links to the collection of their datasets in the explorer.

## References

- GitHub issue: https://github.com/DataBiosphere/data-browser/issues/4376
- Azul issue: https://github.com/DataBiosphere/azul/issues/7813
- DUOS endpoint: `GET /api/tdr/{DUOS-ID}` on `consent.dsde-prod.broadinstitute.org`
- Current datasets API: `https://service.explore.anvilproject.org/index/datasets?catalog=anvil13`

---

## Addendum: Data Source

There may be other ways to query the DUOS API; these are examples.

Fetch consortia for a dataset:

```bash
TOKEN=$(gcloud auth print-access-token)
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://consent.dsde-prod.broadinstitute.org/api/tdr/DUOS-000667" \
  | jq '.study.properties[] | select(.key == "collaboratingSites") | .value'
# => ["CCDG"]
```

Fetch study fields for a dataset:

```bash
TOKEN=$(gcloud auth print-access-token)
curl -s -H "Authorization: Bearer $TOKEN" \
  "https://consent.dsde-prod.broadinstitute.org/api/tdr/DUOS-000667" \
  | jq '.study | {name, description, dataTypes, properties: [.properties[] | {(.key): .value}]}'
```

## Addendum: Coverage Scripts

Scripts used to generate the coverage data above. Requires `gcloud auth login` and `pip install requests`.

### Study coverage

```python
#!/usr/bin/env python3
"""
Fetch all AnVIL datasets, extract unique studies from DUOS, and report coverage.
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
            props = {p["key"]: p.get("value") for p in study.get("properties", [])}
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
for field in ["name", "description", "piName", "dataTypes",
              "phenotypeIndication", "dbGaPPhsID", "collaboratingSites"]:
    n = sum(1 for s in studies.values() if s.get(field))
    print(f"  {field}: {n}/{len(studies)} ({100*n/len(studies):.0f}%)")

# Dataset count distribution
print(f"\n=== DATASETS PER STUDY ===")
sizes = sorted([s["datasetCount"] for s in studies.values()], reverse=True)
print(f"  Max: {sizes[0]}, Median: {sizes[len(sizes)//2]}, Min: {sizes[-1]}")
print(f"  Studies with 1 dataset: {sum(1 for s in sizes if s == 1)}")
print(f"  Top 10:")
for s in sorted(studies.values(), key=lambda x: x["datasetCount"], reverse=True)[:10]:
    print(f"    {s['name'][:70]}: {s['datasetCount']} datasets")

# Datasets with no registered_identifier
no_reg = [d for d in datasets
          if not d["registered_identifier"] or d["registered_identifier"] == ["none"]]
print(f"\n=== DATASETS WITH NO registered_identifier: {len(no_reg)} ===")
for d in no_reg:
    print(f"  - {d['title']}")
```

### Consortia coverage

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
