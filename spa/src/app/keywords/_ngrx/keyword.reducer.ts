import { KeywordState } from "./keyword.state";
import { Action } from "@ngrx/store";
import { ClearKeywordQueryAction, FetchKeywordsRequestAction, FetchKeywordsSuccessAction } from "./keyword.actions";

export function reducer(state: KeywordState = KeywordState.getDefaultState(), action: Action) {

    switch (action.type) {

        case FetchKeywordsRequestAction.ACTION_TYPE:
            return state.requestKeywordQuery(action as FetchKeywordsRequestAction);
        case FetchKeywordsSuccessAction.ACTION_TYPE:
            return state.receiveKeywordQuery(action as FetchKeywordsSuccessAction);
        case ClearKeywordQueryAction.ACTION_TYPE:
            return KeywordState.getDefaultState();
        default:
            return state;
    }
}

