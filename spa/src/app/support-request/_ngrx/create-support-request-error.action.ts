/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when submit of support request form is not successful. 
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class CreateSupportRequestErrorAction implements Action {
    
    public static ACTION_TYPE = "SUPPORT_REQUEST.CREATE_SUPPORT_REQUEST_ERROR";
    public readonly type = CreateSupportRequestErrorAction.ACTION_TYPE;
    
    constructor(public readonly errorMessage: string) {}
}
