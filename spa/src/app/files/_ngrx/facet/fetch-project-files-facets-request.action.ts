/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered during project downloads flow, to fetch facet set from the files endpoint specific to
 * the selected project. Used to populate facet data in the data summary section on the project download pages.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectFilesFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FACET.FETCH_PROJECT_FILES_FACETS_REQUEST";
    public readonly type = FetchProjectFilesFacetsRequestAction.ACTION_TYPE;
}
