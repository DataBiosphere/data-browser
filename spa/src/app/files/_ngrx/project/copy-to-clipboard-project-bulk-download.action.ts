/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project bulk download curl command is copied.
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
import { Project } from "../../shared/project.model";
import { SearchTerm } from "../../search/search-term.model";

export class CopyToClipboardProjectBulkDownloadAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.COPY_TO_CLIPBOARD_PROJECT_BULK_DOWNLOAD";
    public readonly type = CopyToClipboardProjectBulkDownloadAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {SearchTerms[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} shell
     * @param {string} curl
     */
    constructor(private project: Project,
                private selectedSearchTerms: SearchTerm[],
                private shell: BulkDownloadExecutionEnvironment,
                private curl: string) {}

    /**
     * Return the request bulk download action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog}): GAEvent {

        const terms = this.selectedSearchTerms.map(searchTerm => searchTerm.getSearchValue()).join(", ");

        return {
            category: GACategory.PROJECT,
            action: GAAction.COPY_PROJECT_CURL,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.TERM]: terms,
                [GADimension.TOOL_NAME]: this.shell
            }
        };
    }
}

