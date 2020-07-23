/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for determining if project ID has been deprecated and if so, displays the deprecated component.
 * If project ID is valid, display the project detail component.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectProjectById } from "../_ngrx/project-edits/project-edits.selectors";
import { ProjectGuardComponentState } from "./project-guard.component.state";
import { ProjectStatus } from "./project-status.model";

@Component({
    selector: "project-guard",
    templateUrl: "./project-guard.component.html",
    styleUrls: ["./project-guard.component.scss"]
})
export class ProjectGuardComponent implements OnInit {

    // Locals
    private PROJECT_IDS_BY_DEPRECATED_ID = new Map<string, string>([
        ["29f53b7e-071b-44b5-998a-0ae70d0229a4", "091cf39b-01bc-42e5-9437-f419a66c8a45"] // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/865
    ]);
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
     */
    constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {}

    /**
     * Return the view mode for the project, depending on its current status.
     * 
     * @param {string} projectId
     * @returns {string}
     */
    public getProjectViewMode(projectId, withdrawn): string {

        if ( this.isProjectDeprecated(projectId) ) {
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
     * Returns true the updated project ID for the specified deprecated project ID.
     *
     * @param {string} deprecatedProjectId
     * @returns {string}
     */
    public getUpdatedProjectId(deprecatedProjectId: string): string {

        return this.PROJECT_IDS_BY_DEPRECATED_ID.get(deprecatedProjectId);
    }

    /**
     * Returns true if project has been deprecated and there is a new version of the project.
     *
     * @param {string} projectIdToCheck
     * @returns {boolean}
     */
    public isProjectDeprecated(projectIdToCheck: string): boolean {

        return this.PROJECT_IDS_BY_DEPRECATED_ID.has(projectIdToCheck);
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

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.snapshot.paramMap.get("id");
        this.store.pipe(
            select(selectProjectById, {id: projectId}),
            takeUntil(this.ngDestroy$),
            take(1)
        ).subscribe(project => {
            this.state$.next({
                loaded: true,
                projectId,
                redirectUrl: project ? project.redirectUrl : null,
                withdrawn: project && project.withdrawn
            });
        })
    }
}
