/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State backing manifest download modal component.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";
import { SearchTerm } from "../search/search-term.model";

export interface HCADownloadManifestModalState {

    selectedSearchTermNames: string[];
    selectedSearchTerms: SearchTerm[];
    fileManifestFileSummary: FileSummary;
}
