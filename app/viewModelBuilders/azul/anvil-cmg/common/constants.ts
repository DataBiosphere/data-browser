/**
 * Titles of datasets that cannot be exported to Terra. Their verbatim PFB manifests are too large to generate,
 * and Terra is unable to import them.
 * See https://github.com/DataBiosphere/azul/issues/8134.
 */
export const TERRA_EXPORT_UNAVAILABLE_DATASET_TITLES = [
  "ANVIL_eMERGE_GWAS_GRU",
  "ANVIL_eMERGE_GWAS_HMB_GSO",
  "ANVIL_eMERGE_GWAS_HMB_MDS",
  "ANVIL_eMERGE_GWAS_HMB_PUB_GSO",
];

/**
 * Reason Terra export is unavailable, shared by the dataset and cohort explanations.
 */
export const TERRA_EXPORT_UNAVAILABLE_REASON =
  "metadata is too large for Terra to import";

/**
 * Explanation displayed when Terra export is unavailable for a dataset.
 */
export const TERRA_EXPORT_UNAVAILABLE_DATASET_MESSAGE = `Export to Terra is unavailable for this dataset because its ${TERRA_EXPORT_UNAVAILABLE_REASON}.`;
