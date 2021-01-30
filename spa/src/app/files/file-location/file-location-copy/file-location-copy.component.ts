/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying copy to clipboard of file location when file location is polled from server.
 */

// Core dependencies
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges, ViewChild
} from "@angular/core";
import { MatTooltip } from "@angular/material/tooltip";
import { ClipboardService } from "ngx-clipboard";
import { BehaviorSubject, interval, Subject } from "rxjs";
import { delay, filter, take, takeUntil } from "rxjs/operators";

// App dependencies
import { FileLocation } from "../file-location.model";
import { FileLocationRequestEvent } from "../file-location-request.event";
import { FileLocationStatus } from "../file-location-status.model";
import { FileLocationTrigger } from "../file-location-trigger.model";

@Component({
    selector: "file-location-copy",
    templateUrl: "./file-location-copy.component.html",
    styleUrls: ["./file-location-copy.component.scss"]
})
export class FileLocationCopyComponent implements OnChanges, OnDestroy, OnInit {

    // Template variables
    public fileLocationStatus = FileLocationStatus; // Allow access to enum values in template
    public viewState$ =
        new BehaviorSubject<FileLocationStatus>(FileLocationStatus.NOT_STARTED);
    
    // Locals
    private ngDestroy$ = new Subject();

    // View child/ren
    private matTooltip: MatTooltip;
    @ViewChild("tooltip", { static: false }) set tooltip(tooltip: MatTooltip) {
        if ( tooltip ) {
            this.matTooltip = tooltip;
        }
    }

    // Inputs
    @Input() fileLocation: FileLocation;
    @Input() fileName: string;
    @Input() fileUrl: string;

    // Outputs
    @Output() fileLocationRequested = new EventEmitter<FileLocationRequestEvent>();

    /**
     * @param {ClipboardService} copyToClipboardService
     */
    constructor(private copyToClipboardService: ClipboardService) {}

    /**
     * Initiate file location request. Update component view state and let parent components know file download has
     * been initiated.
     * 
     * @param {string} fileUrl
     * @param {string} fileName
     */
    public onFileLocationRequested(fileUrl: string, fileName: string): void {

        this.viewState$.next(FileLocationStatus.REQUESTED);
        const requestEvent = new FileLocationRequestEvent(fileUrl, fileName, FileLocationTrigger.COPY);
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
     * Set up listener to trigger copy to clipboard once file location request is completed, and then kick off reset
     * of view state.
     */
    private initOnFileLocationRequestCompleted() {

        this.viewState$.pipe(
            takeUntil(this.ngDestroy$),
            filter(state => state === FileLocationStatus.COMPLETED),
            delay(0), // Allow view to update such that tooltip is visible
        ).subscribe(() => {
            this.matTooltip.show();
            this.copyToClipboardService.copy(this.fileLocation.fileUrl);
            this.resetViewState();
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
