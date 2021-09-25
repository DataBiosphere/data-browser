/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra has been requested by user.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { Facet } from "../../facet/facet.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { SearchTerm } from "../../search/search-term.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";
import { Project } from "../../shared/project.model";
import { ToolName } from "../../shared/tool-name.model";

export class ExportToTerraProjectRequestAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "FILE.EXPORT_TO_TERRA_PROJECT_REQUEST";
    public readonly type = ExportToTerraProjectRequestAction.ACTION_TYPE;


    /**
     * @param {Project} project
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {Facet} fileFormatFacet
     * @param {ManifestDownloadFormat} manifestDownloadFormat
     */
    constructor(public readonly project: Project,
                public readonly selectedSearchTerms: SearchTerm[],
                public readonly fileFormatFacet: Facet,
                public readonly manifestDownloadFormat: ManifestDownloadFormat) {}

    /**
     * Return the export to Terra action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog}): GAEvent {

        const terms = this.selectedSearchTerms.map(searchTerm => searchTerm.getSearchValue()).join(", ");

        return {
            category: GACategory.PROJECT,
            action: GAAction.REQUEST_PROJECT_TERRA_URL,
            label: this.project.projectTitle,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_ID]: this.project.entryId,
                [GADimension.TERM]: terms,
                [GADimension.TOOL_NAME]: ToolName.TERRA
            }
        };
    }
}
