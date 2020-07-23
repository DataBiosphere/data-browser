/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying analysis portals associated with a project.
 */

// Core dependencies
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { FetchIntegrationsByProjectIdRequestAction } from "../_ngrx/integration/fetch-integrations-by-project-id-request.action";
import { selectProjectIntegrations } from "../_ngrx/integration/integration.selectors";
import { ProjectAnalysisPortalsState } from "./project-analysis-portals.state";

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
     */
    public constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
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

        // Request and grab the integrations for the current project
        this.store.dispatch(new FetchIntegrationsByProjectIdRequestAction(projectId));
        const integrations$ = this.store.pipe(
            select(selectProjectIntegrations, {projectId: projectId}),
            filter(integrations => !!integrations)
        ).subscribe((integrations) => {

            this.state$.next({
                loaded: true,
                integrations: integrations,
                integratedWithTertiaryPortals: integrations.length > 0
            });
        });
    }
}
