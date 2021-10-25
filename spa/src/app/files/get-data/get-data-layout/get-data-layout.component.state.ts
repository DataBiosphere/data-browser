/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get data layout component.
 */

// App dependencies
import { Facet } from "../../facet/facet.model";
import { FileSummary } from "../../file-summary/file-summary.model";
import { SearchTerm } from "../../search/search-term.model";

export interface GetDataLayoutComponentState {

    filesFacets?: Facet[]
    fileSummary?: FileSummary;
    loaded: boolean;
    selectedSearchTerms?: SearchTerm[];
}
