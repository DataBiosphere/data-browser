/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary to populate file type summaries on manifest modal is to be cleared (ie on close
 * of modal).
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearFileManifestFileTypeSummaries implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST.FETCH_FILE_TYPE_SUMMARIES_CLEAR";
    public readonly type = ClearFileManifestFileTypeSummaries.ACTION_TYPE;
    constructor() {}
}
