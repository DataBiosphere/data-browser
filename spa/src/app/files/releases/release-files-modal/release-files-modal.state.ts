/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing release files modal.
 */

// App dependencies
import { ReleaseDataset } from "../release-dataset.model";

/* TODO Mim */

export interface ReleaseFilesModalState {

    loaded: boolean;
    releaseDataset: ReleaseDataset
}
