/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared manifest downloads. Contains description of download, and the
 * manifest download, for the given project.
 */

// Core dependencies
import { Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs/index";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ClearProjectTSVUrlAction } from "../_ngrx/project/clear-project-tsv-url.action";
import { FetchProjectTSVUrlRequestAction } from "../_ngrx/project/fetch-project-tsv-url-request.action";
import { selectProjectTSVUrlsByProjectId } from "../_ngrx/project/project.selectors";
import { ProjectTSVUrlRequestStatus } from "../project/project-tsv-url-request-status.model";
import { ProjectTSVUrlResponse } from "../project/project-tsv-url-response.model";
import { ProjectDownloadManifestState } from "./project-download-manifest.state";
import { SearchTerm } from "../search/search-term.model";
import { FileManifestService } from "../shared/file-manifest.service";

@Component({
    selector: "project-download-manifest",
    templateUrl: "./project-download-manifest.component.html",
    styleUrls: ["./project-download-manifest.component.scss"]
})
export class ProjectDownloadManifestComponent implements OnDestroy {

    // Template variables
    public state$: Observable<ProjectDownloadManifestState>;

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Inputs
    @Input('classFontName') classFontName: string;
    @Input() projectId: string;
    @Input() projectTitle: string;

    // View child/ren
    @ViewChild("download" , { static: false }) downloadEl: ElementRef;

    /**
     * @param {FileManifestService} fileManifestService
     * @param {Store<AppState>} store
     */
    public constructor(private fileManifestService: FileManifestService, private store: Store<AppState>) {}

    /**
     * Track click on copy of manifest data link.
     *
     * @param {string} projectTitle
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(projectTitle: string, manifestUrl: string) {

        this.fileManifestService.trackCopyToClipboardProjectManifestLink(projectTitle, manifestUrl);
    }

    /**
     * Return the URL to the meta TSV for the specified project.
     *
     * @param {string} projectTitle
     * @returns {string}
     */
    public onDownloadMetadata(projectTitle: string) {

        this.fileManifestService.trackDownloadProjectManifest(projectTitle);
        this.store.dispatch(new FetchProjectTSVUrlRequestAction(this.projectId, this.projectTitle, this.ngDestroy$));
    }

    /**
     * Initiate file download.
     *
     * @param {string} url
     */
    private downloadFile(url: string) {

        const el = this.downloadEl.nativeElement;
        el.href = url;
        el.click();
    }

    /**
     * Build up "not started" state if there is currently no TSV URL response value in the store for this project.
     *
     * @returns {ProjectDownloadManifestState}
     */
    private buildNotStartedResponse(): ProjectDownloadManifestState {

        return {
            projectTSVUrlCompleted: false,
            projectTSVUrlFailed: false,
            projectTSVUrlInitiated: false,
            projectTSVUrlInProgress: false,
            projectTSVUrlNotStarted: true
        };
    }

    /**
     * Build up state to back component, from the specified response.
     *
     * @param {ProjectTSVUrlResponse} response
     * @returns {ProjectDownloadManifestState}
     */
    private parseStateFromResponse(response: ProjectTSVUrlResponse): ProjectDownloadManifestState {

        return {
            projectTSVUrlResponse: response,
            projectTSVUrlCompleted: response.status === ProjectTSVUrlRequestStatus.COMPLETED,
            projectTSVUrlFailed: response.status === ProjectTSVUrlRequestStatus.FAILED,
            projectTSVUrlInitiated: response.status === ProjectTSVUrlRequestStatus.INITIATED,
            projectTSVUrlInProgress: response.status === ProjectTSVUrlRequestStatus.IN_PROGRESS,
            projectTSVUrlNotStarted: response.status === ProjectTSVUrlRequestStatus.NOT_STARTED
        };
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearProjectTSVUrlAction(this.projectId));

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Determine the current status of the download request, if any.
     */
    public ngOnInit() {

        this.state$ = this.store.pipe(
            select(selectProjectTSVUrlsByProjectId, {projectId: this.projectId}),
            takeUntil(this.ngDestroy$),
            map((response: ProjectTSVUrlResponse) => {

                if ( !response ) {
                    return this.buildNotStartedResponse();
                }
                return this.parseStateFromResponse(response);
            })
        );

        // Check if we can trigger actual file download - this is true if TSV URL request is completed.
        if ( this.state$ ) {
            this.state$.pipe(
                filter(state => state.projectTSVUrlCompleted),
                take(1),
                takeUntil(this.ngDestroy$)
            ).subscribe(state => {
                this.downloadFile(state.projectTSVUrlResponse.fileUrl);
            });
        }
    }
}
