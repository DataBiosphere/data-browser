/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of search term selected from autosuggest.
 */

// App depedencies
import { SearchTermOptionGroup } from "./search-term-option-group.model";
import { SearchTermOption } from "./search-term-option.model";

export interface SelectedSearchTermOption {
    optionGroup: SearchTermOptionGroup;
    option: SearchTermOption;
}
