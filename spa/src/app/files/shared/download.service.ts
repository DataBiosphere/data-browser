/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file download-related functionality.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, retry, switchMap } from "rxjs/operators";

// App dependencies
import { FileDownloadResponse } from "./download-response.model";
import { FileDownloadStatus } from "./file-download-status.model";
import { FileDownloadHttpResponse } from "./download-http-response.model";
import { Catalog } from "../catalog/catalog.model";

@Injectable()
export class DownloadService {

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
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
     *  Request the file with the specified URL - returns location of either retry URL if file is not yet ready for
     *  download, or the final file location if ready for download.
     *
     * @param {boolean} v2
     * @param {string} url - either initial file download URL, or URL to retrieve status of file download
     * @param {string} fileName
     * @returns {Subject<FileDownloadResponse>}
     *
     */
    public requestFileDownload(v2: boolean, url: string, fileName?: string): Observable<FileDownloadResponse> {

        const params = {};
        if ( !v2 && fileName ) {
            params["fileName"] = fileName;
        }
        return this.httpClient
            .get<FileDownloadHttpResponse>(url, {params})
            .pipe(
                retry(3),
                catchError(this.handleFileDownloadError.bind(this)),
                switchMap(this.bindFileDownloadResponse.bind(this))
            );
    }

    /**
     * Normalize download HTTP response to FE-friendly format.
     *
     * @param {FileDownloadHttpResponse} response
     * @returns {FileDownloadResponse}
     */
    private bindFileDownloadResponse(response: FileDownloadHttpResponse): Observable<FileDownloadResponse> {

        return of({
            fileUrl: response.Location,
            retryAfter: response["Retry-After"],
            status: this.translateFileDownloadStatus(response.Status)
        });
    }

    /**
     * An error occurred during a file download - create fake response object with error values. 
     *
     * @returns {FileDownloadHttpResponse}
     */
    private handleFileDownloadError(): Observable<FileDownloadHttpResponse> {

        return of({
            Location: "",
            "Retry-After": 0,
            Status: 500
        });
    }

    /**
     * Convert the value of the file download status to FE-friendly value.
     *
     * @param {number} code
     * @returns {FileDownloadStatus}
     */
    private translateFileDownloadStatus(code: number): FileDownloadStatus {

        if ( code === 301 ) {
            return FileDownloadStatus.IN_PROGRESS;
        }
        if ( code === 302 ) {
            return FileDownloadStatus.COMPLETE;
        }
        return FileDownloadStatus.FAILED;
    }
}
