/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of matrix URLs (one per format) for a given project.
 */

export class ProjectMatrixUrls {

    constructor(
        public readonly entityId: string, 
        public readonly csvUrl: string,
        public readonly loomUrl: string,
        public readonly mtxUrl: string) {}

    /**
     * Returns true if a project matrix, in any format, is available for download
     *
     * @returns {boolean}
     */
    public isAnyProjectMatrixUrlAvailable(): boolean {

        return this.isProjectMatrixCSVAvailable() ||
            this.isProjectMatrixLoomAvailable() ||
            this.isProjectMatrixMtxAvailable();
    }

    /**
     * Returns true if matrix with CSV format is available for this project.
     *
     * @returns {boolean}
     */
    public isProjectMatrixCSVAvailable(): boolean {

        return !!this.csvUrl;
    }

    /**
     * Returns true if matrix with loom format is available for this project.
     *
     * @returns {boolean}
     */
    public isProjectMatrixLoomAvailable(): boolean {

        return !!this.loomUrl;
    }

    /**
     * Returns true if matrix with loom format is available for this project.
     *
     * @returns {boolean}
     */
    public isProjectMatrixMtxAvailable(): boolean {

        return !!this.mtxUrl;
    }
}
