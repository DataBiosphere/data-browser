/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested matrix URL.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { MatrixFormat } from "../../shared/matrix-format.model";
import { Subject } from "rxjs/index";

export class FetchMatrixUrlRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_MATRIX_URL_REQUEST";
    public readonly type = FetchMatrixUrlRequestAction.ACTION_TYPE;
    constructor(public readonly fileFormat: MatrixFormat, public readonly killSwitch$: Subject<boolean>) {}
}
