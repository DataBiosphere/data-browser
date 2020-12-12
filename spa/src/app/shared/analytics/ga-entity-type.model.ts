/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of Google Analytic entity types.
 */

export enum GAEntityType {
    "CATALOG" = "Catalog",
    "COHORT_EXPORT" = "Cohort Export", // eg Request export to Terra
    "COHORT_EXPORT_LINK" = "Cohort Export Link", // eg Click on generated Terra link, click on copy to clipboard for generated Terra link
    "COHORT_MANIFEST" = "Cohort Manifest",
    "COHORT_MANIFEST_LINK" = "Cohort Manifest Link",
    "COHORT_MATRIX" = "Cohort Matrix",
    "COHORT_MATRIX_LINK" = "Cohort Matrix Link",
    "FACET" = "Facet",
    "PROJECT" = "Project",
    "PROJECT_MANIFEST_LINK" = "Project Manifest Link",
    "PROJECT_CGM_MATRIX" = "Project CGM Matrix",
    "PROJECT_DCP_MATRIX" = "Project DCP Matrix",
    "PROJECT_MATRIX_LINK" = "Project Matrix Link"
}
