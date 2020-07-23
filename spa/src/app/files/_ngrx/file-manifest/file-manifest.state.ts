/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of state backing file manifest download modal. Contains both summary data and download status.
 */

// App dependencies
import { FileManifest } from "./file-manifest.model";
import { FileSummaryState } from "../file-summary/file-summary.state";
import { ManifestStatus } from "../../shared/manifest-status.model";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { ManifestResponse } from "../../shared/manifest-response.model";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { ClearFileManifestUrlAction } from "./clear-file-manifest-url.action";

const DEFAULT_FILE_MANIFEST_STATE = {
    fileSummary: FileSummaryState.getDefaultState(),
    manifestResponse: {
        status: ManifestStatus.NOT_STARTED
    } as ManifestResponse
};

export class FileManifestState {

    public readonly fileSummary: FileSummaryState;
    public readonly manifestResponse: ManifestResponse;

    /**
     * @param {FileManifestState} state
     */
    constructor(state: FileManifest = DEFAULT_FILE_MANIFEST_STATE) {
        Object.assign(this, state);
    }

    /**
     * File manifest request has been cancelled (for example, from navigation away from download); clear corresponding
     * state.
     * 
     * @param {ClearFileManifestUrlAction} action
     */
    public clearFileManifestUrl(action: ClearFileManifestUrlAction) {
        return new FileManifestState({
            manifestResponse: {
                status: ManifestStatus.NOT_STARTED
            } as ManifestResponse,
            fileSummary: this.fileSummary
        });
    }

    /**
     * Manifest URL request response has been received from server. This does not necessarily mean the request has
     * completed; the status of the response could be "in progress" with the corresponding retry URL (and not the final
     * export URL).
     *
     * @param {FetchFileManifestUrlSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchFileManifestUrlSuccess(action: FetchFileManifestUrlSuccessAction) {
        return new FileManifestState({
            manifestResponse: action.response,
            fileSummary: this.fileSummary
        });
    }

    /**
     * File summary has been requested - return current state.
     *
     * @returns {FileSummaryState}
     */
    public fetchSummaryRequest(): FileManifestState {
        return this;
    }

    /**
     * File summary has been successfully requested from the server - return updated state.
     *
     * @param {FetchManifestDownloadFileSummarySuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchSummarySuccess(action: FetchManifestDownloadFileSummarySuccessAction) {
        return new FileManifestState({
            manifestResponse: this.manifestResponse,
            fileSummary: action.fileSummary
        });
    }

    /**
     * @returns {FileManifestState}
     */
    public static getDefaultState() {
        return new FileManifestState();
    }
}
