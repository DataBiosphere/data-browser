/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user copies project Terra link to clipboard.
 *
 * TODO
 * Move download-related tracking actions and effects to file-manifest.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { ToolName } from "../../shared/tool-name.model";
import { Project } from "../../shared/project.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class CopyToClipboardProjectTerraUrlAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "PROJECT.COPY_TO_CLIPBOARD_PROJECT_TERRA_URL";
    public readonly type = CopyToClipboardProjectTerraUrlAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {string} exportToTerraUrl
     */
    constructor(private project: Project, private exportToTerraUrl: string) {}

    /**
     * Return the copy Terra URL to clipboard action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, terms}): GAEvent {

        return {
            category: GACategory.PROJECT,
            action: GAAction.COPY_PROJECT_TERRA_URL,
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
