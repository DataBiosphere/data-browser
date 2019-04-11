/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State backing manifest download modal component.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";

export interface HCADownloadManifestModalState {

    selectedSearchTermNames: string[]; // here
    fileManifestFileSummary: FileSummary;
}
