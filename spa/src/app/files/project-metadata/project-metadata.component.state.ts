/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project metadata component.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface ProjectMetadataComponentState {
    loaded: boolean;
    project?: Project;
}
