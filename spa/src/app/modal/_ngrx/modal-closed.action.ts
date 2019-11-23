/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when modal is closed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ModalClosedAction implements Action {
    public static ACTION_TYPE = "MODAL.CLOSED";
    public readonly type = ModalClosedAction.ACTION_TYPE;
    constructor() {}
}
