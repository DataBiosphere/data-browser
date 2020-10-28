/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user drops/selects a file as an attachment to a support request. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class UploadAttachmentRequestAction implements Action {
    
    public static ACTION_TYPE = "SUPPORT_REQUEST.UPLOAD_ATTACHMENT_REQUEST";
    public readonly type = UploadAttachmentRequestAction.ACTION_TYPE;
    
    constructor(public readonly file: File) {}
}
