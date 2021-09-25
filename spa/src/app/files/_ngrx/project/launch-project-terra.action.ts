/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user clicks on launch project's Terra link.
 */

// App dependencies
import { Action } from "@ngrx/store";

// Core dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { SearchTerm } from "../../search/search-term.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { Project } from "../../shared/project.model";
import { ToolName } from "../../shared/tool-name.model";

export class LaunchProjectTerraAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "FILE.LAUNCH_PROJECT_TERRA";
    public readonly type = LaunchProjectTerraAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} exportToTerraUrl
     */
    constructor(private project: Project,
                private selectedSearchTerms: SearchTerm[],
                private exportToTerraUrl: string) {}

    /**
     * Return the launch Terra action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog}): GAEvent {

        const terms = this.selectedSearchTerms.map(searchTerm => searchTerm.getSearchValue()).join(", ");

        return {
            category: GACategory.PROJECT,
            action: GAAction.LAUNCH_PROJECT_TERRA,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.RELATED_ENTITY_URL]: this.exportToTerraUrl,
                [GADimension.TERM]: terms,
                [GADimension.TOOL_NAME]: ToolName.TERRA
            }
        };
    }
}
