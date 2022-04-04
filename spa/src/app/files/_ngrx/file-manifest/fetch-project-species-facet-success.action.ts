/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when files endpoint returns with the values required to determine the species count in a project.
 * We can't use the species value of the project returned from Azul as CGM species are not currently rolled up to the
 * project level.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Facet } from "../../facet/facet.model";

export class FetchProjectSpeciesFacetSuccessAction implements Action {
    public static ACTION_TYPE = "FILE_MANIFEST.PROJECT_SPECIES_FACET_SUCCESS";
    public readonly type = FetchProjectSpeciesFacetSuccessAction.ACTION_TYPE;

    /**
     * @param {Facet} speciesFacet
     */
    constructor(public readonly speciesFacet: Facet) {}
}
