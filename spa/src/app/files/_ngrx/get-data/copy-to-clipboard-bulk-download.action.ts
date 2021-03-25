/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when bulk download curl command is copied.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { BulkDownloadExecutionEnvironment } from "../../hca-get-data/bulk-download/bulk-download-execution-environment.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";

export class CopyToClipboardBulkDownloadAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "GET_DATA.COPY_TO_CLIPBOARD_BULK_DOWNLOAD";
    public readonly type = CopyToClipboardBulkDownloadAction.ACTION_TYPE;

    /**
     * @param {BulkDownloadExecutionEnvironment} shell
     * @param {string} manifestUrl
     */
    constructor(private shell: BulkDownloadExecutionEnvironment, private manifestUrl: string) {}

    /**
     * Return the request bulk download action as a GA event.
     *
     * param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({currentQuery, index}): GAEvent {

        return {
            category: GACategory.BULK_DOWNLOAD,
            action: GAAction.COPY_TO_CLIPBOARD,
            label: currentQuery,
            dimensions: {
                [GADimension.ENTITY_TYPE]: GAEntityType.BULK_DOWNLOAD_LINK,
                [GADimension.ENTITY_URL]: this.manifestUrl,
                [GADimension.INDEX]: index,
                [GADimension.TOOL_NAME]: this.shell
            }
        };
    }
}

