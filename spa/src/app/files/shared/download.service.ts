/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Service for coordinating file download-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// App dependencies
import { DownloadDAO } from "./download.dao";
import { FileDownloadResponse } from "./download-response.model";
import { FileDownloadStatus } from "./file-download-status.model";

@Injectable()
export class DownloadService {

    /**
     * @param {DownloadDAO} downloadDAO
     */
    constructor(private downloadDAO: DownloadDAO) {
    }

    /**
     * Returns true if file download request is completed.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isFileDownloadRequestCompleted(response: FileDownloadResponse): boolean {

        return response.status === FileDownloadStatus.COMPLETE;
    }

    /**
     * Returns true if file download request has failed.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isFileDownloadRequestFailed(response: FileDownloadResponse): boolean {

        return response.status === FileDownloadStatus.FAILED;
    }

    /**
     * Returns true if browser has started actual download of file.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isFileDownloading(response: FileDownloadResponse): boolean {

        return response.status === FileDownloadStatus.DOWNLOADING;
    }

    /**
     * Returns true if file download request has been initiated. That is, user has requested file download but response
     * from server has not yet been received.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isFileDownloadInitiated(response: FileDownloadResponse): boolean {

        return response.status === FileDownloadStatus.INITIATED;
    }

    /**
     * Returns true if file download request has not yet started.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isFileDownloadRequestNotStarted(response: FileDownloadResponse): boolean {

        return response.status === FileDownloadStatus.NOT_STARTED;
    }

    /**
     * Returns true if file download request is in progress.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isFileDownloadRequestInProgress(response: FileDownloadResponse): boolean {

        return response.status === FileDownloadStatus.IN_PROGRESS;
    }

    /**
     * Request the download URL for the file with the specified URL.
     *
     * @param {string} url
     * @param {string} fileName
     * @returns {Observable<FileDownloadResponse>}
     */
    public requestFileDownload(url: string, fileName?: string): Observable<FileDownloadResponse> {

        return this.downloadDAO.requestFileDownload(url, fileName);
    }
}
