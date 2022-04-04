/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted from project matrix table when user has requested archive preview for a matrix.
 */

export class ArchivePreviewRequestEvent {
    /**
     * @param {string} matrixId
     * @param {string} matrixVersion
     */
    constructor(
        public readonly matrixId: string,
        public readonly matrixVersion
    ) {}
}
