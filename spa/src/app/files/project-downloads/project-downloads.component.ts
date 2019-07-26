/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project data downloads.
 */

// Core dependencies
import { Component, ElementRef, EventEmitter, Input, Output } from "@angular/core";
import { ConfigService } from "../../config/config.service";
import { DeviceDetectorService } from "ngx-device-detector";

// App dependencies
import { ProjectMatrixUrls } from "../shared/project-matrix-urls.model";

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
    @Output() projectDataMatrixPositionBelowTable = new EventEmitter<number>();

    // Template variables
    public preparedMatrixDownloadsOpen = false;
    public preparedMatrixDownloadsTop;

    /**
     * @param {ConfigService} configService
     * @param {DeviceDetectorService} deviceService
     * @param {ElementRef} elementRef
     */
    public constructor(private configService: ConfigService, private deviceService: DeviceDetectorService, private elementRef: ElementRef) {
    }

    /**
     * Public API
     */

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
     * Return the URL to the meta TSV for the specified project.
     *
     * @returns {string}
     */
    public onDownloadMetadata() {

        if ( this.isDeviceHandheld() ) {
            return; // do nothing
        }

        const metaURL = this.configService.getProjectMetaURL();
        window.location.href = `${metaURL}/project-assets/project-metadata/${this.projectId}.tsv`;
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
    public onProjectDataMatrixPositionBelowTable(event) {
        this.projectDataMatrixPositionBelowTable.emit(event);
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
