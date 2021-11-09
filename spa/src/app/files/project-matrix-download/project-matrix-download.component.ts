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
import { FetchProjectMatrixArchivePreviewRequestAction } from "../_ngrx/project/fetch-project-matrix-archive-preview-request.action";
import { ClearProjectMatrixFileLocationsAction } from "../_ngrx/project/clear-project-matrix-file-locations.action";
import { FetchProjectMatrixFileLocationRequestAction } from "../_ngrx/project/fetch-project-matrix-file-location-request.action";
import { ArchivePreview } from "../project-matrix/archive-preview.model";
import { ArchivePreviewRequestEvent } from "../project-matrix/archive-preview-request.event";
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
    @Input() projectMatrixArchivePreviewsByMatrixId: Map<string, ArchivePreview>;
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
     * Returns true if the atlas for the current environment is HCA.
     * 
     * @returns {boolean}
     */
    public isSurveyVisible(): boolean {
        
        return this.configService.isAtlasHCA();
    }

    /**
     * Track request of archive matrix archive preview.
     *
     * @param {ArchivePreviewRequestEvent} archivePreviewRequest
     * @param {ProjectMatrixType} projectMatrixType
     */
    public onProjectMatrixArchivePreviewRequested(
        archivePreviewRequest: ArchivePreviewRequestEvent, projectMatrixType: ProjectMatrixType) {

        const action =
            new FetchProjectMatrixArchivePreviewRequestAction(
                this.project,
                archivePreviewRequest.matrixId,
                archivePreviewRequest.matrixVersion,
                projectMatrixType);
        this.store.dispatch(action);
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
