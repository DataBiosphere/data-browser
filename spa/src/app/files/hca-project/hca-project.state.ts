/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing HCA project component.
 */

// App dependencies
import { Project } from "../shared/project.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

export interface HCAProjectState {

    project: Project;
    projectMatrixUrls: ProjectMatrixUrls;
    selectedProjectIds: string[];
}
