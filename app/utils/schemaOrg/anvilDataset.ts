import type { DatasetEntity } from "../../apis/azul/anvil-cmg/common/entities";
import type { DatasetsResponse } from "../../apis/azul/anvil-cmg/common/responses";
import { MAX_KEYWORDS } from "./constants";
import type { SchemaDataset } from "./types";
import { buildDescription, uniqueNonEmpty } from "./utils";

const CATALOG_NAME = "AnVIL Data Explorer";
const DESCRIPTION_FALLBACK_SUFFIX = `${CATALOG_NAME} dataset.`;
const DBGAP_STUDY_URL =
  "https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=";
// dbGaP study accession format (e.g. "phs001234"). We validate against this
// before constructing identifiers.org / dbGaP study URLs so a non-dbGaP value
// in `registered_identifier` doesn't produce a malformed link.
const DBGAP_ACCESSION_PATTERN = /^phs\d+/;

/**
 * Builds a Schema.org Dataset JSON-LD object for an AnVIL CMG dataset.
 *
 * Returns `undefined` when the response does not carry a dataset we can
 * describe (i.e. no dataset entity), so the caller can skip rendering.
 * @param data - AnVIL CMG dataset detail response from Azul.
 * @param browserURL - Site base URL used for canonical and catalog URLs.
 * @returns Schema.org Dataset JSON-LD object, or `undefined` if not buildable.
 */
export function buildAnvilDatasetJsonLd(
  data: DatasetsResponse,
  browserURL: string
): SchemaDataset | undefined {
  const dataset = data.datasets?.[0];
  if (!dataset) return undefined;

  const name = dataset.title || dataset.dataset_id;
  const description = buildDescription(
    dataset.description || "",
    name,
    DESCRIPTION_FALLBACK_SUFFIX
  );
  const identifier = uniqueNonEmpty([
    dataset.dataset_id,
    ...dataset.registered_identifier,
  ]);

  const jsonLd: SchemaDataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    description,
    identifier,
    includedInDataCatalog: {
      "@type": "DataCatalog",
      name: CATALOG_NAME,
      url: browserURL,
    },
    // Google's `isAccessibleForFree` is the inverse of "paid", not "unrestricted" — dbGaP gating doesn't change the value.
    isAccessibleForFree: true,
    name,
    url: `${browserURL}/datasets/${dataset.dataset_id}`,
  };

  const sameAs = buildSameAs(dataset);
  if (sameAs.length > 0) jsonLd.sameAs = sameAs;

  const keywords = buildKeywords(data);
  if (keywords.length > 0) jsonLd.keywords = keywords;

  return jsonLd;
}

/**
 * Builds a keywords array by unioning biologically-meaningful fields from the
 * dataset's aggregated activity/biosample/donor/file/library/diagnosis
 * responses.
 * @param data - AnVIL CMG dataset detail response.
 * @returns Deduplicated keywords array.
 */
function buildKeywords(data: DatasetsResponse): string[] {
  const values: (string | null | undefined)[] = [];
  for (const activity of data.activities ?? []) {
    values.push(...(activity.activity_type ?? []));
    values.push(...(activity.data_modality ?? []));
  }
  for (const biosample of data.biosamples ?? []) {
    values.push(...(biosample.anatomical_site ?? []));
    values.push(...(biosample.biosample_type ?? []));
  }
  for (const donor of data.donors ?? []) {
    values.push(...(donor.organism_type ?? []));
    values.push(...(donor.phenotypic_sex ?? []));
    values.push(...(donor.reported_ethnicity ?? []));
  }
  for (const diagnosis of data.diagnoses ?? []) {
    values.push(...(diagnosis.disease ?? []));
  }
  for (const file of data.files ?? []) {
    values.push(...(file.data_modality ?? []));
    values.push(...(file.file_format ?? []));
  }
  for (const library of data.libraries ?? []) {
    values.push(...(library.prep_material_name ?? []));
  }
  return uniqueNonEmpty(values).slice(0, MAX_KEYWORDS);
}

/**
 * Builds the sameAs array of external accession URLs. AnVIL datasets reference
 * dbGaP study pages via their `registered_identifier` (phs accessions).
 * @param dataset - AnVIL dataset entity.
 * @returns Array of canonical dbGaP study URLs.
 */
function buildSameAs(dataset: DatasetEntity): string[] {
  const urls: string[] = [];
  for (const id of dataset.registered_identifier) {
    if (!id) continue;
    const trimmed = id.trim();
    if (!DBGAP_ACCESSION_PATTERN.test(trimmed)) continue;
    urls.push(`${DBGAP_STUDY_URL}${trimmed}`);
  }
  return uniqueNonEmpty(urls);
}
