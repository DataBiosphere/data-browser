/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying the release file download.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { ReleaseFilesView } from "../release-files-view.model";

@Component({
    selector: "release-file-download",
    templateUrl: "./release-file-download.component.html",
    styleUrls: ["./release-file-download.component.scss"]
})
export class ReleaseFileDownloadComponent {

    // Inputs
    @Input() releaseFiles: ReleaseFilesView[];

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {}

    /**
     * Returns the full release file URL.
     * 
     * @param {string} url
     */
    public getReleaseFileUrl(url: string): string {

        return  `${this.configService.getProjectMetaURL()}/release-files/releases/2020-mar/${url}`;
    }
}
