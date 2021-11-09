/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related values in state.
 */

// App dependencies
import { ArchivePreview } from "../../project-matrix/archive-preview.model";
import { FileLocation } from "../../file-location/file-location.model";

export interface Project {
    matrixArchivePreviewsByProjectId: Map<string, Map<string, ArchivePreview>>;
    matrixFileLocationsByProjectId: Map<string, Map<string, FileLocation>>;
    manifestFileLocationsByProjectId: Map<string, FileLocation>
}
