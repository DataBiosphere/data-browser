/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when file summary to populate file type form during selected data or project downloads, has been
 * requested from endpoint API. The file type summaries are pulled from the file summary response.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchFileManifestFileTypeSummariesRequestAction implements Action {
    public static ACTION_TYPE =
        "FILE_MANIFEST.FETCH_FILE_TYPE_SUMMARIES_REQUEST";
    public readonly type =
        FetchFileManifestFileTypeSummariesRequestAction.ACTION_TYPE;

    /**
     * @param {boolean} projectDownload - True if request is for project-specific downloads. This can be removed once
     * selected search terms for get data downloads is moved to use the download-specific selected search terms and
     * not the app-wide selected search terms.
     */
    constructor(public readonly projectDownload?: boolean) {}
}
