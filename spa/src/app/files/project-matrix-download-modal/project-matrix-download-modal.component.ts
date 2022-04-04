/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared project matrices downloads inside modal. The modal closes automatically
 * on NavigationStart event. The following actions causes a redirect to the projects page (and therefore closes the modal):
 *
 * 1. Hitting escape
 * 2. Clicking the close icon
 * 3. Clicking the HCA logo
 */

// Core dependencies
import {
    Component,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NavigationStart, Router, RouterEvent } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { selectIsError } from "../../http/_ngrx/http.selectors";
import { AppState } from "../../_ngrx/app.state";
import { ModalOpenedAction } from "../../modal/_ngrx/modal-opened.action";
import { ModalClosedAction } from "../../modal/_ngrx/modal-closed.action";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import {
    selectProjectMatrixArchivePreviewsByProjectId,
    selectProjectMatrixFileLocationsByProjectId,
} from "../_ngrx/project/project.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ClearSelectedProjectAction } from "../_ngrx/table/clear-selected-project.action";
import { ProjectMatrixDownloadModalState } from "./project-matrix-download-modal.state";
import { EntityName } from "../shared/entity-name.model";
import { TitleService } from "../title/title.service";

@Component({
    selector: "project-matrix-download-modal",
    templateUrl: "./project-matrix-download-modal.component.html",
    styleUrls: ["./project-matrix-download-modal.component.scss"],
})
export class ProjectMatrixDownloadModalComponent implements OnDestroy, OnInit {
    // Locals
    private ngDestroy$ = new Subject();

    // Template variables
    public state$ = new BehaviorSubject<ProjectMatrixDownloadModalState>({
        loaded: false,
    });

    /**
     * @param {Store<AppState>} store
     * @param {TitleService} titleService
     * @param {MatDialogRef<ProjectMatrixDownloadModalComponent>} dialogRef
     * @param data
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private titleService: TitleService,
        private dialogRef: MatDialogRef<ProjectMatrixDownloadModalComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private router: Router
    ) {}

    /**
     * Redirect to projects list - called from template on click of close icon, or on keyup of escape key. The resulting
     * navigation event causes the modal to close. See initCloseOnNavigation.
     */
    @HostListener("window:keyup.esc")
    public redirectToProjects(): void {
        this.router.navigate([EntityName.PROJECTS], {
            queryParamsHandling: "preserve",
        });
    }

    /**
     * Close the modal on any server or client-side error.
     */
    private initCloseOnError() {
        this.store
            .pipe(
                select(selectIsError),
                filter((error) => error),
                filter(() => !!this.dialogRef),
                takeUntil(this.ngDestroy$)
            )
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    /**
     * Close the modal on any navigation event.
     */
    private initCloseOnNavigation() {
        this.router.events
            .pipe(
                filter(
                    (event: RouterEvent) => event instanceof NavigationStart
                ),
                filter(() => !!this.dialogRef),
                takeUntil(this.ngDestroy$)
            )
            .subscribe(() => {
                this.dialogRef.close();
            });
    }

    /**
     * Kill subscriptions on destroy of component. Clear selected project.
     */
    public ngOnDestroy() {
        this.store.dispatch(new ModalClosedAction());
        this.store.dispatch(new ClearSelectedProjectAction());

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the prepared matrix URLs for the selected project. Also listen for navigation events, in which case we must
     * close the modal.
     */
    public ngOnInit(): void {
        this.initCloseOnError();
        this.initCloseOnNavigation();

        // Request project details so we can display the project title
        const projectId = this.data.projectId;
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab the selected project
        const selectedProject$ = this.store.pipe(
            select(selectSelectedProject),
            takeUntil(this.ngDestroy$)
        );

        // Get any resolved matrix file locations for the selected projects
        const projectMatrixFileLocationsByFileUrl$ = this.store.pipe(
            select(selectProjectMatrixFileLocationsByProjectId(projectId)),
            takeUntil(this.ngDestroy$)
        );

        // List archive previews for the selected project's matrices.
        const projectMatrixArchivePreviewsByMatrixId$ = this.store.pipe(
            select(selectProjectMatrixArchivePreviewsByProjectId(projectId))
        );

        // Check if there are any errors
        const error$ = this.store.pipe(
            select(selectIsError),
            takeUntil(this.ngDestroy$)
        );

        // Grab the project matrix URLs, if any, for the current set of projects as well as the current project.
        combineLatest([
            selectedProject$,
            projectMatrixArchivePreviewsByMatrixId$,
            projectMatrixFileLocationsByFileUrl$,
            error$,
        ])
            .pipe(
                takeUntil(this.ngDestroy$),
                filter(
                    ([project]) => !!project && project.entryId === projectId
                )
            )
            .subscribe(
                ([
                    project,
                    projectMatrixArchivePreviewsByMatrixId,
                    projectMatrixFileLocationsByFileUrl,
                    error,
                ]) => {
                    // Don't continue to show modal or project if there's been an error, let error handling occur.
                    if (error) {
                        return;
                    }

                    // No errors - show modal and update component state
                    this.store.dispatch(new ModalOpenedAction());
                    this.state$.next({
                        loaded: !!project,
                        project,
                        projectMatrixArchivePreviewsByMatrixId,
                        projectMatrixFileLocationsByFileUrl,
                    });

                    // Set document title to be project title.
                    this.titleService.setTitle(project.projectTitle);
                }
            );
    }
}
