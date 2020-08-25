/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying analysis portals associated with a project.
 */

// Core dependencies
import { Component, Inject, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchIntegrationsByProjectIdRequestAction } from "../_ngrx/integration/fetch-integrations-by-project-id-request.action";
import { selectProjectIntegrations } from "../_ngrx/integration/integration.selectors";
import { ViewProjectIntegrationAction } from "../_ngrx/table/view-project-integration.action";
import { ProjectAnalysisPortalsState } from "./project-analysis-portals.state";
import { IntegrationViewedEvent } from "../project-integrations/project-integration-selected.event";
import { Project } from "../shared/project.model";

@Component({
    selector: "project-analysis-portals",
    templateUrl: "./project-analysis-portals.component.html",
    styleUrls: ["./project-analysis-portals.component.scss"]
})
export class ProjectAnalysisPortalsComponent implements OnDestroy {

    // Template variables
    private ngDestroy$ = new Subject();
    public state$ = new BehaviorSubject<ProjectAnalysisPortalsState>({
        loaded: false
    });

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    public constructor(private activatedRoute: ActivatedRoute,
                       private store: Store<AppState>,
                       @Inject("Window") private window: Window) {}

    /**
     * Dispatch event to trigger track view of integration. 
     * 
     * @param {IntegrationViewedEvent} event
     * @param {Project} project
     */
    onIntegrationViewed(event: IntegrationViewedEvent, project: Project) {

        const action = new ViewProjectIntegrationAction(
            event.portal,
            event.integration,
            project.entryId,
            project.projectShortname,
            this.window.location.href
        );
        this.store.dispatch(action);
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");

        // Request integrations for the current project
        this.store.dispatch(new FetchIntegrationsByProjectIdRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(
            select(selectSelectedProject),
            takeUntil(this.ngDestroy$),
            filter(project => !!project),
            take(1)
        );

        // Grab integrations for the selected project
        const integrations$ = this.store.pipe(
            select(selectProjectIntegrations, {projectId: projectId}),
            takeUntil(this.ngDestroy$),
            filter(integrations => !!integrations),
            take(1)
        );
        
        combineLatest(project$, integrations$)
            .pipe(
                takeUntil(this.ngDestroy$)
            )
            .subscribe(([project, integrations]) => {

                this.state$.next({
                    loaded: true,
                    integrations: integrations,
                    integratedWithTertiaryPortals: integrations.length > 0,
                    project
                });
            });
    }
}
