/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when cohort manifest has been requested by user.
 */

// App dependencies
import { Action } from "@ngrx/store";

// Core dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class RequestCohortManifestAction implements Action, TrackingAction {
    public static ACTION_TYPE = "EXPORT.REQUEST_COHORT_MANIFEST";
    public readonly type = RequestCohortManifestAction.ACTION_TYPE;

    /**
     * Return the cohort manifest action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, currentQuery }): GAEvent {
        return {
            category: GACategory.MANIFEST,
            action: GAAction.REQUEST,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_MANIFEST,
            },
        };
    }
}
