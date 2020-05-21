/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when error response is returned from the server.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ErrorResponseAction implements Action {
    public static ACTION_TYPE = "HTTP.ERROR_RESPONSE";
    public readonly type = ErrorResponseAction.ACTION_TYPE;
    constructor(public readonly requestUrl, public readonly statusCode, public readonly errorMessage?: string) {}
}
