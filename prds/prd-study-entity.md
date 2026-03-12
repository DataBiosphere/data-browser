# PRD: Study Entity

## Goal

Add a new `studies` entity to the Azul index so the front end can display a Studies tab with study-level aggregations.

## Background

Multiple datasets share the same parent study (`registered_identifier` / phsId). There are ~70 unique studies across ~360 datasets. Currently there is no study-level entity in the API — study info is only available as repeated fields across dataset hits.

## API Changes

### New endpoint: `/index/studies`

Returns study-level entities with the same pagination, filtering, and facet structure as `/index/datasets`.

### Study entity fields

| Field                | Source     | DUOS Path                                                 |
| -------------------- | ---------- | --------------------------------------------------------- |
| Study Name           | DUOS       | `study.name`                                              |
| dbGAP phsId          | DUOS       | `study.properties[key=dbGaPPhsID].value`                  |
| Consortia            | DUOS       | `study.properties[key=collaboratingSites].value`          |
| Description          | DUOS       | `study.description`                                       |
| Disease / Indication | DUOS       | `study.properties[key=phenotypeIndication].value`         |
| Data Types           | DUOS       | `study.dataTypes`                                         |
| Consent Codes        | Aggregated | Union of `consent_group` across child datasets            |
| Participant Count    | Aggregated | Sum of per-dataset `# of participants` property from DUOS |
| File Size            | Aggregated | Sum of `file_size` across child dataset files             |

### Facets on `/index/studies`

Same cross-entity facets as other endpoints (disease, consent group, data modality, etc.) plus `datasets.consortia`.

### Study detail

`/index/studies/{studyId}` should return the study fields above plus the list of child datasets.

## Open Questions

1. **~10 datasets with no `registered_identifier`:** Treat as standalone single-dataset studies, exclude, or group as "Unregistered"?
2. **Dataset-specific descriptions:** All datasets in a study currently share the same DUOS description. How to differentiate them on a study detail view?

## Frontend Context

![Studies tab mockup](https://github.com/user-attachments/assets/3e28c6c4-2a59-482f-9e69-669b1954430d)

The front end will add a Studies tab, a study detail page, and rename the "Identifier" filter to "Study." No frontend work is in scope for this PRD.

## References

- GitHub issue: https://github.com/DataBiosphere/data-browser/issues/4376
- Azul issue: https://github.com/DataBiosphere/azul/issues/7813
- DUOS endpoint: `GET /api/tdr/{DUOS-ID}` on `consent.dsde-prod.broadinstitute.org`
- Current datasets API: `https://service.explore.anvilproject.org/index/datasets?catalog=anvil12`
