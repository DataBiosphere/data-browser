/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Search file and search donor-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { KeywordQueryResponse } from "../shared/keyword-query-response.model";

export class FetchKeywordsRequestAction implements Action {
    public static ACTION_TYPE = "KEYWORD.FETCH_REQUEST";
    public readonly type = FetchKeywordsRequestAction.ACTION_TYPE;
    constructor(public readonly searchTerm: any,
                public readonly keywordType: string) {}
}

export class FetchKeywordsSuccessAction implements Action {
    public static ACTION_TYPE = "KEYWORD.FETCH_SUCCESS";
    public readonly type = FetchKeywordsSuccessAction.ACTION_TYPE;
    constructor(public readonly response: KeywordQueryResponse) {}
}

/**
 * Action that is triggered when file search box or donor search box is cleared completely, or if length text in either 
 * text box is less than two characters.
 */
export class ClearKeywordQueryAction implements Action {
    public static ACTION_TYPE= "KEYWORD.CLEAR_QUERY";
    public readonly type = ClearKeywordQueryAction.ACTION_TYPE;
    // TODO must keep track of keyword type (file or donor) so corresponding facet component can handle clear event, see associated comments in keyword.reducer.
    constructor(public readonly keywordType: string) {}
}
