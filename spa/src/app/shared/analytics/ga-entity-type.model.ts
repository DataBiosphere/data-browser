/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of Google Analytic entity types.
 */

export enum GAEntityType {
    "BULK_DOWNLOAD" = "Bulk Download",
    "BULK_DOWNLOAD_LINK" = "Bulk Download Link",
    "CATALOG" = "Catalog",
    "COHORT_EXPORT" = "Cohort Export", // eg Request export to Terra
    "COHORT_EXPORT_LINK" = "Cohort Export Link", // eg Click on generated Terra link, click on copy to clipboard for generated Terra link
    "COHORT_MANIFEST" = "Cohort Manifest",
    "COHORT_MANIFEST_LINK" = "Cohort Manifest Link",
    "FACET" = "Facet",
    "PROJECT" = "Project",
    "PROJECT_ACCESSION" = "Project Accession",
    "PROJECT_MANIFEST" = "Project Manifest",
    "PROJECT_CGM_MATRIX" = "Project CGM Matrix",
    "PROJECT_DCP_MATRIX" = "Project DCP Matrix",
}
