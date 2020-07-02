/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project guard component.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface ProjectGuardComponentState {

    loaded: boolean;
    projectId?: string;
    redirectUrl?: string;
    withdrawn?: boolean;
}
