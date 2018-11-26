/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a facet that is filterable.
 */

export interface FilterableFacet {
    displayName: string;
    facetName: string;
    terms: { termName: string; count: number }[];
}
