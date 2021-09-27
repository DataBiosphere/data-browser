/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of state backing file manifest downloads for both selected data and project files downloads.
 */

// App dependencies
import { FetchFileManifestFileTypeSummariesSuccessAction } from "./fetch-file-manifest-file-type-summaries-success.action";
import { FileManifest } from "./file-manifest.model";
import { FileSummaryState } from "../file-summary/file-summary.state";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { FetchFileManifestUrlSuccessAction } from "./fetch-file-manifest-url-success.action";
import { ClearFileManifestUrlAction } from "./clear-file-manifest-url.action";
import { FileTypeSummary } from "../../file-summary/file-type-summary";
import { FileSummary } from "../../file-summary/file-summary";
import { FetchProjectFileSummarySuccessAction } from "./fetch-project-file-summary-success.actions";

const DEFAULT_FILE_MANIFEST_STATE = {
    fileTypeSummaries: [],
    manifestResponse: {
        status: ManifestStatus.NOT_STARTED
    } as ManifestResponse,
    projectFileSummary: {} as FileSummary 
};

export class FileManifestState {

    public readonly fileTypeSummaries: FileTypeSummary[];
    public readonly manifestResponse: ManifestResponse;
    public readonly projectFileSummary: FileSummary;

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
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary
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
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary
        });
    }

    /**
     * File summary has been requested - return current state.
     *
     * @returns {FileSummaryState}
     */
    public fetchFileTypeSummariesRequest(): FileManifestState {
        return this;
    }

    /**
     * File type summaries has been successfully requested from the server - return updated state.
     *
     * @param {FetchFileManifestFileTypeSummariesSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchFileTypeSummariesSuccess(action: FetchFileManifestFileTypeSummariesSuccessAction) {
        return new FileManifestState({
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: action.fileTypeSummaries,
            projectFileSummary: this.projectFileSummary
        });
    }
    /**
     * Project-specific file summary has been successfully requested from the server - return updated state.
     *
     * @param {FetchFileManifestFileTypeSummariesSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchProjectFileSummary(action: FetchProjectFileSummarySuccessAction) {
        return new FileManifestState({
            manifestResponse: this.manifestResponse,
            fileTypeSummaries: this.fileTypeSummaries,
            projectFileSummary: action.fileSummary
        });
    }

    /**
     * @returns {FileManifestState}
     */
    public static getDefaultState() {
        return new FileManifestState();
    }
}
