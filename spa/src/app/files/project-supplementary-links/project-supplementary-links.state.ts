/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project supplementary links component.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface ProjectSupplementaryLinksState {
    
    loaded: boolean;
    project?: Project;
}
