/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project expression matrices component.
 */

// App dependencies
import { FileLocation } from "../file-location/file-location.model";
import { ArchivePreview } from "../project-matrix/archive-preview.model";
import { Project } from "../shared/project.model";

export interface ProjectMatricesComponentState {

    loaded: boolean;
    project?: Project;
    projectMatrixArchivePreviewsByMatrixId?: Map<string, ArchivePreview>;
    projectMatrixFileLocationsByFileUrl?:  Map<string, FileLocation>;
}
