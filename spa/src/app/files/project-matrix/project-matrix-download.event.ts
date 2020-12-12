/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted when a project matrix, either DCP generated or contributor generated is downloaded.
 */
import { ProjectMatrixType } from "./project-matrix-type.model";

export class ProjectMatrixDownloadEvent {

    /**
     * @param {string} fileName
     * @param {string} url
     * @param {ProjectMatrixType} projectMatrixType
     */
    constructor(public readonly fileName: string,
                public readonly url: string,
                public readonly projectMatrixType: ProjectMatrixType) {}
}
