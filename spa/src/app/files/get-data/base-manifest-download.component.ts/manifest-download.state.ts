/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing manifest download component.
 */

// App dependencies
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileTypeSummary } from "../../file-summary/file-type-summary.model";
import { SearchTerm } from "../../search/search-term.model";

export interface ManifestDownloadState {

    selectedSearchTermNames: string[];
    selectedSearchTerms: SearchTerm[];
    fileTypeSummaries: FileTypeSummary[];
    manifestResponse: ManifestResponse;
}
