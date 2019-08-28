/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project data downloads.
 */

// Core dependencies
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";

@Component({
    selector: "project-downloads",
    templateUrl: "./project-downloads.component.html",
    styleUrls: ["./project-downloads.component.scss"]
})
export class ProjectDownloadsComponent {

    // Inputs
    @Input() matrixAvailable: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Output
    @Output() preparedMatrixDownloadsOpened = new EventEmitter<boolean>();
    @Output() preparedMatrixDownloadsPositionBelowTable = new EventEmitter<number>();

    // View child/ren
    @ViewChild("download") downloadEl: ElementRef;

    // Template variables
    public preparedMatrixDownloadsOpen = false;
    public preparedMatrixDownloadsTop;

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {ElementRef} elementRef
     * @param {Store<AppStore>} store
     */
    public constructor(
        private deviceService: DeviceDetectorService, private elementRef: ElementRef, private store: Store<AppState>) {}

    /**
     * Returns true if device is either mobile or tablet.
     * @returns {boolean}
     */
    public isDeviceHandheld(): boolean {

        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();

        return (isMobile || isTablet);
    }

    /**
     * Display the prepared matrix downloads card.
     * 
     * @param {MouseEvent} event
     */
    public onShowPreparedMatrixDownloadsClicked(event: MouseEvent) {

        if ( !this.preparedMatrixDownloadsOpen ) {
            event.stopPropagation();
        }

        if ( this.isDeviceHandheld() || !this.matrixAvailable ) {
            return false; // do nothing
        }

        this.preparedMatrixDownloadsOpen = true;
    }

    /**
     * Prepared matrix download card for the selected project is closed.
     * 
     * @param {boolean} opened
     */
    public onPreparedMatrixDownloadsOpened(opened: boolean) {

        this.preparedMatrixDownloadsOpen = opened;
        this.preparedMatrixDownloadsOpened.emit(this.preparedMatrixDownloadsOpen);
    }

    /**
     * Provides a calculated table margin, if required, determined by the vertical positioning
     * of <project-prepared-matrix-downloads>.
     *
     * @param event
     */
    public onPreparedMatrixDownloadsPositionBelowTable(event) {

        this.preparedMatrixDownloadsPositionBelowTable.emit(event);
    }

    /**
     * Provides vertical positioning for <project-prepared-matrix-downloads>.
     *
     * @param {string} top
     */
    public onPreparedMatrixDownloadsTop(top: string) {

        this.preparedMatrixDownloadsTop = top;
    }
}
