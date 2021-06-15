/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project detail component.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface ProjectDetailComponentState {

    loaded: boolean;
    project?: Project;
    projectSelected?: boolean;
}
