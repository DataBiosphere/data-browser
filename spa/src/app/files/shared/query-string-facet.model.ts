/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of selected facet state as specified in a URL query param.
 */

export class QueryStringFacet {

    /**
     * @param {string} facetName
     * @param {string[]} selectedTermNames
     */
    constructor(public readonly facetName: string, public readonly selectedTermNames: string[]) {}
}


