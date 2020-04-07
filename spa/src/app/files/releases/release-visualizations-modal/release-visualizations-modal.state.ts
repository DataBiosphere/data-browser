/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing release files modal.
 */

// App dependencies
import { ReleaseDatasetView } from "../release-dataset-view.model";

export interface ReleaseVisualizationsModalState {

    loaded: boolean;
    releaseFilesReferrer?: boolean;
    releaseDataset?: ReleaseDatasetView;
    singleDataset?: boolean;
}
