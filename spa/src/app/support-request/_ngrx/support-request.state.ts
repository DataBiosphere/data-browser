/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing support request functionality.
 */

// App dependencies
import { AttachmentDropRejectAction } from "./attachment-drop-reject.action";
import { CreateSupportRequestErrorAction } from "./create-support-request-error.action";
import { CreateSupportRequestRequestAction } from "./create-support-request-request.action";
import { CreateSupportRequestSuccessAction } from "./create-support-request-success.action";
import { SupportRequest } from "./support-request.model";
import { UpdateSupportRequestActiveAction } from "./update-support-request-active.action";
import { UploadAttachmentRequestAction } from "./upload-attachment-request.action";
import { UploadAttachmentSuccessAction } from "./upload-attachment-success.action";
import { UploadAttachmentErrorAction } from "./upload-attachment-error.action";
import { DeleteAttachmentAction } from "./delete-attachment.action";

export class SupportRequestState {

    /**
     * @param {SupportRequest} supportRequest
     */
    constructor(public readonly supportRequest: SupportRequest) {}

    /**
     * Create default support request state.
     *
     * @returns {SupportRequestState}
     */
    public static getDefaultState(): SupportRequestState {

        return new SupportRequestState({
            active: false,
            attachmentRejected: false,
            attachmentUploading: false,
            attachmentUploadError: false,
            submitError: false,
            submitErrorMessage: "",
            submitting: false,
            submitted: false
        });
    }

    /**
     * Handle delete of attachment on drop of file.
     *
     * @param {DeleteAttachmentAction} action
     */
    public onAttachmentDeleted(action: DeleteAttachmentAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            attachmentName: "",
            attachmentToken: ""
        });
    }

    /**
     * Handle rejection of attachment on drop of file.
     *
     * @param {UploadAttachmentSuccessAction} action
     */
    public onAttachmentDropRejected(action: AttachmentDropRejectAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            attachmentRejected: true,
            attachmentRejection: action.error,
        });
    }

    /**
     * Handle submit of support request form.
     * 
     * @param {CreateSupportRequestRequestAction} action
     */
    public onCreateSupportRequestRequest(action: CreateSupportRequestRequestAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            submitError: false,
            submitErrorMessage: "",
            submitting: true,
            submitted: false
        });
    }

    /**
     * Handle unsuccessful submit of support request form.
     *
     * @param {CreateSupportRequestErrorAction} action
     */
    public onCreateSupportRequestError(action: CreateSupportRequestErrorAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            submitError: true,
            submitErrorMessage: action.errorMessage,
            submitting: false,
            submitted: false
        });
    }

    /**
     * Handle successful submit of support request form.
     *
     * @param {CreateSupportRequestSuccessAction} action
     */
    public onCreateSupportRequestSuccess(action: CreateSupportRequestSuccessAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            submitError: false,
            submitErrorMessage: "",
            submitting: false,
            submitted: true
        });
    }

    /**
     * Handle unsuccessful upload of attachment to support request form.
     *
     * @param {UploadAttachmentErrorAction} action
     */
    public onUploadAttachmentError(action: UploadAttachmentErrorAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            attachmentUploadError: true,
            attachmentUploading: false
        });
    }

    /**
     * Handle upload of attachment to support request form.
     *
     * @param {UploadAttachmentRequestAction} action
     */
    public onUploadAttachmentRequest(action: UploadAttachmentRequestAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            attachmentUploadError: false,
            attachmentUploading: true,
            attachmentRejected: false
        });
    }

    /**
     * Handle successful upload of attachment to support request form.
     *
     * @param {UploadAttachmentSuccessAction} action
     */
    public onUploadAttachmentSuccess(action: UploadAttachmentSuccessAction): SupportRequestState {

        return new SupportRequestState({
            ...this.supportRequest,
            attachmentRejected: false,
            attachmentRejection: null,
            attachmentName: action.response.attachmentName,
            attachmentToken: action.response.token,
            attachmentUploading: false
        });
    }

    /**
     * Update active state of support request.
     *
     * @param {UpdateSupportRequestActiveAction} action
     * @returns {SupportRequestState}
     */
    public setActive(action: UpdateSupportRequestActiveAction): SupportRequestState {

        const updatedSupportRequest = {
            ...this.supportRequest,
            active: action.active
        };
        
        if ( action.active ) {
            updatedSupportRequest.source = action.source;
        }
        else {
            delete updatedSupportRequest.source;
        }

        return new SupportRequestState(updatedSupportRequest);
    }
}
