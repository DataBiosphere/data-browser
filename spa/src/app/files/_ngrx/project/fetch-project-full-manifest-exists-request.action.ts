/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when existence of file is to be checked.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectFullManifestExistsRequestAction implements Action {
    public static ACTION_TYPE =
        "PROJECT.FETCH_PROJECT_FULL_MANIFEST_EXISTS_REQUEST";
    public readonly type =
        FetchProjectFullManifestExistsRequestAction.ACTION_TYPE;
}
