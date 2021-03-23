/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get data component.
 */

// App dependencies
import { Facet } from "../facet/facet.model";
import { FileSummary } from "../file-summary/file-summary";
import { SearchTerm } from "../search/search-term.model";
import EntitySpec from "../shared/entity-spec";

export interface GetDataComponentState {

    filesFacets?: Facet[]; // Facets returned from the files endpoint, used to populate data summary
    fileSummary?: FileSummary;
    loaded: boolean; // True if file facets have been fetched from endpoint and added to store
    selectedEntity?: EntitySpec;
    selectedSearchTerms?: SearchTerm[];
}
