/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of file manifest-related state. Used for selected data and project data downloads (both bulk and 
 * export to Terra).
 */

// App dependencies
import { Facet } from "../../facet/facet.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileSummary } from "../../file-summary/file-summary";
import { FileTypeSummary } from "../../file-summary/file-type-summary";
import { SearchTerm } from "../../search/search-term.model";

export interface FileManifest {
    filesFacets: Facet[];
    fileTypeSummaries: FileTypeSummary[];
    manifestResponse: ManifestResponse;
    projectFileSummary: FileSummary;
    projectSpeciesFacet: Facet;
    selectedProjectSearchTerms: SearchTerm[];
}
