/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project bulk download is requested.
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

export class RequestProjectBulkDownloadAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.REQUEST_PROJECT_BULK_DOWNLOAD";
    public readonly type = RequestProjectBulkDownloadAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} shell
     */
    constructor(private project: Project,
                private selectedSearchTerms: SearchTerm[],
                private shell: BulkDownloadExecutionEnvironment) {}

    /**
     * Return the request bulk download action as a GA event.
     *
     * param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog}): GAEvent {
        
        const terms = this.selectedSearchTerms.map(searchTerm => searchTerm.getSearchValue()).join(", ");

        return {
            category: GACategory.PROJECT,
            action: GAAction.REQUEST_PROJECT_CURL,
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

