/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing manifest download modal component.
 */

// App dependencies
import { FileSummary } from "../file-summary/file-summary";
import { SearchTerm } from "../search/search-term.model";
import { ManifestResponse } from "../shared/manifest-response.model";

export interface HCADownloadManifestModalState {

    selectedSearchTermNames: string[];
    selectedSearchTerms: SearchTerm[];
    fileManifestFileSummary: FileSummary;
    manifestResponse: ManifestResponse;
}
