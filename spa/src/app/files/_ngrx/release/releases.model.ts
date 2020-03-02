/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of release-related state, persisted in local store.
 */

// App dependencies
import { Release } from "../../releases/2020-march/release.model";

export interface Releases {
    releasesByName: Map<string, Release>;
    releaseReferrer: boolean;
}
