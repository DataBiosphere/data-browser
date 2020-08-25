/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project analysis portals component.
 */

// App dependencies
import { Portal } from "../_ngrx/integration/portal.model";
import { Project } from "../shared/project.model";

export interface ProjectAnalysisPortalsState {

    loaded: boolean;
    integrations?: Portal[];
    integratedWithTertiaryPortals?: boolean;
    project?: Project;
}
