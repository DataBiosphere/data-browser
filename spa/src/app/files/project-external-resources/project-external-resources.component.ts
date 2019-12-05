/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying external resources associated with a project. 
 */

// Core dependencies
import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

// App dependencies
import { FetchIntegrationsByProjectIdRequestAction } from "../_ngrx/integration/fetch-integrations-by-project-id-request.action";
import { selectProjectIntegrations } from "../_ngrx/integration/integration.selectors";
import { ProjectExternalResourcesState } from "./project-external-resources.state";
import { Subject } from "rxjs/index";

@Component({
    selector: "project-external-resources",
    templateUrl: "./project-external-resources.component.html",
    styleUrls: ["./project-external-resources.component.scss"]
})
export class ProjectExternalResourcesComponent implements OnDestroy {

    // Template variables
    private ngDestroy$ = new Subject();
    public state$ = new BehaviorSubject<ProjectExternalResourcesState>({
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
                integratedWithTertiaryPortals: integrations.length > 0,
            });
        });
    }
}
