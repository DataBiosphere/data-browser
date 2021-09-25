/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of file manifest-related state. Used for selected data and project data downloads (both bulk and 
 * export to Terra).
 */

// App dependencies
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FileSummary } from "../../file-summary/file-summary";
import { FileTypeSummary } from "../../file-summary/file-type-summary";

export interface FileManifest {
    manifestResponse: ManifestResponse;
    fileTypeSummaries: FileTypeSummary[];
    projectFileSummary: FileSummary;
}
