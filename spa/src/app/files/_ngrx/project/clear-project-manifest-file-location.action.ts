/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project manifest file location is to be cleared from the store.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearProjectManifestFileLocationAction implements Action {
    
    public static ACTION_TYPE = "PROJECT.CLEAR_PROJECT_MANIFEST_FILE_LOCATION";
    public readonly type = ClearProjectManifestFileLocationAction.ACTION_TYPE;
    
    constructor(public projectId: string) {}
}
