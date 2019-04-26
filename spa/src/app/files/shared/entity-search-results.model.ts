/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of data returned from entity end points, including:
 * - data that populates rows in table, depending on the current selected tab (eg projects, specimens, files)
 * - the current set of selected facets, as well as facet terms and their corresponding counts
 * - mapping of project short name to project ID (which as currently embedded in ther termFacet response values).
 */

// App dependencies
import { SearchTerm } from "../search/search-term.model";
import { FileFacet } from "./file-facet.model";
import { TableModel } from "../table/table.model";

export interface EntitySearchResults {
    fileFacets: FileFacet[];
    searchTerms: SearchTerm[];
    tableModel: TableModel;
}
