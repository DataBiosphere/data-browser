/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of matrix download-related values.
 */

// App dependencies
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";
import { ProjectMatrixUrls } from "../../shared/project-matrix-urls.model";

export interface Matrix {
    fileFormats: string[];
    partialQueryMatch: boolean;
    matrixUrlRequestsBySpecies: Map<string, MatrixUrlRequest>;
    matrixUrlsByProjectId: Map<string, ProjectMatrixUrls>;
}
