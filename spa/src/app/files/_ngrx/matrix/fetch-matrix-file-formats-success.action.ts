/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when request to fetch matrix file formats has successfully completed.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchMatrixFileFormatsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.MATRIX_FILE_FORMATS_FETCH_SUCCESS";
    public readonly type = FetchMatrixFileFormatsSuccessAction.ACTION_TYPE;
    constructor(public readonly fileFormats: string[]) {}
}

