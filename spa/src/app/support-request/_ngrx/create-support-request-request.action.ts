/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when user submits support request form.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SupportRequestPost } from "../support-request-post.model";

export class CreateSupportRequestRequestAction implements Action {
    public static ACTION_TYPE =
        "SUPPORT_REQUEST.CREATE_SUPPORT_REQUEST_REQUEST";
    public readonly type = CreateSupportRequestRequestAction.ACTION_TYPE;

    constructor(public readonly supportRequest: SupportRequestPost) {}
}
