/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of response returned from Zendesk API.
 */

// App dependencies
import { APIErrorResponse } from "./api-error-response.model";

export interface SupportRequestAPIResponse extends APIErrorResponse {

    id: number;
}
