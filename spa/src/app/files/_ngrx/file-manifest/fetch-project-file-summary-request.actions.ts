/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when project-specific file summary is requested for populating ride side stats on project file
 * downloads.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { SearchTerm } from "../../search/search-term.model";

export class FetchProjectFileSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.PROJECT_FILE_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchProjectFileSummaryRequestAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     * @param {SearchTerm[]} selectedSearchTerms
     */
    constructor(public readonly projectId: string, public readonly selectedSearchTerms: SearchTerm[]) {}
}
