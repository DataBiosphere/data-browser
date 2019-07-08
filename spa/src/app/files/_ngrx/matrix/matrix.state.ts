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
import { Matrix } from "./matrix.model";
import { MatrixResponse } from "../../shared/matrix-response.model";
import { MatrixStatus } from "../../shared/matrix-status.model";

const DEFAULT_MATRIX = {
    fileFormats: [],
    matrixResponse: {
        status: MatrixStatus.NOT_STARTED
    } as MatrixResponse
};

export class MatrixState implements Matrix {

    fileFormats: string[];
    matrixResponse: MatrixResponse;

    /**
     * @param {MatrixState} state
     */
    constructor(state: Matrix = DEFAULT_MATRIX) {
        Object.assign(this, state);
    }

    /**
     * Cancel the existing matrix URL request.
     *
     * @returns {MatrixState}
     */
    public cancelMatrixUrlRequest(): MatrixState {

        return new MatrixState({
            fileFormats: this.fileFormats,
            matrixResponse: {
                status: MatrixStatus.NOT_STARTED
            } as MatrixResponse
        });
    }

    /**
     * @returns {MatrixState}
     */
    public fetchMatrixFileFormatsRequest(): MatrixState {
        return this;
    }

    /**
     * @param {FetchFileSummarySuccessAction} action
     * @returns {MatrixState}
     */
    public fetchMatrixFileFormatsSuccess(action: FetchMatrixFileFormatsSuccessAction) {
        const fileFormats = action.fileFormats;
        return new MatrixState({
            fileFormats,
            matrixResponse: this.matrixResponse
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
            matrixResponse: action.response
        });
    }

    /**
     * @returns {MatrixState}
     */
    public static getDefaultState() {
        return new MatrixState();
    }
}
