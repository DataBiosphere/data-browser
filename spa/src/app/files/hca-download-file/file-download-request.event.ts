/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted when file download link is clicked.
 */
export class FileDownloadRequestEvent {

    /**
     * @param {string} fileUrl
     * @param {string} fileName
     * @param {string} fileFormat
     */
    constructor(public readonly fileUrl: string,
                public readonly fileName: string,
                public readonly fileFormat: string) {}
}
