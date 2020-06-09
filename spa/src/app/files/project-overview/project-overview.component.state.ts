/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project overview component.
 */

// App dependencies
import { ProjectView } from "../project-view/project-view.model";

export interface ProjectOverviewComponentState {

    projectShortname: string;
    project: ProjectView;
}
