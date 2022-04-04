/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when "take survey" button is clicked.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../../files/_ngrx/analytics/tracking.action";
import { GAEvent } from "../../shared/analytics/ga-event.model";
import { GACategory } from "../../shared/analytics/ga-category.model";
import { GAAction } from "../../shared/analytics/ga-action.model";

export class TakeSurveyAction implements Action, TrackingAction {
    public static ACTION_TYPE = "SURVEY.TAKE_SURVEY";
    public readonly type = TakeSurveyAction.ACTION_TYPE;

    /**
     * @param surveyName
     */
    constructor(private readonly surveyName: string) {}
    /**
     * Return the clear action as a GA event.
     *
     * @returns {GAEvent}
     */
    public asEvent(): GAEvent {
        return {
            category: GACategory.SURVEY,
            action: GAAction.LAUNCH,
            label: this.surveyName,
        };
    }
}
