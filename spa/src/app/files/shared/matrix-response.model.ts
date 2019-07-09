/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of matrix response.
 */

// App dependencies
import { MatrixStatus } from "./matrix-status.model";

export interface MatrixResponse {

    eta: string;
    matrixUrl: string;
    message: string;
    requestId: string;
    status: MatrixStatus;
}
