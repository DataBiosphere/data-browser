/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project contributor and DCP-generated matrices downloads for v2 environments.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { Project } from "../shared/project.model";
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "project-download-matrix",
    templateUrl: "./project-download-matrix.component.html",
    styleUrls: ["./project-download-matrix.component.scss"]
})
export class ProjectDownloadMatrixComponent {
    
    // Template variables
    public portalUrl: string;

    // Inputs
    @Input() project: Project;

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService) {

        this.portalUrl = this.configService.getPortalUrl();
    }
}
