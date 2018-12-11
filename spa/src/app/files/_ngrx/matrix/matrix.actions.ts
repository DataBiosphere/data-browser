/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Matrix-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchMatrixFileFormatsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.MATRIX_FILE_FORMATS_FETCH_REQUEST";
    public readonly type = FetchMatrixFileFormatsRequestAction.ACTION_TYPE;
    constructor() {}
}

export class FetchMatrixFileFormatsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.MATRIX_FILE_FORMATS_FETCH_SUCCESS";
    public readonly type = FetchMatrixFileFormatsSuccessAction.ACTION_TYPE;
    constructor(public readonly fileFormats: string[]) {}
}

export type All
    = FetchMatrixFileFormatsRequestAction
    | FetchMatrixFileFormatsSuccessAction;
