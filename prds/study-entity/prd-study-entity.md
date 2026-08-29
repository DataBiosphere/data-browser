# PRD: Study Entity and Filters

## Background

On the AnVIL Data Explorer, multiple datasets share the same parent study (`registered_identifier` / phsId). Currently there is no study-level entity in the API — partial study-level info is only available as repeated fields across dataset hits. A study entity collapses these into a single browsable entry with aggregated statistics.

It is also difficult for consortia to link directly to their collection of studies — they can only link to a list of datasets, which may span multiple studies.

As of 2026-03-12: 382 datasets map to **73 unique studies** in DUOS. 4 datasets have no `registered_identifier`.

## Goals

1. Add a `studies` entity to the Azul index with study-level fields and aggregations.
2. Enable studies and their child entities (datasets, biosamples, donors, activities, files) to be filterable by the key study-level properties including a consortia filter enabling consortia to share direct links to the collection of their datasets in the explorer.

## Studies Data Source

Study info can be sourced from the DUOS API (`GET /api/tdr/{DUOS-ID}` → `response.study`). In the DUOS API, study info is embedded in the dataset response — there is no "list all studies" endpoint, so studies must be deduped from dataset responses.

## API Changes

> This document aims to follow existing Azul API patterns for how entities, inner objects, and facets are structured. If any pattern is described incorrectly, or if we want to introduce optimizations that deviate from the current patterns, the spec should be adjusted accordingly.

### New endpoint: `/index/studies`

The new `/index/studies` endpoint returns study entities with the same filtering and facet structure as the other entity endpoints. Hits and termFacets are updated as outlined below.

### Hits

#### New hit fields

These new study-level fields are sourced from DUOS and appear in full on the `/index/studies` hit response. On other entity endpoints (`/index/datasets`, `/index/files`, etc.), a `studies` object is included in hits but abbreviated to just `study_name`, `registered_identifier`, and `consortia`, following the existing practice of including summary parent objects on child entity hits.

| Field                  | Azul Key                         | DUOS Path                                                               | Notes                                                                                |
| ---------------------- | -------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Registered Identifier  | `studies.registered_identifier`  | `study.properties[key=dbGaPPhsID].value`                                | 66/73 studies (90% coverage). See open question below for studies missing this field |
| Study Name             | `studies.study_name`             | `study.name`                                                            | 73 unique values, 100% coverage                                                      |
| Consortia              | `studies.consortia`              | `study.properties[key=collaboratingSites].value`                        | 19 unique values, 65/73 studies (89%), 365/382 datasets (95.5%)                      |
| Study Design           | `studies.study_design`           | `study.properties[key=data].value.tags` (prefix `dbGaP_study_design: `) | 11 unique values, 90% coverage                                                       |
| Description            | `studies.description`            | `study.description`                                                     | 100% coverage                                                                        |
| Phenotype Indication   | `studies.phenotype_indication`   | `study.properties[key=phenotypeIndication].value`                       | 72/73 studies (99% coverage). String type in DUOS (single value, not array)          |
| Data Types             | `studies.data_types`             | `study.dataTypes`                                                       | 100% coverage                                                                        |
| Principal Investigator | `studies.principal_investigator` | `study.piName`                                                          | 100% coverage                                                                        |

#### Existing hit fields rolled up from children to study

These fields already exist on dataset entity responses. On `/index/studies`, they are aggregated up from datasets sharing the same `registered_identifier` as the study's `dbGaPPhsID`.

| Field                      | Source field                         | Roll-up rule             |
| -------------------------- | ------------------------------------ | ------------------------ |
| Accessible                 | `datasets.accessible`                | Union of unique values   |
| Consent Group              | `datasets.consent_group`             | Union of unique values   |
| Data Use Permission        | `datasets.data_use_permission`       | Union of unique values   |
| Title                      | `datasets.title`                     | Union of unique values   |
|                            |                                      |                          |
| Anatomical Site            | `biosamples.anatomical_site`         | Union of unique values   |
| Biosample Type             | `biosamples.biosample_type`          | Union of unique values   |
| Disease (Biosamples)       | `biosamples.disease`                 | Union of unique values   |
| Donor Age at Collection    | `biosamples.donor_age_at_collection` | Union of unique ranges   |
|                            |                                      |                          |
| Disease (Diagnoses)        | `diagnoses.disease`                  | Union of unique values   |
| Phenopacket                | `diagnoses.phenopacket`              | Union of unique values   |
| Phenotype                  | `diagnoses.phenotype`                | Union of unique values   |
|                            |                                      |                          |
| Genetic Ancestry           | `donors.genetic_ancestry`            | Union of unique values   |
| Organism Type              | `donors.organism_type`               | Union of unique values   |
| Participant Count          | `donors`                             | Count of unique donors\* |
| Phenotypic Sex             | `donors.phenotypic_sex`              | Union of unique values   |
| Reported Ethnicity         | `donors.reported_ethnicity`          | Union of unique values   |
|                            |                                      |                          |
| Activity Type              | `activities.activity_type`           | Union of unique values   |
| Assay Type                 | `activities.assay_type`              | Union of unique values   |
| Data Modality (Activities) | `activities.data_modality`           | Union of unique values   |
|                            |                                      |                          |
| Data Modality (Files)      | `files.data_modality`                | Union of unique values   |
| File Count                 | `files.count`                        | Sum                      |
| File Format                | `files.file_format`                  | Union of unique values   |
| File Size                  | `files.file_size`                    | Sum                      |
| Is Supplementary           | `files.is_supplementary`             | Union of unique values   |
| Reference Assembly         | `files.reference_assembly`           | Union of unique values   |

\*Some investigation may be needed to determine the unique donor count, as donors may belong to multiple datasets within a study.

### TermFacets

> **Note:** Hit abbreviation and facet propagation are independent. On child entity endpoints, the `studies` hit object is abbreviated to 3 fields (`study_name`, `registered_identifier`, `consortia`), but _all_ 7 `studies.*` facets are available for filtering. This matches the existing pattern: e.g., `/index/files` hits abbreviate `datasets` to just `dataset_id` and `title`, yet all dataset-level facets (`datasets.consent_group`, `datasets.data_use_permission`, etc.) appear as termFacets on `/index/files`.

#### New facets

The following new facets are sourced from the DUOS study entity. Study-level values are propagated down to child entities for filtering, following the existing pattern where all parent facets appear on child endpoints.

For array-valued fields (`consortia`, `study_design`, `data_types`), the full array is propagated to every child entity — the `studies.*` prefix makes the semantics clear (e.g., `studies.data_types: WES` means "belongs to a study tagged with WES," not that the child entity itself is WES).

Facets are propagated to all entity endpoints, following the current practice of propagating all parent facets to children (`/index/studies`, `/index/datasets`, `/index/biosamples`, `/index/donors`, `/index/activities`, `/index/files`):

| Facet                            | Source                                                                  |
| -------------------------------- | ----------------------------------------------------------------------- |
| `studies.registered_identifier`  | `study.properties[key=dbGaPPhsID].value`                                |
| `studies.study_name`             | `study.name`                                                            |
| `studies.consortia`              | `study.properties[key=collaboratingSites].value`                        |
| `studies.study_design`           | `study.properties[key=data].value.tags` (prefix `dbGaP_study_design: `) |
| `studies.phenotype_indication`   | `study.properties[key=phenotypeIndication].value`                       |
| `studies.data_types`             | `study.dataTypes`                                                       |
| `studies.principal_investigator` | `study.piName`                                                          |

#### Existing facets

All existing termFacets from current entity endpoints are also available on `/index/studies`, aggregated from child entities using the same roll-up rules as the hit fields above. All entity endpoints share the same set of existing facets.

| Facet                            | Source field                     |
| -------------------------------- | -------------------------------- |
| `datasets.consent_group`         | `datasets.consent_group`         |
| `datasets.data_use_permission`   | `datasets.data_use_permission`   |
| `datasets.registered_identifier` | `datasets.registered_identifier` |
| `datasets.title`                 | `datasets.title`                 |
|                                  |                                  |
| `biosamples.anatomical_site`     | `biosamples.anatomical_site`     |
| `biosamples.biosample_type`      | `biosamples.biosample_type`      |
| `biosamples.disease`             | `biosamples.disease`             |
|                                  |                                  |
| `diagnoses.disease`              | `diagnoses.disease`              |
| `diagnoses.phenopacket`          | `diagnoses.phenopacket`          |
| `diagnoses.phenotype`            | `diagnoses.phenotype`            |
|                                  |                                  |
| `donors.organism_type`           | `donors.organism_type`           |
| `donors.phenotypic_sex`          | `donors.phenotypic_sex`          |
| `donors.reported_ethnicity`      | `donors.reported_ethnicity`      |
|                                  |                                  |
| `activities.activity_type`       | `activities.activity_type`       |
| `activities.assay_type`          | `activities.assay_type`          |
| `activities.data_modality`       | `activities.data_modality`       |
|                                  |                                  |
| `files.data_modality`            | `files.data_modality`            |
| `files.file_format`              | `files.file_format`              |
| `files.is_supplementary`         | `files.is_supplementary`         |
| `files.reference_assembly`       | `files.reference_assembly`       |
|                                  |                                  |
| `accessible`                     | `accessible`                     |

### Example responses

- [example-duos-response.json](example-duos-response.json) — DUOS API response for `GET /api/tdr/DUOS-000667` showing the dataset wrapper and its embedded `study` object with properties. Abbreviated for brevity; only study-relevant properties are included.
- [example-studies-response.json](example-studies-response.json) — `/index/studies` response with the new `studies` inner entity and all child entities. Based on real data from DUOS study 111 (phs001489) and dataset DUOS-000667.
- [example-datasets-response.json](example-datasets-response.json) — `/index/datasets` response showing the abbreviated `studies` inner entity (`study_name`, `registered_identifier`, `consortia`) and the new study-level termFacets. Based on real data with termFacet counts from the live API.

### Study detail: `/index/studies/{studyId}`

Returns a single study entity. Modeled after the dataset detail response (`/index/datasets/{datasetId}`) but with study-specific fields added. The response shape is the same as a single hit from `/index/studies` above.

## Open Questions

1. **4 datasets with no `registered_identifier`** (ANVIL_1000G_high_coverage_2019, ANVIL_GTEx_public_data, ANVIL_T2T, ANVIL_T2T_CHRY): Some options:
   - Treat as standalone single-dataset studies
   - Exclude from the studies endpoint
   - Group under an "Unregistered" study
2. **7 studies with no `dbGaPPhsID` in DUOS** (10% of studies): How should studies without a registered identifier be keyed and linked to their datasets?
3. **Dataset-specific descriptions:** All datasets in a study share the same DUOS description. How to differentiate them on a study detail view?

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

- [scripts/study_coverage.py](scripts/study_coverage.py) — Study field coverage across unique DUOS studies
- [scripts/consortia_coverage.py](scripts/consortia_coverage.py) — Consortia field coverage across datasets
