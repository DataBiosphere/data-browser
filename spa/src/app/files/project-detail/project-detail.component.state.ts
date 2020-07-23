/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project detail component.
 */

// App dependencies
import { Project } from "../shared/project.model";
import { SearchTerm } from "../search/search-term.model";

export interface ProjectDetailComponentState {

    externalResourcesExist?: boolean;
    loaded: boolean;
    project?: Project;
    projectInRelease?: boolean;
    projectSelected?: boolean;
}
