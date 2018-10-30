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
import { FileDownloadStatus } from "./file-download-status.model";

@Injectable()
export class DownloadService {

    constructor(private downloadDAO: DownloadDAO) {
    }

    /**
     * Request the download URL for the file with the specified URL.
     *
     * @param {string} fileName
     * @param {string} url
     * @returns {Observable<FileDownloadStatus>}
     */
    public downloadFile(fileName: string, url: string): Observable<FileDownloadStatus> {

        return this.downloadDAO.downloadFile(fileName, url);
    }
}
