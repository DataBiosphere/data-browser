import { DropError } from "../../dropzone/drop-error.model";

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing support request form functionality.
 */

export class SupportRequestFormState {

    attachmentRejected: boolean;
    attachmentRejection?: DropError;
    attachmentName?: string;
    attachmentToken?: string;
    attachmentUploading: boolean;
    attachmentUploadError: boolean;
    submitError: boolean;
    submitting: boolean;
    submitted: boolean;
}
