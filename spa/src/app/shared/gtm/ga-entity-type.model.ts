/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Possible values of Google Analytic entity types.
 */

export enum GAEntityType {
    "COHORT_EXPORT" = "Cohort Export", // eg Request export to Terra
    "COHORT_EXPORT_LINK" = "Cohort Export Link", // eg Click on generated Terra link, click on copy to clipboard for generated Terra link
    "COHORT_MANIFEST" = "Cohort Manifest",
    "COHORT_MANIFEST_LINK" = "Cohort Manifest Link",
    "PROJECT_MANIFEST_LINK" = "Project Manifest Link"
}
