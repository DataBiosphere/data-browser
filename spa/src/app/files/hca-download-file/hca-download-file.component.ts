/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component for displaying file download options and handling the corresponding functionality that requests the file
 * download URL.
 */

// Core dependencies
import { Component, EventEmitter, Input, OnDestroy, Output } from "@angular/core";
import "rxjs/add/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

// App dependencies
import { DownloadService } from "../shared/download.service";
import { FileDownloadStatus } from "../shared/file-download-status.model";

@Component({
    selector: "hca-download-file",
    templateUrl: "./hca-download-file.component.html",
    styleUrls: ["./hca-download-file.component.scss"]
})
export class HCADownloadFileComponent implements OnDestroy {

    // Locals
    private ngDestroy$ = new Subject();

    // Template variables
    downloadStatus$ = new BehaviorSubject<FileDownloadStatus>(FileDownloadStatus.NOT_STARTED);

    // Inputs
    @Input() fileName: string;
    @Input() fileUrl: string;
    @Output() fileUrlGenerated = new EventEmitter<string>();

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
     * @param {FileDownloadStatus} status
     * @returns {boolean}
     */
    public isDownloadComplete(status: FileDownloadStatus): boolean {

        return status === FileDownloadStatus.COMPLETE;
    }

    /**
     * Returns true if download has failed.
     *
     * @param {FileDownloadStatus} status
     * @returns {boolean}
     */
    public isDownloadFailed(status: FileDownloadStatus): boolean {

        return status === FileDownloadStatus.FAILED;
    }

    /**
     * Returns true if download has not yet been initiated.
     *
     * @param {FileDownloadStatus} status
     * @returns {boolean}
     */
    public isDownloadNotStarted(status: FileDownloadStatus): boolean {

        return status === FileDownloadStatus.NOT_STARTED;
    }

    /**
     * Returns true if download has started.
     *
     * @param {FileDownloadStatus} status
     * @returns {boolean}
     */
    public isDownloadInProgress(status: FileDownloadStatus): boolean {

        return status === FileDownloadStatus.IN_PROGRESS;
    }

    /**
     * Return observable of download status, for binding to in template.
     *
     * @returns {Observable<FileDownloadStatus>}
     */
    public observeFileDownloadStatus(): Observable<FileDownloadStatus> {

        return this.downloadStatus$.asObservable();
    }

    /**
     * Send request to download file.
     */
    public onRequestFile() {

        // Request file download
        this.downloadService.downloadFile(this.fileName, this.fileUrl)
            .takeUntil(this.ngDestroy$)
            .subscribe((status) => {
                this.downloadStatus$.next(status);
            });
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
}
