/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of the set of species included in a Matrix request, built from the response from the initial POST to the
 * Matrix Service.
 */

// App dependencies
import { MatrixUrlRequest } from "./matrix-url-request.model";

export interface MatrixUrlRequestSpecies {

    matrixUrlRequestsBySpecies: Map<string, MatrixUrlRequest>;
}
