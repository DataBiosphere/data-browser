/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of set of selected facets that are specific to determining the matrix partial query status of the current
 * search terms.
 */

// App dependencies
import { FileFacet } from "../facet/file-facet/file-facet.model";

export interface MatrixableFileFacets {

    genusSpecies: FileFacet;
    libraryConstructionApproaches: FileFacet;
    pairedEnds: FileFacet;
}
