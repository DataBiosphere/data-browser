/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying file download when file location must be polled from server.
 */

// Core dependencies
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { interval, BehaviorSubject, Subject } from "rxjs";
import { delay, filter, take, takeUntil } from "rxjs/operators";

// App dependencies
import { FileLocation } from "../file-location.model";
import { FileLocationRequestEvent } from "../file-location-request.event";
import { FileLocationStatus } from "../file-location-status.model";
import { FileLocationTrigger } from "../file-location-trigger.model";

@Component({
    selector: "file-location-download",
    templateUrl: "./file-location-download.component.html",
    styleUrls: ["./file-location-download.component.scss"]
})
export class FileLocationDownloadComponent implements OnChanges, OnDestroy, OnInit {
    
    // Template variables
    public fileLocationStatus = FileLocationStatus; // Allow access to enum values in template
    public viewState$ =
        new BehaviorSubject<FileLocationStatus>(FileLocationStatus.NOT_STARTED);

    // Locals
    private ngDestroy$ = new Subject();

    // View child/ren
    @ViewChild("download") downloadEl: ElementRef;

    // Inputs
    @Input() fileLocation: FileLocation;
    @Input() fileName: string;
    @Input() fileUrl: string;
    // True if view state is reset on completion of download, so download can be clicked agains
    @Input() repeatable: boolean = true;

    // Outputs
    @Output() fileLocationRequested = new EventEmitter<FileLocationRequestEvent>();

    /**
     * Initiate file location request. Update component view state and let parent components know file download has
     * been initiated.
     *
     * @param {string} fileUrl
     * @param {string} fileName
     */
    public onFileLocationRequested(fileUrl: string, fileName: string): void {

        this.viewState$.next(FileLocationStatus.REQUESTED);
        const requestEvent = new FileLocationRequestEvent(fileUrl, fileName, FileLocationTrigger.DOWNLOAD);
        this.fileLocationRequested.emit(requestEvent);
    }

    /**
     * Translates the specified file location into a corresponding view state.
     *
     * @param {FileLocationStatus} status
     * @returns {FileLocationStatus}
     */
    private getViewState(status: FileLocationStatus): FileLocationStatus {

        // File location request is considered in progress if in the INITIATED state.
        if ( status === FileLocationStatus.INITIATED ) {
            return FileLocationStatus.IN_PROGRESS;
        }

        return status;
    }

    /**
     * Set up listener to trigger download once file location request is completed, and then kick off reset
     * of view state.
     */
    private initOnFileLocationRequestCompleted() {

        this.viewState$.pipe(
            takeUntil(this.ngDestroy$),
            filter(state => state === FileLocationStatus.COMPLETED),
            delay(0), // Allow view to update such that download is visible
        ).subscribe(() => {

            // Trigger download of file by browser
            this.downloadFile(this.fileLocation.fileUrl);

            // Reset view state
            if ( this.repeatable ) {
                this.resetViewState();
            }
        });
    }

    /**
     * Set up reset of component state after a two second delay.
     */
    private resetViewState() {

        interval(2000).pipe(
            takeUntil(this.ngDestroy$),
            take(1)
        ).subscribe(() => {
            this.viewState$.next(FileLocationStatus.NOT_STARTED)
        });
    }

    /**
     * File location request is completed - initiate file download.
     *
     * @param {string} url
     */
    private downloadFile(url: string): void {

        const el = this.downloadEl.nativeElement;
        el.href = url;
        el.click();
    }

    /**
     * Update view state on changes in file location status. Ignore changes in file location if the current view state
     * is either NOT_STARTED or COMPLETED as this indicates the updates are being triggered from another component. 
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {

        this.viewState$.pipe(
            takeUntil(this.ngDestroy$),
            take(1),
            filter(state => state !== FileLocationStatus.NOT_STARTED && state !== FileLocationStatus.COMPLETED)
        ).subscribe(() => {
            const currentStatus = changes.fileLocation?.currentValue?.status;
            if ( currentStatus ) {
                this.viewState$.next(this.getViewState(currentStatus));
            }
        });
    }

    /**
     * Kill subscriptions.
     */
    ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Trigger copy to clipboard if file location request completes.
     */
    ngOnInit() {

        this.initOnFileLocationRequestCompleted();
    }
}
