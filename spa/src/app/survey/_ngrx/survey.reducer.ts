/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Survey reducer, handles actions related to handling survey-related state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SurveyState } from "./survey.state";

/**
 * @param {SurveyState} state
 * @param {Action} action
 * @returns {SurveyState}
 */
export function reducer(state: SurveyState = SurveyState.getDefaultState(), action: Action): SurveyState {

    return state;
}
