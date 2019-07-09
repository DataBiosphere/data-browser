/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when request is sent to fetch the matrix file formats.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchMatrixFileFormatsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.MATRIX_FILE_FORMATS_FETCH_REQUEST";
    public readonly type = FetchMatrixFileFormatsRequestAction.ACTION_TYPE;
    constructor() {}
}

