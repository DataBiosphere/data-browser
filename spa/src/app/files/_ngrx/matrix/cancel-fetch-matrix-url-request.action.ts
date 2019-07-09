/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when matrix URL request is to be canceled (eg on close of modal).
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class CancelFetchMatrixUrlRequestAction implements Action {
    public static ACTION_TYPE = "FILE.CANCEL_FETCH_MATRIX_URL_REQUEST";
    public readonly type = CancelFetchMatrixUrlRequestAction.ACTION_TYPE;
    constructor() {}
}
