/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying external resources associated with a project. 
 */

// Core dependencies
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { FetchIntegrationsByProjectIdRequestAction } from "../_ngrx/integration/fetch-integrations-by-project-id-request.action";
import { selectProjectIntegrations } from "../_ngrx/integration/integration.selectors";
import { ProjectExternalResourcesState } from "./project-external-resources.state";

@Component({
    selector: "project-external-resources",
    templateUrl: "./project-external-resources.component.html",
    styleUrls: ["./project-external-resources.component.scss"]
})
export class ProjectExternalResourcesComponent {

    // Template variables
    public state$: Observable<ProjectExternalResourcesState>;

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     */
    public constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) {
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
            select(selectProjectIntegrations, {projectId: projectId})
        );

        this.state$ = combineLatest(
            integrations$
        )
            .pipe(
                map(([integrations]) => {

                    return {
                        integrations: integrations,
                        integratedWithTertiaryPortals: integrations.length > 0,
                    };
                })
            );
    }
}
