/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Interface indicating terms are sortable. Used by search terms, facet terms, file type summary views (for manifest
 * generation/Terra export).
 */

export interface TermSortable {

    /**
     * Return value to be used as the key when sorting the term.
     *
     * @returns {string}
     */
    getSortValue(): string;
}

