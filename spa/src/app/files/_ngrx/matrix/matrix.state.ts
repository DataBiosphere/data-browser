/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Representation of matrix-related state.
 */

// App dependencies
import { FetchMatrixFileFormatsSuccessAction } from "./matrix.actions";
import { Matrix } from "./matrix.model";

const DEFAULT_MATRIX = {
    fileFormats: []
};

export class MatrixState implements Matrix {

    fileFormats: string[];

    /**
     * @param {MatrixState} state
     */
    constructor(state: Matrix = DEFAULT_MATRIX) {
        Object.assign(this, state);
    }

    /**
     * @returns {MatrixState}
     */
    public fetchMatrixFileFormatsRequest() {
        return this;
    }

    /**
     * @param {FetchFileSummarySuccessAction} action
     * @returns {MatrixState}
     */
    public fetchMatrixFileFormatsSuccess(action: FetchMatrixFileFormatsSuccessAction) {
        const fileFormats = action.fileFormats;
        return new MatrixState({fileFormats});
    }

    /**
     * @returns {MatrixState}
     */
    public static getDefaultState() {
        return new MatrixState();
    }
}
