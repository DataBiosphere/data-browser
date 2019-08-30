/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of matrix-related state.
 */

// App dependencies
import { FetchMatrixFileFormatsSuccessAction } from "./fetch-matrix-file-formats-success.action";
import { FetchFileManifestUrlSuccessAction } from "../file-manifest/fetch-file-manifest-url-success.action";
import { FileManifestState } from "../file-manifest/file-manifest.state";
import { FetchMatrixUrlSuccessAction } from "./fetch-matrix-url-success.action";
import { FetchMatrixPartialQueryMatchSuccessAction } from "./fetch-matrix-partial-query-match-success.action";
import { FetchProjectMatrixUrlsSuccessAction } from "./fetch-project-matrix-urls-success.action";
import { Matrix } from "./matrix.model";
import { MatrixResponse } from "../../shared/matrix-response.model";
import { MatrixStatus } from "../../shared/matrix-status.model";
import { ProjectMatrixUrls } from "../../shared/project-matrix-urls.model";

const DEFAULT_MATRIX = {
    fileFormats: [],
    partialQueryMatch: null,
    matrixResponse: {
        status: MatrixStatus.NOT_STARTED
    } as MatrixResponse,
    matrixUrlsByProjectId: new Map<string, ProjectMatrixUrls>()
};

export class MatrixState implements Matrix {

    fileFormats: string[];
    partialQueryMatch: boolean;
    matrixResponse: MatrixResponse;
    matrixUrlsByProjectId: Map<string, ProjectMatrixUrls>;

    /**
     * @param {ProjectState} state
     */
    constructor(state: Matrix = DEFAULT_MATRIX) {
        Object.assign(this, state);
    }

    /**
     * Cancel the existing matrix URL request.
     *
     * @returns {ProjectState}
     */
    public cancelMatrixUrlRequest(): MatrixState {

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixResponse: {
                status: MatrixStatus.NOT_STARTED
            } as MatrixResponse,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Cancel the partial query status.
     *
     * @returns {ProjectState}
     */
    public clearMatrixPartialQueryStatus(): MatrixState {

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: null,
            matrixResponse: this.matrixResponse,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * @returns {ProjectState}
     */
    public fetchMatrixFileFormatsRequest(): MatrixState {
        return this;
    }

    /**
     * @param {FetchFileSummarySuccessAction} action
     * @returns {ProjectState}
     */
    public fetchMatrixFileFormatsSuccess(action: FetchMatrixFileFormatsSuccessAction) {
        const fileFormats = action.fileFormats;
        return new MatrixState({
            fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixResponse: this.matrixResponse,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Update state with the specified matrix partial query status.
     * 
     * @param {FetchMatrixPartialQueryMatchSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchMatrixPartialQueryStatusSuccessAction(action: FetchMatrixPartialQueryMatchSuccessAction): MatrixState {

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: action.partialQueryMatch,
            matrixResponse: this.matrixResponse,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Update state with the set of available matrix URLs for the specified project.
     *
     * @param {FetchFileSummarySuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixURLsSuccess(action: FetchProjectMatrixUrlsSuccessAction) {

        const projectMatrixUrls = action.projectMatrixUrls;
        const updatedMatrixUrlsByProjectId = new Map(this.matrixUrlsByProjectId);
        updatedMatrixUrlsByProjectId.set(projectMatrixUrls.entityId, projectMatrixUrls);

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixResponse: this.matrixResponse,
            matrixUrlsByProjectId: updatedMatrixUrlsByProjectId
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
    public fetchMatrixUrlSuccess(action: FetchMatrixUrlSuccessAction) {
        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixResponse: action.response,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * @returns {ProjectState}
     */
    public static getDefaultState() {
        return new MatrixState();
    }
}
