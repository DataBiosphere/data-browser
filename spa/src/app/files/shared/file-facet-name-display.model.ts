/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Mapping from file facet name to their corresponding display text. If file facet is not listed, then display text is
 * title case of facet name.
 */

export enum FileFacetNameDisplay {
    "disease" = "Disease Status",
    "libraryConstructionApproach" = "Library Construction Method",
    "projectId" = "Project",
    "sampleEntityType" = "Sample Type",
    "workflow" = "Analysis Protocol"
}
