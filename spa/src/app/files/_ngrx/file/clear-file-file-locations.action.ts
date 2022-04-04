/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file file locations are to be cleared from store, usually on navigation away from files table.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearFileFileLocationsAction implements Action {
    public static ACTION_TYPE = "FILE.CLEAR_FILE_FILE_LOCATIONS";
    public readonly type = ClearFileFileLocationsAction.ACTION_TYPE;
}
