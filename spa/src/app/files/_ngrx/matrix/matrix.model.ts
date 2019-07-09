/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of matrix download-related values.
 */

// App dependencies
import { MatrixResponse } from "../../shared/matrix-response.model";

export interface Matrix {
    fileFormats: string[];
    matrixResponse: MatrixResponse;
}
