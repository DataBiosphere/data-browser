/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project download manifest modal.
 */

// App dependencies
import { Project } from "../shared/project.model";

export interface ProjectManifestDownloadModalComponentState {

    loaded: boolean;
    project?: Project;
}
