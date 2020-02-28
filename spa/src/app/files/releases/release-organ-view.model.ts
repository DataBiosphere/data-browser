/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View model of release datasets for a given organ, used when displaying the organs and their corresponding datasets
 * on the release page.
 */

// App dependencies
import { ReleaseDatasetView } from "./release-dataset-view.model";

export interface ReleaseOrganView {
    organ: string;
    datasets: ReleaseDatasetView[];
}

