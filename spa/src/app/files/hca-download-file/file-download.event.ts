/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Event emitted when file is downloaded.
 */
export class FileDownloadEvent {

    /**
     * @param {string} fileUrl
     * @param {string} fileName
     * @param {string} fileFormat
     */
    constructor(public readonly fileUrl: string,
                public readonly fileName: string,
                public readonly fileFormat: string) {}
}
