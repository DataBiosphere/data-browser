/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing HCA project component.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface HCAProjectState {

    project: Project;
    selectedProjectIds: string[];
}
