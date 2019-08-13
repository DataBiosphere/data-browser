/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing HCA project component.
 */

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { ProjectView } from "./project-view.model";

export interface HCAProjectState {

    project: ProjectView;
    projectMatrixUrls: ProjectMatrixUrls;
    selectedProjectIds: string[];
}
