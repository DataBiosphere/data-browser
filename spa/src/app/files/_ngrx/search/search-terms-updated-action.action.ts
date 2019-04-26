/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when updated set of file facets has been requested and as a result, a new set of search terms have
 * been created in response.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SearchTerm } from "../../search/search-term.model";

export class SearchTermsUpdatedAction implements Action {
    public static ACTION_TYPE = "FILE.SEARCH.SEARCH_TERMS_UPDATED";
    public readonly type = SearchTermsUpdatedAction.ACTION_TYPE;
    constructor(public readonly searchTerms: SearchTerm[]) {}
}
