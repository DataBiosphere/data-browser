/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of project included in release.
 */

// App dependencies
import { ReleaseDataset } from "./release-dataset.model";

export interface ReleaseProject {

    entryId: string; // Matches naming convention of project UUID from Azul.
    datasets: ReleaseDataset[];
}
