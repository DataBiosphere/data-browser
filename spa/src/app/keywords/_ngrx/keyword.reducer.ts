/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File facet list reducer, handles actions related to selecting and deselecting facet terms, and corresponding knock-on
 * actions such as requesting updated list of facets.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { KeywordState } from "./keyword.state";
import { ClearKeywordQueryAction, FetchKeywordsRequestAction, FetchKeywordsSuccessAction } from "./keyword.actions";

export function reducer(state: KeywordState = KeywordState.getDefaultState(), action: Action) {

    switch (action.type) {

        case FetchKeywordsRequestAction.ACTION_TYPE:
            return state.requestKeywordQuery(action as FetchKeywordsRequestAction);
        case FetchKeywordsSuccessAction.ACTION_TYPE:
            return state.receiveKeywordQuery(action as FetchKeywordsSuccessAction);

        // Handle case where either file or donor search is to be cleared - create new default keyword state but must
        // also set the type on the state so corresponding file/donor components can handle clear state correctly
        // TODO setting type on cleared state should no longer be necessary with next round of changes when search is meta-driven and is typed with classes rather than with type value on KeyWordState.
        case ClearKeywordQueryAction.ACTION_TYPE:
            let clearState = KeywordState.getDefaultState();
            clearState.type = (action as ClearKeywordQueryAction).keywordType;
            return clearState;

        default:
            return state;
    }
}

