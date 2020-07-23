/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested project TSV URL.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectTSVUrlRequestAction implements Action {
    public static ACTION_TYPE = "PROJECT.FETCH_PROJECT_TSV_URL_REQUEST";
    public readonly type = FetchProjectTSVUrlRequestAction.ACTION_TYPE;
    constructor(public projectId: string, public projectName: string) {}
}
