/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when bulk download is requested.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { BulkDownloadExecutionEnvironment } from "../../get-data/bulk-download/bulk-download-execution-environment.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";

export class RequestBulkDownloadAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "GET_DATA.REQUEST_BULK_DOWNLOAD";
    public readonly type = RequestBulkDownloadAction.ACTION_TYPE;

    /**
     * @param {string} shell
     */
    constructor(private shell: BulkDownloadExecutionEnvironment) {}

    /**
     * Return the request bulk download action as a GA event.
     *
     * param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery, index}): GAEvent {

        return {
            category: GACategory.BULK_DOWNLOAD,
            action: GAAction.REQUEST,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.BULK_DOWNLOAD,
                [GADimension.INDEX]: index,
                [GADimension.TOOL_NAME]: this.shell
            }
        };
    }
}

