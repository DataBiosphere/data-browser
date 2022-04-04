/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user copies Terra link to clipboard.
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

export class CopyToClipboardTerraUrlAction implements Action, TrackingAction {
    public static ACTION_TYPE = "FILE.COPY_TO_CLIPBOARD_TERRA_URL";
    public readonly type = CopyToClipboardTerraUrlAction.ACTION_TYPE;

    /**
     * @param exportToTerraUrl
     */
    constructor(private readonly exportToTerraUrl: string) {}

    /**
     * Return the copy Terra URL to clipboard action as a GA event.
     *
     * @param {{[key: string]: any}} dimensions
     * @returns {GAEvent}
     */
    public asEvent({ catalog, currentQuery }): GAEvent {
        return {
            category: GACategory.EXPORT,
            action: GAAction.COPY_TO_CLIPBOARD,
            label: currentQuery,
            dimensions: {
                [GADimension.CATALOG]: catalog,
                [GADimension.ENTITY_TYPE]: GAEntityType.COHORT_EXPORT_LINK,
                [GADimension.ENTITY_URL]: this.exportToTerraUrl,
                [GADimension.TOOL_NAME]: ToolName.TERRA,
            },
        };
    }
}
