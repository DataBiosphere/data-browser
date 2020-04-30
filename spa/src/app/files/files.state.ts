import { Facet } from "./facet/facet.model";
import { SearchTerm } from "./search/search-term.model";
import { Observable } from "rxjs/index";
import EntitySpec from "./shared/entity-spec";
import { FileSummary } from "./file-summary/file-summary";

/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing files component.
 */

export interface FilesState {

    entities: Observable<EntitySpec[]>;
    facets: Observable<Facet[]>;
    fileSummary: Observable<FileSummary>;
    searchTerms: Observable<SearchTerm[]>;
    selectedEntity: Observable<EntitySpec>;
    selectedProjectIds: Observable<string[]>;
    selectedSearchTerms: Observable<SearchTerm[]>;
}
