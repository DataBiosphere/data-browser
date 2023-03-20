/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying download and copy options for a file that may or may not exist (e.g. ingest spreadsheet).
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { BehaviorSubject, of, Subject } from "rxjs";
import { select, Store } from "@ngrx/store";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { AppState } from "../../_ngrx/app.state";

// App dependencies
import { ProjectManifestSpreadsheetStatus } from "./project-manifest-spreadsheet-status.model";
import { FileLocationRequestEvent } from "../file-location/file-location-request.event";
import { ProjectManifestSpreadsheet } from "./project-manifest-spreadsheet.model";
import { FetchProjectFullManifestExistsRequestAction } from "../_ngrx/project/fetch-project-full-manifest-exists-request.action";
import { selectProjectManifestSpreadsheet } from "../_ngrx/project/project.selectors";
import { FetchFileFileLocationRequestAction } from "../_ngrx/file/fetch-file-file-location-request.action";
import { ProjectManifestSpreadsheetComponentState } from "./project-manifest-spreadsheet.component.state";
import { selectFileFileLocationByFileUrl } from "../_ngrx/file/file.selectors";
import { FileLocation } from "../file-location/file-location.model";
import { FetchProjectFullManifestRequestAction } from "../_ngrx/project/fetch-project-full-manifest-request.action";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-manifest-spreadsheet",
    templateUrl: "./project-manifest-spreadsheet.component.html",
    styleUrls: ["./project-manifest-spreadsheet.component.scss"],
})
export class ProjectManifestSpreadsheetComponent {
    // Template variables
    public fileDownloadCheckStatus = ProjectManifestSpreadsheetStatus; // Allow access to enum values in template
    public viewState$ =
        new BehaviorSubject<ProjectManifestSpreadsheetComponentState>({
            status: ProjectManifestSpreadsheetStatus.IN_PROGRESS, // Default to in progress as check is kicked off on init
        });

    // Inputs
    @Input() project: Project;

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

    /**
     * Initiate request for file location of specified file.
     */
    public onSpreadsheetLocationRequested(
        requestEvent: FileLocationRequestEvent,
        fileFormat: string
    ) {
        const { fileName, fileUrl, trigger } = requestEvent;
        const requestAction = new FetchFileFileLocationRequestAction(
            fileUrl,
            fileName,
            fileFormat
        );
        this.store.dispatch(requestAction);

        const trackingAction = new FetchProjectFullManifestRequestAction(
            this.project,
            fileUrl,
            fileName,
            trigger
        );
        this.store.dispatch(trackingAction);
    }

    /**
     * Kill all subscriptions on component destroy.
     */
    public ngOnDestroy() {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Determine if file is available for download and if so, show download link.
     */
    public ngOnInit() {
        // Dispatch action to check if file exists.
        this.store.dispatch(new FetchProjectFullManifestExistsRequestAction());

        // Subscribe to manifest spreadsheet and corresponding file location, and update view state accordingly.
        this.store
            .pipe(
                select(selectProjectManifestSpreadsheet(this.project.entryId)),
                switchMap((projectManifestSpreadsheet) => {
                    if (
                        !projectManifestSpreadsheet ||
                        !projectManifestSpreadsheet.exists
                    ) {
                        return of({ projectManifestSpreadsheet });
                    }

                    // Spreadsheet exists, grab the file location for it.
                    if (projectManifestSpreadsheet.exists) {
                        return this.store.pipe(
                            select(
                                selectFileFileLocationByFileUrl(
                                    projectManifestSpreadsheet.fileUrl
                                )
                            ),
                            map((fileLocation) => {
                                return {
                                    projectManifestSpreadsheet,
                                    fileLocation,
                                };
                            })
                        );
                    }
                }),
                takeUntil(this.ngDestroy$)
            )
            .subscribe(
                (nextState: {
                    projectManifestSpreadsheet?: ProjectManifestSpreadsheet;
                    fileLocation?: FileLocation;
                }) => {
                    if (!nextState.projectManifestSpreadsheet) {
                        return;
                    }
                    this.viewState$.next({
                        fileLocation: nextState.fileLocation,
                        projectManifestSpreadsheet:
                            nextState.projectManifestSpreadsheet,
                        status: nextState.projectManifestSpreadsheet.status,
                    });
                }
            );
    }
}
