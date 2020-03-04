/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of release-related state, persisted in local store.
 */

// App dependencies
import { Release } from "../../releases/release.model";

export interface Releases {
    releasesByName: Map<string, Release>;
    releaseFilesReferrer: boolean;
    releaseReferrer: boolean;
}
