/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when attachment is deleted from support request form.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class DeleteAttachmentAction implements Action {
    public static ACTION_TYPE = "SUPPORT_REQUEST.DELETE_ATTACHMENT";
    public readonly type = DeleteAttachmentAction.ACTION_TYPE;

    constructor() {}
}
