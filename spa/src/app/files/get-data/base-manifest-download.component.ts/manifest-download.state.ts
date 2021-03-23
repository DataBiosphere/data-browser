/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing manifest download component.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { ManifestResponse } from "../../shared/manifest-response.model";
import { SearchTerm } from "../../search/search-term.model";

export interface ManifestDownloadState {

    selectedSearchTermNames: string[];
    selectedSearchTerms: SearchTerm[];
    fileManifestFileSummary: FileSummary;
    manifestResponse: ManifestResponse;
}
