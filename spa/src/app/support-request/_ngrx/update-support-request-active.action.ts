/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when active state of support request is updated.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { GASource } from "../../shared/analytics/ga-source.model";

export class UpdateSupportRequestActiveAction implements Action {
    
    public static ACTION_TYPE = "SUPPORT_REQUEST.UPDATE_SUPPORT_REQUEST_ACTIVE";
    public readonly type = UpdateSupportRequestActiveAction.ACTION_TYPE;
    
    constructor(public readonly active: boolean, public readonly source: GASource) {}
}
