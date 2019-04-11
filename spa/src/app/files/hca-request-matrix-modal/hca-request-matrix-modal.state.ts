/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State backing matrix request modal component.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";
import { SearchTerm } from "../search/search-term.model";

export interface HCARequestMatrixModalState {

    fileSummary: FileSummary;
    matrixFileFormats: string[];
    searchTerms: SearchTerm[];
}
