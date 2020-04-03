/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project detail component.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface ProjectDetailState {

    externalResourcesExist: boolean;
    project: Project;
    projectInRelease: boolean;
    projectSelected: boolean;
}
