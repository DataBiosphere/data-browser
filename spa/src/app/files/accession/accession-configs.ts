/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Accession configuration values, used when mapping accession values returned from /projects and /projects/uuid
 * endpoints into FE-specific model.
 */

// App dependencies
import { AccessionConfig } from "./accession-config.model";

/* Keys of accession config object - used when grouping accession configs by different values */
type AccessionConfigKeys = keyof AccessionConfig;

/* Accession configuration values */
const ACCESSION_CONFIGS: AccessionConfig[] = [
    {
        identifierOrgPrefix: "arrayexpress",
        label: "Array Express Accessions",
        responseKey: "array_express"
    },
    {
        identifierOrgPrefix: "biostudies",
        label: "BioStudies Accessions",
        responseKey: "biostudies"
    },
    {
        identifierOrgPrefix: "geo",
        label: "GEO Series Accessions",
        responseKey: "geo_series"
    },
    {
        identifierOrgPrefix: "ena.embl",
        label: "INSDC Project Accessions",
        responseKey: "insdc_project"
    },
    {
        identifierOrgPrefix: "ena.embl",
        label: "INSDC Study Accessions",
        responseKey: "insdc_study"
    },
];

/**
 * Build up map of accession configs keyed by response key.
 */
export const ACCESSION_CONFIGS_BY_RESPONSE_KEY = groupAccessionBy("responseKey", ACCESSION_CONFIGS);

/**
 * Group accession configs by the given key.
 * @param {AccessionConfigKeys} groupBy
 * @param {AccessionConfig[]} configs
 */
function groupAccessionBy(groupBy: AccessionConfigKeys, configs: AccessionConfig[]): Map<string, AccessionConfig> {

    return configs.reduce((accum, config) => {
        accum.set(config[groupBy], config);
        return accum;
    }, new Map<string, AccessionConfig>());
}
