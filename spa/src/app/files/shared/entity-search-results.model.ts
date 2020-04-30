/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of data returned from entity end points, including:
 * - data that populates rows in table, depending on the current selected tab (eg projects, samples, files)
 * - the current set of selected fileFacets, as well as facet terms and their corresponding counts
 * - mapping of project short name to project ID (which as currently embedded in ther termFacet response values).
 */

// App dependencies
import { SearchTerm } from "../search/search-term.model";
import { TableModel } from "../table/table.model";
import { Facet } from "../facet/facet.model";

export interface EntitySearchResults {
    facets: Facet[];
    searchTerms: SearchTerm[];
    tableModel: TableModel;
}
