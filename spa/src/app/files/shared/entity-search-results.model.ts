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
import { TableModel } from "../table/table.model";
import { FileFacet } from "./file-facet.model";

export interface EntitySearchResults {
    fileFacets: FileFacet[];
    tableModel: TableModel;
}
