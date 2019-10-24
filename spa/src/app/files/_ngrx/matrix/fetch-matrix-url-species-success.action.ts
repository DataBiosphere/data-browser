/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when a successful response is received when requesting the matrix URL and we need to set up
 * the state for each species contained in the response.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { MatrixUrlRequestSpecies } from "../../shared/matrix-url-request-species.model";

export class FetchMatrixUrlSpeciesSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_MATRIX_URL_SPECIES_SUCCESS";
    public readonly type = FetchMatrixUrlSpeciesSuccessAction.ACTION_TYPE;
    constructor(public readonly response: MatrixUrlRequestSpecies) {}
}
