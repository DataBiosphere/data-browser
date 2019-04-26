/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a search term group that can be included in the set of possible search terms to select from. Search terms
 * are grouped by facet name or entity (spec) name.
 */

// App dependencies
import { SearchTermOption } from "./search-term-option.model";

export interface SearchTermOptionGroup {
    displayValue: string;
    searchKey: string;
    options: SearchTermOption[];
}
