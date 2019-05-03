/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of file manifest-related state.
 */

// App dependencies
import { FileSummary } from "../../file-summary/file-summary";
import { ManifestResponse } from "../../shared/manifest-response.model";

export interface FileManifest {
    manifestResponse: ManifestResponse;
    fileSummary: FileSummary;
}
