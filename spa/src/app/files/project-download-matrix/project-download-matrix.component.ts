/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project contributor and DCP-generated matrices downloads for v2 environments.
 */

// Core dependencies
import { Component, Inject, Input } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { ProjectMatrixDownloadEvent } from "../project-matrix/project-matrix-download.event";
import { ProjectMatrixType } from "../project-matrix/project-matrix-type.model";
import { AppState } from "../../_ngrx/app.state";
import { DownloadProjectMatrixAction } from "../_ngrx/matrix/download-project-matrix.action";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-download-matrix",
    templateUrl: "./project-download-matrix.component.html",
    styleUrls: ["./project-download-matrix.component.scss"]
})
export class ProjectDownloadMatrixComponent {
    
    // Template variables
    public portalUrl: string;
    public projectMatrixType = ProjectMatrixType; // enum values are passed into child components

    // Inputs
    @Input() project: Project;

    /**
     * @param {ConfigService} configService
     */
    constructor(private configService: ConfigService,
                private store: Store<AppState>,
                @Inject("Window") private window: Window) {

        this.portalUrl = this.configService.getPortalUrl();
    }

    /**
     * Track download of project matrix file.
     *
     * @param {ProjectMatrixDownloadEvent} event
     */
    public onProjectMatrixFileDownloaded(event: ProjectMatrixDownloadEvent) {

        const projectUrl = window.location.href;
        this.store.dispatch(
            new DownloadProjectMatrixAction(this.project, projectUrl, event.projectMatrixType, event.fileName, event.url));
    }
}
