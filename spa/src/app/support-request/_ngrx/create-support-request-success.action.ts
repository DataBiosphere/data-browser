/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user has submitted a support request and a success response has been received from the endpoint.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SupportRequestResponse } from "../support-request-response.model";

export class CreateSupportRequestSuccessAction implements Action {
    public static ACTION_TYPE =
        "SUPPORT_REQUEST.CREATE_SUPPORT_REQUEST_SUCCESS";
    public readonly type = CreateSupportRequestSuccessAction.ACTION_TYPE;

    constructor(public readonly response: SupportRequestResponse) {}
}
