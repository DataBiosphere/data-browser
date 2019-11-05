/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of Matrix URL request, as per the response values received from the Matrix service.
 */

// App dependencies
import { MatrixUrlRequestStatus } from "./matrix-url-request-status.model";

export interface MatrixUrlRequest {

    eta: string;
    matrixUrl: string;
    message: string;
    requestId: string;
    species: string; // Calculated value, not a direct translation from HTTP response
    status: MatrixUrlRequestStatus;
}
