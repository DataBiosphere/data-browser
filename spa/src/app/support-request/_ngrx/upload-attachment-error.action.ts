/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when upload of an attachment to a support request is not successful. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class UploadAttachmentErrorAction implements Action {
    
    public static ACTION_TYPE = "SUPPORT_REQUEST.UPLOAD_ATTACHMENT_ERROR";
    public readonly type = UploadAttachmentErrorAction.ACTION_TYPE;
    
    constructor(public readonly errorMessage: string) {}
}
