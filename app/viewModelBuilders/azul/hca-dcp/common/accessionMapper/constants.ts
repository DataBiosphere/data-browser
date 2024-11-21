import { groupAccessionBy } from "./accessionMapper";
import { AccessionConfig } from "./entities";

/* Accession configuration values */
export const ACCESSION_CONFIGS: AccessionConfig[] = [
  {
    identifierOrgPrefix: "arrayexpress",
    label: "Array Express Accessions",
    responseKey: "array_express",
  },
  {
    identifierOrgPrefix: "biostudies",
    label: "BioStudies Accessions",
    responseKey: "biostudies",
  },
  {
    identifierOrgPrefix: "ega.study",
    label: "EGA Accessions",
    responseKey: "ega",
  },
  {
    identifierOrgPrefix: "dpgap",
    label: "dbGaP Accessions",
    responseKey: "dpgap",
  },
  {
    identifierOrgPrefix: "geo",
    label: "GEO Series Accessions",
    responseKey: "geo_series",
  },
  {
    identifierOrgPrefix: "ena.embl",
    label: "INSDC Project Accessions",
    responseKey: "insdc_project",
  },
  {
    identifierOrgPrefix: "ena.embl",
    label: "INSDC Study Accessions",
    responseKey: "insdc_study",
  },
];

/**
 * Build up map of accession configs keyed by response key.
 */
export const ACCESSION_CONFIGS_BY_RESPONSE_KEY = groupAccessionBy(
  "responseKey",
  ACCESSION_CONFIGS
);

export const IDENTIFIERS_ORG_URL = "https://identifiers.org";
