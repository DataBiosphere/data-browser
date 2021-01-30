/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project expression matrices component.
 */

// App dependencies
import { FileLocation } from "../file-location/file-location.model";
import { Project } from "../shared/project.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

export interface ProjectMatricesComponentState {

    project: Project;
    projectMatrixFileLocationsByFileUrl:  Map<string, FileLocation>;
    projectMatrixUrls: ProjectMatrixUrls;
}
