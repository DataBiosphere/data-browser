/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project prepared manifest downloads inside modal. The modal closes automatically
 * on NavigationStart event. The follow actions causes a redirect to the projects page (and therefore closes the modal):
 *
 * 1. Hitting escape
 * 2. Clicking the close icon
 * 3. Clicking the HCA logo
 */

// Core dependencies
import { Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NavigationStart, Router, RouterEvent } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { ModalClosedAction } from "../../modal/_ngrx/modal-closed.action";
import { ModalOpenedAction } from "../../modal/_ngrx/modal-opened.action";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectManifestDownloadModalComponentState } from "./project-manifest-download-modal.component.state";
import { EntityName } from "../shared/entity-name.model";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-manifest-download-modal",
    templateUrl: "./project-manifest-download-modal.component.html",
    styleUrls: ["./project-manifest-download-modal.component.scss"]
})
export class ProjectManifestDownloadModalComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();

    // Template variables
    public state$ = new BehaviorSubject<ProjectManifestDownloadModalComponentState>({
        loaded: false
    });

    /**
     * @param {Store<AppState>} store
     * @param {MatDialogRef<ProjectManifestDownloadModalComponent>} dialogRef
     * @param data
     * @param {Router} router
     */
    constructor(private store: Store<AppState>,
                private dialogRef: MatDialogRef<ProjectManifestDownloadModalComponent>,
                @Inject(MAT_DIALOG_DATA) private data: any,
                private router: Router) {

        this.store.dispatch(new ModalOpenedAction());
    }

    /**
     * Redirect to projects list - called from template on click of close icon, or on keyup of escape key. The resulting
     * navigation event causes the modal to close. See initCloseOnNavigation.
     */
    @HostListener("window:keyup.esc")
    public redirectToProjects(): void {

        this.router.navigate([EntityName.PROJECTS], {
            queryParamsHandling: "preserve"
        });
    }

    /**
     * Close the modal on any navigation event.
     */
    private initCloseOnNavigation() {

        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationStart),
            filter(() => !!this.dialogRef),
            takeUntil(this.ngDestroy$)
        ).subscribe(() => {
            this.store.dispatch(new ModalClosedAction());
            this.dialogRef.close();
        });
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the the selected project id and title. Also listen for navigation events, in which case we must
     * close the modal.
     */
    public ngOnInit(): void {

        this.initCloseOnNavigation();

        // Request project details so we can display the project title
        const projectId = this.data.projectId;
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab the current project and set up component state
        this.store
            .pipe(
                select(selectSelectedProject),
                takeUntil(this.ngDestroy$),
                filter(project => !!project && project.entryId === projectId),
                map((project) => {

                    return {
                        loaded: !!project,
                        project
                    }
                })
            )
            .subscribe((state) => {
                this.state$.next(state);
            });
    }
}
