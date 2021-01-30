/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP file location response from Azul.
 */

export interface FileLocationAPIResponse {

    Location: string;
    "Retry-After": number;
    Status: number;
}
