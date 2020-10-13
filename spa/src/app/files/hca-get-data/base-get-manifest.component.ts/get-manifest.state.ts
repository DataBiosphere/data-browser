/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing get manifest component.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { ManifestResponse } from "../../shared/manifest-response.model";
import { SearchTerm } from "../../search/search-term.model";

export interface GetManifestState {

    selectedSearchTermNames: string[];
    selectedSearchTerms: SearchTerm[];
    fileManifestFileSummary: FileSummary;
    manifestResponse: ManifestResponse;
}
