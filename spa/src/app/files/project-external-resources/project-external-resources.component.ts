/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying external resources associated with a project. 
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { ProjectTab } from "../project-detail/project-tab.model";
import { GAAction } from "../../shared/analytics/ga-action.model";

@Component({
    selector: "project-external-resources",
    templateUrl: "./project-external-resources.component.html",
    styleUrls: ["./project-external-resources.component.scss"]
})
export class ProjectExternalResourcesComponent implements OnDestroy, OnInit {

    /**
     * @param {ProjectDetailService} projectDetailService
     * @param {Store<AppState>} store
     */
    constructor(private projectDetailService: ProjectDetailService, private store: Store<AppState>) {}

    /**
     * Set up tracking of tab. Set project meta tags.
     */
    private initTab() {

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        project$.pipe(
            take(1)
        ).subscribe((project) => {
            this.projectDetailService.addProjectMeta(project.projectTitle, ProjectTab.EXTERNAL_RESOURCES);
            this.projectDetailService.trackTabView(GAAction.VIEW_EXTERNAL_RESOURCES, project.entryId, project.projectShortname);
        });
    }

    /**
     * Clear project meta tags.
     */
    public ngOnDestroy() {

        // Set up tracking of project tab
        this.projectDetailService.removeProjectMeta();
    }

    /**
     * Set up component.
     */
    public ngOnInit() {

        // Set up tracking of project tab
        this.initTab();
    }
}
