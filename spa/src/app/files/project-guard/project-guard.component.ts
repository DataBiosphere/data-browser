/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for determining if project ID has been deprecated and if so, displays the deprecated component.
 * If project has been withdrawn, withdrawn project should be displayed. If project ID is valid, display the project
 * detail component.
 */

// Core dependencies
import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { switchMap, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectProjectEditsById } from "../_ngrx/project-edits/project-edits.selectors";
import { ViewProjectDeprecatedAction } from "../_ngrx/table/view-project-deprecated.action";
import { ViewProjectWithdrawnAction } from "../_ngrx/table/view-project-withdrawn.action";
import { ProjectGuardComponentState } from "./project-guard.component.state";
import { ProjectStatus } from "./project-status.model";

@Component({
    selector: "project-guard",
    templateUrl: "./project-guard.component.html",
    styleUrls: ["./project-guard.component.scss"]
})
export class ProjectGuardComponent implements OnInit {

    // Locals
    private PROJECT_IDS_INGEST_IN_PROGRESS = [
        // "abe1a013-af7a-45ed-8c26-f3793c24a1f4" // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/944, https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/948
    ];
    private ngDestroy$ = new Subject();
    
    // Template variables
    public  state$ = new BehaviorSubject<ProjectGuardComponentState>({
        loaded: false
    });

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(private activatedRoute: ActivatedRoute,
                private store: Store<AppState>,
                @Inject("Window") private window: Window) {}

    /**
     * Return the view mode for the project, depending on its current status.
     * 
     * @param {string} projectId
     * @param {boolean} withdrawn
     * @param {boolean} deprecated
     * @returns {string}
     */
    public getProjectViewMode(projectId: string, withdrawn: boolean, deprecated: boolean): string {

        if ( deprecated ) {
            return ProjectStatus.DEPRECATED;
        }
        
        if ( this.isProjectIngestInProgress(projectId) ) {
            return ProjectStatus.INGEST_IN_PROGRESS;
        }
        
        if ( withdrawn ) {
            return ProjectStatus.WITHDRAWN;
        }

        return ProjectStatus.LIVE;
    }

    /**
     * Returns true if project ingest is currently in progress.
     *
     * @param {string} projectIdToCheck
     * @returns {boolean}
     */
    public isProjectIngestInProgress(projectIdToCheck: string): boolean {

        return this.PROJECT_IDS_INGEST_IN_PROGRESS.indexOf(projectIdToCheck) >= 0;
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }
    
    /**
     * Grab project from store.
     */
    ngOnInit() {

        // Add selected project edits to state - grab the project ID from the URL.
        this.activatedRoute.params.pipe(
            switchMap(params =>
                this.store.pipe(select(selectProjectEditsById, {id: params.id}), take(1))),
            takeUntil(this.ngDestroy$)
        ).subscribe(projectEdits => {
            
            // Track hits to deprecated project
            const projectId = projectEdits.entryId;
            const deprecated = projectEdits.deprecated;
            if ( deprecated ) {
                const action =
                    new ViewProjectDeprecatedAction(projectId, projectEdits.projectShortname, this.window.location.href);
                this.store.dispatch(action);
            }
            
            // Track hits to withdrawn project
            const withdrawn = projectEdits.withdrawn;
            if ( withdrawn ) {
                const action =
                    new ViewProjectWithdrawnAction(
                        projectId,
                        projectEdits.projectShortname,
                        this.window.location.href,
                        projectEdits.redirectUrl);
                this.store.dispatch(action);
            }

            this.state$.next({
                deprecated,
                loaded: true,
                projectId,
                redirectUrl: projectEdits.redirectUrl,
                supersededBy: projectEdits.supersededBy,
                withdrawn
            });
        });
    }
}
