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
import { DownloadFileManifestRequestedAction } from "./download-file-manifest-requested.action";
import { FetchManifestDownloadFileSummarySuccessAction } from "./fetch-manifest-download-file-summary-success.action";
import { ManifestResponse } from "../../shared/manifest-response.model";

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
     * Download response has been received from server. This does not necessarily mean the download has completed;
     * the status of the response could be "in progress" with the corresponding retry URL (and not the final export URL).
     *
     * @param {DownloadFileManifestRequestedAction} action
     * @returns {FileManifestState}
     */
    public  downloadRequested(action: DownloadFileManifestRequestedAction) {
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
