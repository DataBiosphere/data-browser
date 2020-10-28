/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of parsed response returned from Zendesk attachments API. If response returns an error, mark as such.
 */

export interface AttachmentResponse {

    error?: boolean;
    errorMessage?: string;
    attachmentName?: string;
    token?: string;
}
