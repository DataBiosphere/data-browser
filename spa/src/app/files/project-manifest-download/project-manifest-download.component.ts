/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying and downloading project manifests. Contains description of download, and the manifest
 * download, for the given project.
 */

// Core dependencies
import { Component, Inject, Input, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { FileLocationRequestEvent } from "../file-location/file-location-request.event";
import { AppState } from "../../_ngrx/app.state";
import { ClearProjectManifestFileLocationAction } from "../_ngrx/project/clear-project-manifest-file-location.action";
import { FetchProjectManifestFileLocationRequestAction } from "../_ngrx/project/fetch-project-manifest-file-location-request.action";
import { selectProjectManifestFileLocation } from "../_ngrx/project/project.selectors";
import { ProjectManifestDownloadComponentState } from "./project-manifest-download.component.state";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-manifest-download",
    templateUrl: "./project-manifest-download.component.html",
    styleUrls: ["./project-manifest-download.component.scss"]
})
export class ProjectManifestDownloadComponent implements OnDestroy {

    // Template variables
    public state$ = new BehaviorSubject<ProjectManifestDownloadComponentState>({});

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Inputs
    @Input("classFontName") classFontName: string;
    @Input() project: Project;

    /**
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    public constructor(private store: Store<AppState>, @Inject("Window") private window: Window) {}

    /**
     * Request the manifest file location for the specified project.
     *
     * @param {FileLocationRequestEvent} fileLocationRequestEvent
     */
    public onFileLocationRequested(fileLocationRequestEvent: FileLocationRequestEvent) {

        const projectUrl = window.location.href;
        const action =
            new FetchProjectManifestFileLocationRequestAction(this.project, projectUrl, fileLocationRequestEvent.trigger);
        this.store.dispatch(action);
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearProjectManifestFileLocationAction(this.project.entryId));

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Determine the current status of the file location request, if any.
     */
    public ngOnInit() {

        this.store
            .pipe(
                select(selectProjectManifestFileLocation(this.project.entryId)),
                takeUntil(this.ngDestroy$)
            )
            .subscribe(fileLocation => this.state$.next({fileLocation}));
    }
}
