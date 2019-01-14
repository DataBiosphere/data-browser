/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component for displaying file download options and handling the corresponding functionality that requests the file
 * download URL.
 */

// Core dependencies
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import "rxjs/add/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

// App dependencies
import { Element } from "../hca-table-files/hca-table-files.component";
import { DownloadService } from "../shared/download.service";
import { FileDownloadResponse } from "../shared/download-response.model";
import { FileDownloadStatus } from "../shared/file-download-status.model";

@Component({
    selector: "hca-download-file",
    templateUrl: "./hca-download-file.component.html",
    styleUrls: ["./hca-download-file.component.scss"]
})
export class HCADownloadFileComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    public fileName: string;
    public fileUrl: string;

    // Template variables
    downloadResponse$ = new BehaviorSubject<FileDownloadResponse>({
        status: FileDownloadStatus.NOT_STARTED
    });

    // Inputs
    @Input() file: Element;
    @Output() fileUrlGenerated = new EventEmitter<string>();

    // View child/ren
    @ViewChild("download") downloadEl: ElementRef;

    /**
     * @param {DownloadService} downloadService
     */
    constructor(private downloadService: DownloadService) {
    }

    /**
     * Public API
     */

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
     * Returns true if file download has been requested.
     *
     * @param {FileDownloadResponse} response
     * @returns {boolean}
     */
    public isDownloadInProgress(response: FileDownloadResponse): boolean {

        return this.downloadService.isFileDownloadRequestInProgress(response);
    }

    /**
     * Return observable of download status, for binding to in template.
     *
     * @returns {Observable<FileDownloadResponse>}
     */
    public observeFileDownloadStatus(): Observable<FileDownloadResponse> {

        return this.downloadResponse$.asObservable();
    }

    /**
     * Initiate file download request.
     */
    public onRequestFile() {

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
        this.requestFileDownload(this.fileUrl);
    }

    /**
     * True from the moment user clicks the file download button through to when the browser initiates the actual
     * download of the file.
     */
    public showSpinner(response: FileDownloadResponse): boolean {

        return this.isDownloadInitiated(response) ||
            this.isDownloadInProgress(response) ||
            // Include COMPLETE here as there is a delay between when the "complete" status is received
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

        Observable
            .interval(delay)
            .take(1)
            .subscribe(fn);
    }

    /**
     * Request file download status for the specified URL.
     *
     * @param {string} fileUrl
     */
    private requestFileDownload(fileUrl: string) {

        this.downloadService.requestFileDownload(fileUrl)
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

    /**
     * Lifecycle hooks
     */

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up initial component state.
     */
    public ngOnInit(): void {

        this.fileName = this.file.fileName;
        this.fileUrl = this.file.url;

        // Kill download subject on destroy of component
        this.downloadResponse$.takeUntil(this.ngDestroy$);
    }
}
