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
    @Input() isMatrix: boolean;
    @Input() projectId: string;
    @Input() projectTitle: string;
    @Input() projectURLs: ProjectMatrixUrls;

    // Output
    @Output() onProjectDataMatrixOpen = new EventEmitter<boolean>();

    // Template variables
    imgSrc = this.isDeviceHandheld() ? "assets/images/icon/hca-download-black.png" : "assets/images/icon/hca-download-primary.png";
    isProjectDownloadActive = false;

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
    public onDownloadMetadata(projectId: string): string {

        const metaURL = this.configService.getProjectMetaURL();
        return `${metaURL}/projects/${this.projectId}.tsv`;
    }

    /**
     * Matrix download for the project is requested.
     * @param {string} projectId
     */
    public onDownloadMatrix(projectId: string) {

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
}
