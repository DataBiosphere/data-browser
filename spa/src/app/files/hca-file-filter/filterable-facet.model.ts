/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a facet that is filterable.
 */

export interface FilterableFacet {
    facetName: string;
    terms: { termName: string; count: number }[];
}
