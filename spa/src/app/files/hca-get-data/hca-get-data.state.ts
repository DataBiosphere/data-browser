/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get data component.
 */

// App dependencies
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { SearchTerm } from "../search/search-term.model";
import EntitySpec from "../shared/entity-spec";

export interface HCAGetDataState {

    fileFacets: FileFacet[];
    matrixSpeciesSelectionRequired: boolean;
    matrixSupported: boolean;
    matrixSupportedLoaded: boolean;
    selectedEntity: EntitySpec;
    selectedSearchTerms: SearchTerm[];
}
