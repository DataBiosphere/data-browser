/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selected term from facet menu, or selected entity.
 */

export interface SearchTerm {

    facetName: string;
    name: string;

    /**
     * Return value to be used when searching for this term.
     *
     * @returns {string}
     */
    getSearchKey(): string;
}


