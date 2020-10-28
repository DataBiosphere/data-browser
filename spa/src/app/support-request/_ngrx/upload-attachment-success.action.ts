/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user submits support request form. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { AttachmentResponse } from "../attachment-response.model";

export class UploadAttachmentSuccessAction implements Action {
    
    public static ACTION_TYPE = "SUPPORT_REQUEST.UPLOAD_ATTACHMENT_SUCCESS";
    public readonly type = UploadAttachmentSuccessAction.ACTION_TYPE;
    
    constructor(public readonly response: AttachmentResponse) {}
}
