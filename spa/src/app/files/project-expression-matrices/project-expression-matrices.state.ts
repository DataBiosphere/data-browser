/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project expression matrices component.
 */

// App dependencies
import { Project } from "../shared/project.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

export interface ProjectExpressionMatricesState {

    project: Project;
    projectMatrixUrls: ProjectMatrixUrls;
}
