/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of state backing support request functionality.
 */

// App dependencies
import { DropError } from "../../dropzone/drop-error.model";
import { GASource } from "../../shared/analytics/ga-source.model";

export interface SupportRequest {
    active: boolean;
    attachmentRejected: boolean;
    attachmentRejection?: DropError;
    attachmentToken?: string;
    attachmentName?: string;
    attachmentUploading: boolean;
    attachmentUploadError: boolean;
    source?: GASource;
    submitError: boolean;
    submitErrorMessage: string;
    submitting: boolean;
    submitted: boolean;
}
