/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for handling project TSV download functionality and corresponding display.
 */

// Core dependencies
import { Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Observable, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { FetchProjectTSVUrlRequestAction } from "../_ngrx/project/fetch-project-tsv-url-request.action";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { selectProjectTSVUrlResponseByProjectId } from "../_ngrx/project/project.selectors";
import { ProjectDownloadTSVState } from "./project-download-tsv.state";
import { ProjectTSVUrlRequestStatus } from "../project/project-tsv-url-request-status.model";
import { ProjectTSVUrlResponse } from "../project/project-tsv-url-response.model";
import { ClearProjectTSVUrlAction } from "../_ngrx/project/clear-project-tsv-url.action";

@Component({
    selector: "project-download-tsv",
    templateUrl: "./project-download-tsv.component.html",
    styleUrls: ["./project-download-tsv.component.scss"]
})
export class ProjectDownloadTSVComponent implements OnDestroy {

    // Inputs
    @Input() projectId: string;
    @Input() projectTitle: string;

    // View child/ren
    @ViewChild("download") downloadEl: ElementRef;

    // Template variables
    public state$: Observable<ProjectDownloadTSVState>;

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {ElementRef} elementRef
     * @param {Store<AppState>} store
     */
    public constructor(
        private deviceService: DeviceDetectorService, private elementRef: ElementRef, private store: Store<AppState>) {
    }

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

        this.store.dispatch(new FetchProjectTSVUrlRequestAction(this.projectId, this.projectTitle));
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
     * @returns {ProjectTSVUrlResponse}
     */
    private buildNotStartedResponse(): ProjectDownloadTSVState {

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
     * @returns {ProjectTsvDownloadState}
     */
    private parseStateFromResponse(response: ProjectTSVUrlResponse): ProjectDownloadTSVState {

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
            select(selectProjectTSVUrlResponseByProjectId, {projectId: this.projectId}),
            takeUntil(this.ngDestroy$),
            map((response: ProjectTSVUrlResponse) => {

                if ( !response ) {
                    return this.buildNotStartedResponse();
                }
                return this.parseStateFromResponse(response);
            })
        );

        // Check if we can trigger actual file download - this is true if TSV URL request is completed.
        // TODO required for HCATableProjectsComponent spec "should set up sort functionality on init"
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
