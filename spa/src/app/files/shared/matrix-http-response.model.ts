/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of raw HTTP matrix response, before it is parsed into FE-friendly format (ie MatrixResponse).
 */

export interface MatrixHttpResponse {

    eta: string;
    matrix_location: string;
    message: string;
    request_id: string;
    status: string;
}
