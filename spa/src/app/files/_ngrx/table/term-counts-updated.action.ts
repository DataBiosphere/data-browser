/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when entity search results have been updated but table data does not need to be refreshed
 * (for example, when a project is selected on the projects tab). In this case, we still need to update the term counts
 * on the table header.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class TermCountsUpdatedAction implements Action {
    public static ACTION_TYPE = "TABLE.TERM_COUNTS_UPDATED";
    public readonly type = TermCountsUpdatedAction.ACTION_TYPE;
    constructor(public readonly termCountsByFacetName: Map<string, number>) {}
}
