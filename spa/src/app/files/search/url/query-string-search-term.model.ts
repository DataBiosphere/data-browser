/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of selected search term parsed from a URL query param, used as an "intermediate" when translating query string
 * values to selected search terms, during application initialization from the current URL.
 */

export class QueryStringSearchTerm {

    /**
     * @param {string} facetName
     * @param {any[]} value - can be an array of string for file facets, or an array of age range values for age range facets.
     */
    constructor(public readonly facetName: string, public readonly value: any[]) {}
}


