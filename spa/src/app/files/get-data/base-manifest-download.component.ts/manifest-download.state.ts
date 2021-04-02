/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing manifest download component.
 */

// App dependencies
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileSummary } from "../../file-summary/file-summary";
import { SearchTerm } from "../../search/search-term.model";

export interface ManifestDownloadState {

    selectedSearchTermNames: string[];
    selectedSearchTerms: SearchTerm[];
    fileManifestFileSummary: FileSummary;
    manifestResponse: ManifestResponse;
}
