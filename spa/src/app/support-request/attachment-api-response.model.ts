/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of response returned from Zendesk attachments API.
 */

// App dependencies
import { APIErrorResponse } from "./api-error-response.model";

export interface AttachmentAPIResponse extends APIErrorResponse {
    upload: any;
    attachment: any;
}
