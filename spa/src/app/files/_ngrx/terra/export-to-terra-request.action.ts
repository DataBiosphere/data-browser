/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when export to Terra has been requested by user.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { ToolName } from "../../shared/tool-name.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class ExportToTerraRequestAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "FILE.EXPORT_TO_TERRA_REQUEST";
    public readonly type = ExportToTerraRequestAction.ACTION_TYPE;

    /**
     * Return the export to Terra action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.EXPORT,
            action: GAAction.REQUEST,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_EXPORT,
                [GADimension.TOOL_NAME]: ToolName.TERRA
            }
        };
    }
}
