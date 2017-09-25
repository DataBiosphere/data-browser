import { Action } from "@ngrx/store";
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

export class ClearKeywordQueryAction implements Action {
    public static ACTION_TYPE= "KEYWORD.CLEAR_QUERY";
    public readonly type = ClearKeywordQueryAction.ACTION_TYPE;
    constructor() {}
}