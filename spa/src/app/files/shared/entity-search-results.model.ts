/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of data that populates rows in table, depending on the current selected tab (eg projects, specimens, files) and
 * the current set of selected facets, as well as facet terms and their corresponding counts.
 */

// App dependencies
import { TableModel } from "../table/table.model";
import { FileFacet } from "./file-facet.model";

export interface EntitySearchResults {
    fileFacets: FileFacet[];
    tableModel: TableModel;
}
