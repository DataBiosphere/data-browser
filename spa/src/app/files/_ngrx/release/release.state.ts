/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of release-related state persisted in local store.
 */

// App dependencies
import { Releases } from "./releases.model";
import { Release } from "../../releases/2020-march/release";
import { FetchReleasesSuccessAction } from "./fetch-releases-success.action";

const DEFAULT_RELEASE_STATE = {
    releasesByName: new Map()
};

export class ReleaseState implements Releases {

    releasesByName: Map<string, Release>;

    /**
     * @param {Releases} state
     */
    constructor(state: Releases = DEFAULT_RELEASE_STATE) {
        Object.assign(this, state);
    }

    /**
     * @returns {ReleaseState}
     */
    public fetchReleasesByNameRequest(): ReleaseState {
        return this;
    }

    /**
     * Release data has been successfully read from local JSON, store it.
     */
    public fetchReleasesSuccess(action: FetchReleasesSuccessAction): ReleaseState {

        const releasesByName = action.releases.reduce((accum, release) => {

            accum.set(release.name, release);
            return accum;
        }, new Map());
        
        return new ReleaseState({releasesByName});
    }

    /**
     * @returns {ReleaseState}
     */
    public static getDefaultState() {
        return new ReleaseState();
    }
}
