/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file file location download is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class FetchFileFileLocationRequestAction implements Action, TrackingAction {

    public static ACTION_TYPE = "FILE.FETCH_FILE_FILE_LOCATION_REQUEST";
    public readonly type = FetchFileFileLocationRequestAction.ACTION_TYPE;

    constructor(public readonly fileUrl: string,
                public readonly fileName: string,
                public readonly fileFormat: string) {}

    /**
     * Return the clear action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.FILE,
            action: GAAction.DOWNLOAD,
            label: this.fileName,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_URL]: this.fileUrl,
                [GADimension.RELATED_ENTITY_TYPE]: this.fileFormat,
                [GADimension.RELATED_ENTITY_ID]: this.fileName
            }
        };
    }
}
