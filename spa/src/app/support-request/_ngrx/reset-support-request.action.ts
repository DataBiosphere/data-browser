/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user closes support request form, or support request form closes after successful submit.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ResetSupportRequestAction implements Action {
    public static ACTION_TYPE = "SUPPORT_REQUEST.RESET_REQUEST";
    public readonly type = ResetSupportRequestAction.ACTION_TYPE;

    constructor() {}
}
