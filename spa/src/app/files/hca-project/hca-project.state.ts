/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing HCA project component.
 */

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { ProjectView } from "./project-view.model";

export interface HCAProjectState {

    integrations: Portal[];
    integratedWithTertiaryPortals: boolean;
    project: ProjectView;
    projectMatrixUrls: ProjectMatrixUrls;
    selectedProjectIds: string[];
}
