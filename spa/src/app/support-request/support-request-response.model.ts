/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of parsed response returned from Zendesk create support request API. If response returns an error, mark as such.
 */

export interface SupportRequestResponse {

    id?: number;
    error?: boolean;
    errorMessage?: string;
}
