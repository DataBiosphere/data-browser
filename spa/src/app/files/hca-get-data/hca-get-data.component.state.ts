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

export interface HCAGetDataComponentState {

    filesFacets: Facet[]; // Facets returned from the files endpoint
    selectedEntity: EntitySpec;
    selectedSearchTerms: SearchTerm[];
}
