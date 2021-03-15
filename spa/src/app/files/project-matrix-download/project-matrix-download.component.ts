/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project contributor and DCP-generated matrices downloads.
 */

// Core dependencies
import { Component, Inject, Input, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { FileLocation } from "../file-location/file-location.model";
import { FileLocationRequestEvent } from "../file-location/file-location-request.event";
import { AppState } from "../../_ngrx/app.state";
import { FetchProjectMatrixFileLocationRequestAction } from "../_ngrx/project/fetch-project-matrix-file-location-request.action";
import { ClearProjectMatrixFileLocationsAction } from "../_ngrx/project/clear-project-matrix-file-locations.action";
import { ProjectMatrixType } from "../project-matrix/project-matrix-type.model";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-matrix-download",
    templateUrl: "./project-matrix-download.component.html",
    styleUrls: ["./project-matrix-download.component.scss"]
})
export class ProjectMatrixDownloadComponent implements OnDestroy {
    
    // Template variables
    public portalUrl: string;
    public projectMatrixType = ProjectMatrixType; // Allow access to enum values in template 

    // Inputs
    @Input() projectMatrixFileLocationsByFileUrl: Map<string, FileLocation>;
    @Input() project: Project;

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(private configService: ConfigService,
                private store: Store<AppState>,
                @Inject("Window") private window: Window) {

        this.portalUrl = this.configService.getPortalUrl();
    }

    /**
     * Track download of project matrix file.
     *
     * @param {FileLocationRequestEvent} event
     * @param {ProjectMatrixType} projectMatrixType
     */
    public onProjectMatrixFileLocationRequested(event: FileLocationRequestEvent,
                                                projectMatrixType: ProjectMatrixType) {

        const projectUrl = window.location.href;
        const action = new FetchProjectMatrixFileLocationRequestAction(
            this.project, projectUrl, projectMatrixType, event.fileUrl, event.fileName, event.trigger);
        this.store.dispatch(action);
    }

    /**
     * Clear project matrix file locations from store.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearProjectMatrixFileLocationsAction(this.project.entryId));
    }
}
