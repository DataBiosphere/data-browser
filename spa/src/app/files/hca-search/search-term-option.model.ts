/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a search term that can be included in the set of possible search terms to select from.
 */

export interface SearchTermOption {
    displayValue: string;
    count: number;
    searchValue: string
}
