/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Interface of terms (search terms, facet terms, file summary views) that are sortable.
 */

export interface TermSortable {

    /**
     * Return value to be used as the key when sorting the term.
     *
     * @returns {string}
     */
    getSortValue(): string;
}

