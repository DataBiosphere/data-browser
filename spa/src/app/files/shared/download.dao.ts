/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to file-download end points.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, retry, switchMap } from "rxjs/operators";

// App dependencies
import { FileDownloadHttpResponse } from "./download-http-response.model";
import { FileDownloadResponse } from "./download-response.model";
import { FileDownloadStatus } from "./file-download-status.model";

@Injectable()
export class DownloadDAO {

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
    }

    /**
     *  Request the file with the specified URL - returns location of either retry URL if file is not yet ready for
     *  download, or the final file location if ready for download.
     *
     * @param {string} url - either initial file download URL, or URL to retrieve status of file download
     * @param {string} fileName
     * @returns {Subject<FileDownloadResponse>}
     *
     */
    public requestFileDownload(url: string, fileName?: string): Observable<FileDownloadResponse> {

        const params = {};
        if ( fileName ) {
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
     * An error occurred during a file download - return error state.
     *
     * @returns {FileDownloadResponse}
     */
    private handleFileDownloadError(): Observable<FileDownloadResponse> {

        return of({
            status: FileDownloadStatus.FAILED,
            fileUrl: "",
            retryAfter: 0
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
