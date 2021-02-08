/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing files component.
 */

// App dependencies
import { Catalog } from "./catalog/catalog.model";
import { Facet } from "./facet/facet.model";
import { FileSummary } from "./file-summary/file-summary";
import { SearchTerm } from "./search/search-term.model";
import EntitySpec from "./shared/entity-spec";

export interface FilesComponentState {

    catalog: Catalog;
    catalogs: Catalog[];
    entities: EntitySpec[];
    facets: Facet[];
    fileSummary: FileSummary;
    searchTerms: SearchTerm[];
    selectedEntity: EntitySpec;
    selectedProjectIds: string[];
    selectedSearchTerms: SearchTerm[];
}
