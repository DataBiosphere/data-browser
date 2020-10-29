/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 * 
 * Support request reducer, handles actions related to handling support request-related state.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { SupportRequestState } from "./support-request.state";

// App dependencies
import { AttachmentDropRejectAction } from "./attachment-drop-reject.action";
import { CreateSupportRequestRequestAction } from "./create-support-request-request.action";
import { CreateSupportRequestSuccessAction } from "./create-support-request-success.action";
import { CreateSupportRequestErrorAction } from "./create-support-request-error.action";
import { DeleteAttachmentAction } from "./delete-attachment.action";
import { ResetSupportRequestAction } from "./reset-support-request.action";
import { UpdateSupportRequestActiveAction } from "./update-support-request-active.action";
import { UploadAttachmentRequestAction } from "./upload-attachment-request.action";
import { UploadAttachmentErrorAction } from "./upload-attachment-error.action";
import { UploadAttachmentSuccessAction } from "./upload-attachment-success.action";

/**
 * @param {SupportRequestState} state
 * @param {Action} action
 * @returns {SupportRequestState}
 */
export function reducer(state: SupportRequestState = SupportRequestState.getDefaultState(), action: Action): SupportRequestState {

    switch (action.type) {
        
        // Attachment rejected on drop of file
        case AttachmentDropRejectAction.ACTION_TYPE:
            return state.onAttachmentDropRejected(action as AttachmentDropRejectAction);

        // Support request form has been submitted
        case CreateSupportRequestRequestAction.ACTION_TYPE:
            return state.onCreateSupportRequestRequest(action as CreateSupportRequestRequestAction);
            
        // Support request has been successfully created
        case CreateSupportRequestSuccessAction.ACTION_TYPE:
            return state.onCreateSupportRequestSuccess(action as CreateSupportRequestSuccessAction);

        // An error occurred during on submit of support request form
        case CreateSupportRequestErrorAction.ACTION_TYPE:
            return state.onCreateSupportRequestError(action as CreateSupportRequestErrorAction);

        // Attachment rejected on drop of file
        case DeleteAttachmentAction.ACTION_TYPE:
            return state.onAttachmentDeleted(action as DeleteAttachmentAction);
            
        // Handle reset of support request form
        case ResetSupportRequestAction.ACTION_TYPE:
            return SupportRequestState.getDefaultState();

        // Handle change in active state of support request.
        case UpdateSupportRequestActiveAction.ACTION_TYPE:
            return state.setActive(action as UpdateSupportRequestActiveAction);
            
        // Handle error during upload of attachment
        case UploadAttachmentErrorAction.ACTION_TYPE:
            return state.onUploadAttachmentError(action as UploadAttachmentErrorAction);

        // Handle request to upload of attachment
        case UploadAttachmentRequestAction.ACTION_TYPE:
            return state.onUploadAttachmentRequest(action as UploadAttachmentRequestAction);

        // Handle successful upload of attachment
        case UploadAttachmentSuccessAction.ACTION_TYPE:
            return state.onUploadAttachmentSuccess(action as UploadAttachmentSuccessAction);

        default:
            return state;
    }
}
