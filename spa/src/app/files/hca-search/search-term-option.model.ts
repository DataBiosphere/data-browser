/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a dropdown option that can be included in the set of possible search terms to select from, in the search
 * autosuggest.
 */

// App dependencies
import { TermSortable } from "../sort/term-sortable.model";

export class SearchTermOption implements TermSortable {
    /**
     * @param {string} displayValue
     * @param {number} count
     * @param {string} searchValue
     * @param {string} sortValue
     */
    constructor(
        public readonly displayValue: string,
        public readonly count: number,
        public readonly searchValue: string,
        private readonly sortValue: string
    ) {}

    /**
     * Return the sort value for this options.
     *
     * @returns {string}
     */
    public getSortValue(): string {
        return this.sortValue;
    }
}
