/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of the set of files associated with an archive project matrix as well as their loading state.
 */

// App dependencies
import { ArchiveFile } from "./archive-file.model";

export interface ArchivePreview {
    archiveFiles?: ArchiveFile[];
    loading: boolean;
}
