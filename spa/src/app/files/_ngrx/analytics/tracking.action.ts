/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of action triggered when action is to be tracked by GA/GTM. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

export interface TrackingAction extends Action {
    
    source?: GASource; // Element/component where tracking event originated
    currentQuery: string; // Current set of selected search terms

    /**
     * Return action in the format of a GA event.
     *
     * @returns {string}
     */
    asEvent(): GAEvent;
}
