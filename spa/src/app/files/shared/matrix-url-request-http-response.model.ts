/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of raw HTTP matrix response, before it is parsed into FE-friendly format (ie MatrixUrlRequest).
 */

export interface MatrixUrlRequestHttpResponse {

    eta: string;
    matrix_location: string;
    message: string;
    non_human_request_ids?: {[key: string]: string};  // Optional - not all matrix requests contain non-human data
    request_id: string;
    status: string;
}
