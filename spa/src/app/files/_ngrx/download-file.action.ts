/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file is downloaded from files data table.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "./analytics/tracking.action";
import { GAEvent } from "../../shared/analytics/ga-event.model";
import { GACategory } from "../../shared/analytics/ga-category.model";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { GADimension } from "../../shared/analytics/ga-dimension.model";

export class DownloadFileAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "FILE.DOWNLOAD";
    public readonly type = DownloadFileAction.ACTION_TYPE;

    /**
     * @param {string} fileUrl
     * @param {string} fileName
     * @param {string} fileFormat
     */
    constructor(public fileUrl: string,
                public fileName: string,
                public fileFormat: string) {}

    /**
     * Return the download file action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({currentQuery}): GAEvent {

        return {
            category: GACategory.FILE,
            action: GAAction.DOWNLOAD,
            label: this.fileName,
            dimensions: {
                [GADimension.CURRENT_QUERY]: currentQuery,
                [GADimension.ENTITY_URL]: this.fileUrl,
                [GADimension.RELATED_ENTITY_TYPE]: this.fileFormat,
                [GADimension.RELATED_ENTITY_ID]: this.fileName
            }
        };
    }
}
