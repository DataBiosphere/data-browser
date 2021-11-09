/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of the response returned from requesting the set of files associated with a project matrix 
 */

// App dependencies
import { ArchiveFileResponse } from "./archive-file-response.model";

export interface ArchivePreviewResponse {
    files: ArchiveFileResponse[];
}
