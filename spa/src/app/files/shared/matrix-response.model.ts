/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of matrix response.
 */

// App dependencies
import { MatrixStatus } from "./matrix-status.model";

export interface MatrixResponse {

    eta: string;
    key: string;
    links: any[];
    message: string;
    requestId: string;
    status: MatrixStatus;
}
