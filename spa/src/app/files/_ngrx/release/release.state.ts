/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of release-related state persisted in local store.
 */

// App dependencies
import { Release } from "../../releases/release.model";
import { FetchReleasesSuccessAction } from "./fetch-releases-success.action";
import { Releases } from "./releases.model";

const DEFAULT_RELEASE_STATE = {
    releasesByName: new Map(),
    releaseFilesReferrer: false,
    releaseReferrer: false
};

export class ReleaseState implements Releases {

    releasesByName: Map<string, Release>;
    releaseFilesReferrer: boolean;
    releaseReferrer: boolean;

    /**
     * @param {Releases} state
     */
    constructor(state: Releases = DEFAULT_RELEASE_STATE) {
        Object.assign(this, state);
    }

    /**
     * Set release files referrer to false.
     */
    public clearReleaseFilesReferrer(): ReleaseState {

        return new ReleaseState({
            releasesByName: this.releasesByName,
            releaseFilesReferrer: false,
            releaseReferrer: this.releaseReferrer
        });
    }

    /**
     * Set release referrer to false.
     */
    public clearReleaseReferrer(): ReleaseState {

        return new ReleaseState({
            releasesByName: this.releasesByName,
            releaseFilesReferrer: this.releaseFilesReferrer,
            releaseReferrer: false
        });
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

        return new ReleaseState({
            releasesByName,
            releaseFilesReferrer: this.releaseFilesReferrer,
            releaseReferrer: this.releaseReferrer
        });
    }

    /**
     * Set release files referrer to true.
     */
    public setReleaseFilesReferrer(): ReleaseState {

        return new ReleaseState({
            releasesByName: this.releasesByName,
            releaseReferrer: this.releaseReferrer,
            releaseFilesReferrer: true
        });
    }

    /**
     * Set release referrer to true.
     */
    public setReleaseReferrer(): ReleaseState {

        return new ReleaseState({
            releasesByName: this.releasesByName,
            releaseReferrer: true,
            releaseFilesReferrer: this.releaseFilesReferrer
        });
    }

    /**
     * @returns {ReleaseState}
     */
    public static getDefaultState() {
        return new ReleaseState();
    }
}
