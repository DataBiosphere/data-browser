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
    selector: "hca-get-project-data",
    templateUrl: "./hca-get-project-data.component.html",
    styleUrls: ["./hca-get-project-data.component.scss"]
})
export class HCAGetProjectDataComponent {

    // Inputs
    @Input() matrixAvailable: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Output
    @Output() projectDataMatrixOpen = new EventEmitter<boolean>();
    @Output() projectDataMatrixPositionBelowTable = new EventEmitter<number>();

    // Template variables
    projectDownloadActive = false;
    cardTopPosition;

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
     * Matrix download for the project is requested.
     */
    public onDownloadMatrix() {

        if ( this.isDeviceHandheld() || !this.matrixAvailable ) {
            return false; // do nothing
        }

        this.projectDataMatrixOpen.emit(true);
        this.projectDownloadActive = true;
    }

    /**
     * Matrix download for the project is cancelled.
     */
    public onProjectDataMatrixClose() {

        this.projectDataMatrixOpen.emit(false);
        this.projectDownloadActive = false;
    }

    /**
     * Provides a calculated table margin, if required, determined by the vertical positioning
     * of <hca-get-project-matrix-data>.
     *
     * @param event
     */
    public onProjectDataMatrixPositionBelowTable(event) {
        this.projectDataMatrixPositionBelowTable.emit(event);
    }

    /**
     * Provides vertical positioning for <hca-get-project-matrix-data>.
     *
     * @param event
     */
    public onProjectDataMatrixPosition(event) {
        this.cardTopPosition = event;
    }
}
