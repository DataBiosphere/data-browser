/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for get project data downloads.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";
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
    @Output() onProjectDataMatrixOpen = new EventEmitter<boolean>();

    // Template variables
    isProjectDownloadActive = false;
    top;

    /**
     * @param {ConfigService} configService
     */
    public constructor(private configService: ConfigService, private deviceService: DeviceDetectorService) {
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
     * @param {string} projectId
     * @returns {string}
     */
    public onDownloadMetadata(projectId: string) {

        if ( this.isDeviceHandheld() ) {
            return; // do nothing
        }

        const metaURL = this.configService.getProjectMetaURL();
        window.location.href = `${metaURL}/projects/${this.projectId}.tsv`; // TODO review Mim
    }

    /**
     * Matrix download for the project is requested.
     * @param {string} projectId
     */
    public onDownloadMatrix(projectId: string) {

        if ( this.isDeviceHandheld() || !this.matrixAvailable ) {
            return false; // do nothing
        }

        this.onProjectDataMatrixOpen.emit(true);
        this.isProjectDownloadActive = true;
    }

    /**
     * Matrix download for the project is cancelled.
     */
    public onProjectDataMatrixClose() {

        this.onProjectDataMatrixOpen.emit(false);
        this.isProjectDownloadActive = false;
    }

    /**
     * @param event
     */
    public onProjectDataMatrixPosition(event) {
        this.top = event;
    }
}
