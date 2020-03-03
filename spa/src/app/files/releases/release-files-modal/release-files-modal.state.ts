/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing release files modal.
 */

// App dependencies
import { ReleaseDataset } from "../2020-march/release-dataset.model";
import { ReleaseProject } from "../2020-march/release-project.model";

export interface ReleaseFilesModalState {

    loaded: boolean;
    releaseProject?: ReleaseProject;
    releaseDataset?: ReleaseDataset;
}
