/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered during get data flow, to clear the fetched facet set from the files endpoint.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class ClearFilesFacetsAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.CLEAR_FILES_FACETS";
    public readonly type = ClearFilesFacetsAction.ACTION_TYPE;
    constructor() {}
}
