/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when the "return to selected entity" back buttons are selected (eg from project detail or get data
 * flow).
 */

// App dependencies
import { GAAction } from "../../../shared/analytics/ga-action.model";
import { SelectEntityAction } from "./select-entity.action";

export class BackToEntityAction extends SelectEntityAction {
    public static ACTION_TYPE = "ENTITY.BACK";
    public readonly type = BackToEntityAction.ACTION_TYPE;

    /**
     * Return the tracking event action for this action.
     *
     * @returns {GAAction}
     */
    protected getTrackingAction(): GAAction {
        return GAAction.RETURN_TO_TAB;
    }
}
