import { AccessionNamespace } from "./accession-namespace.model";

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Accession configuration values, used when mapping accession values returned from /projects and /projects/uuid
 * endpoints into FE-specific model.
 */

export const AccessionConfigs: AccessionConfig[] = [
    {
        identifierOrgPrefix: "arrayexpress",
        label: "Array Express Accessions",
        responseKey: "array_express"
    },
    {
        identifierOrgPrefix: "geo",
        label: "Array Express Accessions",
        responseKey: "geo_series"
    }
];


    "insdc_project": AccessionNamespace.INSDC_PROJECT,
    "insdc_study": AccessionNamespace.INSDC_STUDY



private ACCESSION_PATH_BY_ACCESSION_KEY = new Map([
    [AccessionNamespace.ARRAY_EXPRESS, ""],
    [AccessionNamespace.GEO_SERIES, ""],
    [AccessionNamespace.INSDC_PROJECT, "enarrayexpressa.embl"],
    [AccessionNamespace.INSDC_STUDY, "ena.embl"]
]);


private DISPLAY_NAME_ACCESSION_NAMESPACE = {
    [AccessionNamespace.GEO_SERIES]: "GEO Series Accessions",
    [AccessionNamespace.INSDC_PROJECT]: "INSDC Project Accessions",
    [AccessionNamespace.INSDC_STUDY]: "INSDC Study Accessions"
};
