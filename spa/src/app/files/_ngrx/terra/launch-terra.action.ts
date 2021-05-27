/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user clicks on launch Terra link.
 */

// App dependencies
import { Action } from "@ngrx/store";

// Core dependencies
import { TrackingAction } from "../analytics/tracking.action";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { GAEntityType } from "../../../shared/analytics/ga-entity-type.model";
import { ToolName } from "../../shared/tool-name.model";
import { GAEvent } from "../../../shared/analytics/ga-event.model";

export class LaunchTerraAction implements Action, TrackingAction {
    
    public static ACTION_TYPE = "FILE.LAUNCH_TERRA";
    public readonly type = LaunchTerraAction.ACTION_TYPE;

    /**
     * @param exportToTerraUrl
     */
    constructor(private readonly  exportToTerraUrl: string) {}

    /**
     * Return the launch Terra action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({catalog, currentQuery}): GAEvent {

        return {
            category: GACategory.EXPORT,
            action: GAAction.LAUNCH,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_EXPORT_LINK,
                [GADimension.ENTITY_URL]: this.exportToTerraUrl,
                [GADimension.TOOL_NAME]: ToolName.TERRA
            }
        };
    }
}
