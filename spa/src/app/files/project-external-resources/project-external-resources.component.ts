/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying external resources associated with a project. 
 */

// Core dependencies
import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { ProjectAnalyticsService } from "../project/project-analytics.service";
import { GAAction } from "../../shared/analytics/ga-action.model";

@Component({
    selector: "project-external-resources",
    templateUrl: "./project-external-resources.component.html",
    styleUrls: ["./project-external-resources.component.scss"]
})
export class ProjectExternalResourcesComponent {

    /**
     * @param {ProjectAnalyticsService} projectAnalyticsService
     * @param {Store<AppState>} store
     */
    constructor(private projectAnalyticsService: ProjectAnalyticsService, private store: Store<AppState>) {}

    /**
     * Set up tracking of tab.
     */
    private initTracking() {

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        project$.pipe(
            take(1)
        ).subscribe((project) => {
            this.projectAnalyticsService.trackTabView(GAAction.VIEW_EXTERNAL_RESOURCES, project.entryId, project.projectShortname);
        });
    }

    /**
     * Set up component.
     */
    public ngOnInit() {

        // Set up tracking of project tab
        this.initTracking();
    }
}
