/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when a successful response is received when requesting the matrix URL. Note this does not
 * necessarily indicate that the matrix URL request is complete, rather that a successful response was received (eg in
 * progress).
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";

export class FetchMatrixUrlSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_MATRIX_URL_SUCCESS";
    public readonly type = FetchMatrixUrlSuccessAction.ACTION_TYPE;
    constructor(public readonly response: MatrixUrlRequest) {}
}
