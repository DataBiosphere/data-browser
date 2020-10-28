/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of state backing support request functionality.
 */
import { DropError } from "../../dropzone/drop-error.model";

export interface SupportRequest {

    active: boolean;
    attachmentRejected: boolean;
    attachmentRejection?: DropError;
    attachmentToken?: string;
    attachmentName?: string;
    attachmentUploading: boolean;
    attachmentUploadError: boolean;
    submitError: boolean;
    submitErrorMessage: string;
    submitting: boolean;
    submitted: boolean;
}
