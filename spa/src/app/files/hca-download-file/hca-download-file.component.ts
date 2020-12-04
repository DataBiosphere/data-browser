/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying file download options and handling the corresponding functionality that requests the file
 * download URL.
 */

// Core dependencies
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";
import { take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { FileDownloadEvent } from "./file-download.event";
import { DownloadService } from "../shared/download.service";
import { FileDownloadResponse } from "../shared/download-response.model";
import { FileDownloadStatus } from "../shared/file-download-status.model";

@Component({
    selector: "hca-download-file",
    templateUrl: "./hca-download-file.component.html",
    styleUrls: ["./hca-download-file.component.scss"]
})
export class HCADownloadFileComponent {

    // Template variables
    public downloadResponse$ = new BehaviorSubject<FileDownloadResponse>({
        status: FileDownloadStatus.NOT_STARTED
    });

    // Inputs/outputs
    @Input() fileName: string;
    @Input() fileFormat: string = "";
    @Input() fileUrl: string;
    @Output() fileDownloaded = new EventEmitter<FileDownloadEvent>();

    // View child/ren
    @ViewChild("download") downloadEl: ElementRef; // Static false: must wait for ng switch to resolve 

    /**
     * @param {ConfigService} configService
     * @param {DownloadService} downloadService
     */
    constructor(private configService: ConfigService, private downloadService: DownloadService) {}

    /**
     * Returns true if download has completed.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloadComplete(response: FileDownloadResponse): boolean {

        return this.downloadService.isFileDownloadRequestCompleted(response);
    }

    /**
     * Returns true if download has failed.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloadFailed(response: FileDownloadResponse): boolean {

        return this.downloadService.isFileDownloadRequestFailed(response);
    }

    /**
     * Returns true if browser has started actual download of file.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloading(response: FileDownloadResponse): boolean {

        return this.downloadService.isFileDownloading(response);
    }

    /**
     * Returns true if file download request has been initiated. That is, user has requested file download but response
     * from server has not yet been received.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloadInitiated(response: FileDownloadResponse): boolean {

        return this.downloadService.isFileDownloadInitiated(response);
    }

    /**
     * Returns true if download has not yet been initiated.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloadNotStarted(response: FileDownloadResponse): boolean {

        return this.downloadService.isFileDownloadRequestNotStarted(response);
    }

    /**
     * True from when the user clicks the file download button through to when the browser initiates the actual
     * download of the file.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloadInProgress(response: FileDownloadResponse): boolean {
        
        return this.downloadService.isFileDownloadRequestInProgress(response);
    }

    /**
     * Initiate file download request. Let parent components know file download has been initiated.
     */
    public onFileRequested() {
        
        const event = new FileDownloadEvent(this.fileUrl, this.fileName, this.fileFormat);
        this.fileDownloaded.emit(event);
        
        // Update file download status to indicate user has initiated file download.
        this.downloadResponse$.next({
            status: FileDownloadStatus.INITIATED
        });

        // Set up poller to keep checking on status of file download.
        this.downloadResponse$
            .subscribe((response: FileDownloadResponse) => {
                if ( this.isDownloadInProgress(response) ) {
                    this.updateFileDownloadStatus(response);
                }
                else if ( this.isDownloadComplete(response) ) {
                    this.downloadFile(response.fileUrl);
                }
            });

        // Kick off request to download file
        this.requestFileDownload(this.fileUrl, this.fileName);
    }

    /**
     * True from the moment user clicks the file download button through to when the browser initiates the actual
     * download of the file.
     * 
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public showSpinner(response: FileDownloadResponse): boolean {

        return this.isDownloadInitiated(response) ||
            this.isDownloadInProgress(response) ||
            // Include COMPLETED here as there is a delay between when the "complete" status is received
            // from the server and when the browser initiates the actual download.
            this.isDownloadComplete(response);
    }

    /**
     * File download request is completed - initiate file download.
     *
     * @param {string} url
     */
    private downloadFile(url: string) {

        const el = this.downloadEl.nativeElement;
        el.href = url;
        el.click();

        // Update file download status to indicate browser is starting actual download, delaying by a second
        // to cover browser time to initiate (and indicate start of) download.
        this.emitAfterInterval(() => {
            this.downloadResponse$.next({
                status: FileDownloadStatus.DOWNLOADING
            });
        }, 1000);
    }

    /**
     * Execute function after specified delay.
     *
     * @param {Function} fn
     * @param {number} delay (milliseconds)
     */
    private emitAfterInterval(fn, delay: number) {

        interval(delay)
            .pipe(take(1))
            .subscribe(fn);
    }

    /**
     * Request file download status for the specified URL.
     *
     * @param {string} fileUrl
     * @param {string} fileName - only required for initial request that kicks off file download
     */
    private requestFileDownload(fileUrl: string, fileName?: string) {

        this.downloadService.requestFileDownload(this.configService.isV2(), fileUrl, fileName)
            .subscribe((response) => {
                this.downloadResponse$.next(response);
            });
    }

    /**
     * Request update of download file request status, after a delay according to the previously returned "retry after"
     * value.
     *
     * @param {FileDownloadResponse} response
     */
    private updateFileDownloadStatus(response: FileDownloadResponse) {

        this.emitAfterInterval(() => {
            this.requestFileDownload(response.fileUrl);
        }, response.retryAfter * 1000);
    }
}
