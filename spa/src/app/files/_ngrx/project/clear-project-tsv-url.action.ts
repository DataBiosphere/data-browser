/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when project TSV URL is to be cleared.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearProjectTSVUrlAction implements Action {
    public static ACTION_TYPE = "PROJECT.CLEAR_PROJECT_TSV_URL";
    public readonly type = ClearProjectTSVUrlAction.ACTION_TYPE;
    constructor(public projectId: string) {}
}
