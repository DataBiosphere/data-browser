/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project download matrix modal. 
 */

// App dependencies
import { Project } from "../shared/project.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

export interface ProjectDownloadMatrixModalState {

    loaded: boolean;
    project?: Project;
    projectsMatrixUrls?: ProjectMatrixUrls;
}
