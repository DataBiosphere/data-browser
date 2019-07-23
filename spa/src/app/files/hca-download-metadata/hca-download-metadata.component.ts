/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component for displaying metadata download.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { ConfigService } from "../../config/config.service";

// App dependencies

@Component({
    selector: "hca-download-metadata",
    templateUrl: "./hca-download-metadata.component.html",
    styleUrls: ["./hca-download-metadata.component.scss"]
})
export class HCADownloadMetadataComponent {

    // Inputs
    @Input() projectId: string;

    /**
     * @param {ConfigService} configService
     */
    public constructor(private configService: ConfigService) {}

    /**
     * Public API
     */

    /**
     * Return the URL to the meta TSV for the specified project.
     * @param {string} projectId
     * @returns {string}
     */
    public onDownloadMetadata(projectId: string): string {

        const metaURL = this.configService.getProjectMetaURL();
        return `${metaURL}/project-assets/project-metadata/${this.projectId}.tsv`;
    }
}
