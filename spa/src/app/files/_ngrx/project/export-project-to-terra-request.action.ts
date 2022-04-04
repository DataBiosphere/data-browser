/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra has been requested by user.
 *
 * TODO
 * Move download-related tracking actions and effects to file-manifest.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { Project } from "../../shared/project.model";
import { ToolName } from "../../shared/tool-name.model";

export class ExportProjectToTerraRequestAction
    implements Action, TrackingAction
{
    public static ACTION_TYPE = "PROJECT.PROJECT_EXPORT_TO_TERRA_REQUEST";
    public readonly type = ExportProjectToTerraRequestAction.ACTION_TYPE;

    /**
     * @param {Project} project
     * @param {ManifestDownloadFormat} manifestDownloadFormat
     */
    constructor(
        public readonly project: Project,
        public readonly manifestDownloadFormat: ManifestDownloadFormat
    ) {}

    /**
     * Return the export to Terra action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, terms }): GAEvent {
        return {
            category: GACategory.PROJECT,
            action: GAAction.REQUEST_PROJECT_TERRA_URL,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.TERM]: terms,
                [GADimension.TOOL_NAME]: ToolName.TERRA,
            },
        };
    }
}
