/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get data component.
 */

// App dependencies
import { Facet } from "../facet/facet.model";
import { SearchTerm } from "../search/search-term.model";
import EntitySpec from "../shared/entity-spec";

export interface HcaGetDataComponentState {

    disableFeature: boolean;
    filesFacets: Facet[]; // Facets returned from the files endpoint
    matrixSpeciesSelectionRequired: boolean;
    matrixSupported: boolean;
    matrixSupportedLoaded: boolean;
    selectedEntity: EntitySpec;
    selectedSearchTerms: SearchTerm[];
}
