/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered for project downloads where species checkbox can be autoselected if project only has a single
 * species. We can't use the species value of the project returned from Azul as CGM species are not currently rolled
 * up to the project level.
 */

// Core dependencies
import { Action } from "@ngrx/store";

export class FetchProjectSpeciesFacetRequestAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.PROJECT_SPECIES_FACET_REQUEST";
    public readonly type = FetchProjectSpeciesFacetRequestAction.ACTION_TYPE;
}
