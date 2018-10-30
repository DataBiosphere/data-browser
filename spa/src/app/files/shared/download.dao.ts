/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object, connecting to file-download end points.
 */

// Core dependencies
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { catchError, retry, startWith, switchMap } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { FileDownloadStatus } from "./file-download-status.model";

@Injectable()
export class DownloadDAO {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient, @Inject(DOCUMENT) private document: any) {
    }

    /**
     *  Download the file with the specified URL.
     *
     * @param {string} fileName
     * @param {string} fileUrl
     * @returns {Subject<FileDownloadStatus>}
     *
     */
    public downloadFile(fileName: string, fileUrl: string): Observable<FileDownloadStatus> {

        return this.httpClient
            .get<string>(fileUrl, {observe: "response", responseType: "blob" as any})
            .pipe(
                retry(3),
                catchError(this.handleFileDownloadError.bind(this)),
                switchMap((response) => { // TODO revisit - prevent execute on error
                    return this.writeFile(response["body"], fileName);
                }),
                startWith(FileDownloadStatus.IN_PROGRESS)
            );
    }

    /**
     * An error occurred during a file download - return error state.
     *
     * @returns {FileDownloadStatus}
     */
    private handleFileDownloadError(): Observable<FileDownloadStatus> {

        return Observable.of(FileDownloadStatus.FAILED);
    }

    /**
     * Trigger write of file.
     *
     * @param {Blob} file
     * @param {string} fileName
     * @returns {Observable<FileDownloadStatus>}
     */
    private writeFile(file: Blob, fileName: string): Observable<FileDownloadStatus> {

        if ( !file ) {
            return Observable.of(FileDownloadStatus.FAILED);
        }

        const blob = new Blob([file]);
        const downloadUrl = URL.createObjectURL(blob);

        const a = this.document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        this.document.body.appendChild(a);
        a.click();
        a.parentNode.removeChild(a);

        return Observable.of(FileDownloadStatus.COMPLETE);
    }
}
