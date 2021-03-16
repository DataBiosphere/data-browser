/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project download matrix modal. 
 */

// App dependencies
import { FileLocation } from "../file-location/file-location.model";
import { Project } from "../shared/project.model";

export interface ProjectMatrixDownloadModalState {

    loaded: boolean;
    project?: Project;
    projectMatrixFileLocationsByFileUrl?:  Map<string, FileLocation>;
}
