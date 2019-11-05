/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of matrix-related state.
 */

// App dependencies
import { FetchMatrixFileFormatsSuccessAction } from "./fetch-matrix-file-formats-success.action";
import { FetchMatrixUrlSpeciesSuccessAction } from "./fetch-matrix-url-species-success.action";
import { FetchFileManifestUrlSuccessAction } from "../file-manifest/fetch-file-manifest-url-success.action";
import { FileManifestState } from "../file-manifest/file-manifest.state";
import { FetchMatrixUrlSuccessAction } from "./fetch-matrix-url-success.action";
import { FetchMatrixPartialQueryMatchSuccessAction } from "./fetch-matrix-partial-query-match-success.action";
import { FetchProjectMatrixUrlsSuccessAction } from "./fetch-project-matrix-urls-success.action";
import { Matrix } from "./matrix.model";
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";
import { ProjectMatrixUrls } from "../../shared/project-matrix-urls.model";

const DEFAULT_MATRIX = {
    fileFormats: [],
    partialQueryMatch: null,
    matrixUrlRequestsBySpecies: new Map<string,MatrixUrlRequest>(),
    matrixUrlsByProjectId: new Map<string, ProjectMatrixUrls>()
};

export class MatrixState implements Matrix {

    fileFormats: string[];
    partialQueryMatch: boolean;
    matrixUrlRequestsBySpecies: Map<string,MatrixUrlRequest>;
    matrixUrlsByProjectId: Map<string, ProjectMatrixUrls>;

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
            partialQueryMatch: this.partialQueryMatch,
            matrixUrlRequestsBySpecies: new Map(),
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Cancel the partial query status.
     *
     * @returns {MatrixState}
     */
    public clearMatrixPartialQueryStatus(): MatrixState {

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: null,
            matrixUrlRequestsBySpecies: this.matrixUrlRequestsBySpecies,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
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
            partialQueryMatch: this.partialQueryMatch,
            matrixUrlRequestsBySpecies: this.matrixUrlRequestsBySpecies,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Update state with the specified matrix partial query status.
     * 
     * @param {FetchMatrixPartialQueryMatchSuccessAction} action
     * @returns {MatrixState}
     */
    public fetchMatrixPartialQueryStatusSuccessAction(action: FetchMatrixPartialQueryMatchSuccessAction): MatrixState {

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: action.partialQueryMatch,
            matrixUrlRequestsBySpecies: this.matrixUrlRequestsBySpecies,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Update state with the set of available matrix URLs for the specified project.
     *
     * @param {FetchFileSummarySuccessAction} action
     * @returns {MatrixState}
     */
    public fetchProjectMatrixURLsSuccess(action: FetchProjectMatrixUrlsSuccessAction) {

        const projectMatrixUrls = action.projectMatrixUrls;
        const updatedMatrixUrlsByProjectId = new Map(this.matrixUrlsByProjectId);
        updatedMatrixUrlsByProjectId.set(projectMatrixUrls.entityId, projectMatrixUrls);

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixUrlRequestsBySpecies: this.matrixUrlRequestsBySpecies,
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
    public fetchMatrixUrlRequestSuccess(action: FetchMatrixUrlSuccessAction) {

        const requestsBySpecies = new Map(this.matrixUrlRequestsBySpecies);
        requestsBySpecies.set(action.response.species, action.response);

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixUrlRequestsBySpecies: requestsBySpecies,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * Manifest URL request response has been received from server and we have determined the set of species for the
     * request.
     *
     * @param {FetchFileManifestUrlSuccessAction} action
     * @returns {FileManifestState}
     */
    public fetchMatrixUrlRequestSpeciesSuccess(action: FetchMatrixUrlSpeciesSuccessAction) {

        return new MatrixState({
            fileFormats: this.fileFormats,
            partialQueryMatch: this.partialQueryMatch,
            matrixUrlRequestsBySpecies: action.response.matrixUrlRequestsBySpecies,
            matrixUrlsByProjectId: this.matrixUrlsByProjectId
        });
    }

    /**
     * @returns {MatrixState}
     */
    public static getDefaultState() {
        return new MatrixState();
    }
}
