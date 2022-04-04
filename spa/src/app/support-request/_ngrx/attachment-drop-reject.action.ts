/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when attachment is rejected on drop of file on form (and before upload of file).
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { DropError } from "../../dropzone/drop-error.model";

export class AttachmentDropRejectAction implements Action {
    public static ACTION_TYPE = "SUPPORT_REQUEST.ATTACHMENT_DROP_REJECT";
    public readonly type = AttachmentDropRejectAction.ACTION_TYPE;

    constructor(public readonly error: DropError) {}
}
