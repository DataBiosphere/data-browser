/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when cohort manifest has been downloaded by user.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class DownloadCohortManifestAction implements Action, TrackingAction {
    public static ACTION_TYPE = "EXPORT.DOWNLOAD_COHORT_MANIFEST";
    public readonly type = DownloadCohortManifestAction.ACTION_TYPE;

    /**
     * @param {string} manifestUrl
     */
    constructor(private readonly manifestUrl: string) {}

    /**
     * Return the cohort manifest action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, currentQuery }): GAEvent {
        return {
            category: GACategory.MANIFEST,
            action: GAAction.DOWNLOAD,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_MANIFEST_LINK,
                [GADimension.ENTITY_URL]: this.manifestUrl,
            },
        };
    }
}
