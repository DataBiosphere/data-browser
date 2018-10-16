/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State backing matrix request modal component.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";
import { FileFacet } from "../shared/file-facet.model";
import { MatrixResponse } from "../shared/matrix-response.model";

export interface HCARequestMatrixModalState {

    fileSummary: FileSummary;
    selectedFileFacets: FileFacet[];
}
