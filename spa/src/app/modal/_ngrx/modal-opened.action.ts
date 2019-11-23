/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when modal is opened.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ModalOpenedAction implements Action {
    public static ACTION_TYPE = "MODAL.OPENED";
    public readonly type = ModalOpenedAction.ACTION_TYPE;
    constructor() {}
}
