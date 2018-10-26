/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State backing manifest download modal component.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";
import { FileFacet } from "../shared/file-facet.model";

export interface HCADownloadManifestModalState {

    fileFacets: FileFacet[];
    fileSummary: FileSummary;
    unfacetedFileSummary: FileSummary;
}
