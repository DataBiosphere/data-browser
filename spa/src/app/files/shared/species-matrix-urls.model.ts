/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of matrix URLs (one per format) for a given species.
 */
import { MatrixUrl } from "../project-prepared-matrix-downloads/matrix-url.model";

export class SpeciesMatrixUrls {

    constructor(
        public readonly species: string,
        public readonly csvUrl: string,
        public readonly loomUrl: string,
        public readonly mtxUrl: string) {}

    /**
     * Returns true if a project matrix, in any format, is available for download
     *
     * @returns {boolean}
     */
    public isAnyMatrixUrlAvailable(): boolean {

        return this.isMatrixCSVAvailable() ||
            this.isMatrixLoomAvailable() ||
            this.isMatrixMtxAvailable();
    }

    /**
     * Returns true if matrix with CSV format is available for this project.
     *
     * @returns {boolean}
     */
    public isMatrixCSVAvailable(): boolean {

        return !!this.csvUrl;
    }

    /**
     * Returns true if matrix with loom format is available for this project.
     *
     * @returns {boolean}
     */
    public isMatrixLoomAvailable(): boolean {

        return !!this.loomUrl;
    }

    /**
     * Returns true if matrix with loom format is available for this project.
     *
     * @returns {boolean}
     */
    public isMatrixMtxAvailable(): boolean {

        return !!this.mtxUrl;
    }

    /**
     * List the set of URLs available for this species.
     * 
     * @returns {MatrixUrl[]}
     */
    public listMatrixUrls(): MatrixUrl[] {

        const matrixUrls = [];
        if ( this.isMatrixCSVAvailable() ) {
            matrixUrls.push({
                fileType: "csv",
                url: this.csvUrl
            });
        }

        if ( this.isMatrixLoomAvailable() ) {
            matrixUrls.push({
                fileType: "loom",
                url: this.loomUrl
            });
        }

        if ( this.isMatrixMtxAvailable() ) {
            matrixUrls.push({
                fileType: "mtx",
                url: this.mtxUrl
            });
        }
        
        return matrixUrls;
    }
}
