/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of matrix download-related values.
 */

// App dependencies
import { MatrixResponse } from "../../shared/matrix-response.model";
import { ProjectMatrixUrls } from "../../shared/project-matrix-urls.model";

export interface Matrix {
    fileFormats: string[];
    partialQueryMatch: boolean;
    matrixResponse: MatrixResponse;
    matrixUrlsByProjectId: Map<string, ProjectMatrixUrls>
}
