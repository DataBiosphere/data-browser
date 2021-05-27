/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when cohort manifest URL has been copied to clipboard by the user.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class CopyToClipboardCohortManifestURLAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "EXPORT.COPY_TO_CLIPBOARD_COHORT_MANIFEST_URL";
    public readonly type = CopyToClipboardCohortManifestURLAction.ACTION_TYPE;

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
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.MANIFEST,
            action: GAAction.COPY_TO_CLIPBOARD,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_MANIFEST_LINK,
                [GADimension.ENTITY_URL]: this.manifestUrl
            }
        };
    }
}
