import { Facet } from "./facet/facet.model";
import { SearchTerm } from "./search/search-term.model";
import EntitySpec from "./shared/entity-spec";
import { FileSummary } from "./file-summary/file-summary";

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing files component.
 */

export interface FilesComponentState {

    entities: EntitySpec[];
    facets: Facet[];
    fileSummary: FileSummary;
    searchTerms: SearchTerm[];
    selectedEntity: EntitySpec;
    selectedProjectIds: string[];
    selectedSearchTerms: SearchTerm[];
    selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>;
}
