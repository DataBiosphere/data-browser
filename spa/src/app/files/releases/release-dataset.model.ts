/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * XXXXXXXXX TODO Mim, rename, redo
 */

// App dependencies
import { ReleaseDatasetView } from "./release-dataset-view.model";

export interface ReleaseDataset {
    entryId: string;
    projectShortname: string;
    projectData: ReleaseDatasetView;
}

