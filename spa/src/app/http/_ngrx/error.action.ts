/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when client-side error occurs. 
 * 
 * TODO Update HTTP module to reflect handling of client-side errors (#1504) 
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ErrorAction implements Action {
    
    public static ACTION_TYPE = "HTTP.ERROR";
    public readonly type = ErrorAction.ACTION_TYPE;

    /**
     * @param {string} errorMessage
     */
    constructor(public readonly errorMessage: string) {}
}
