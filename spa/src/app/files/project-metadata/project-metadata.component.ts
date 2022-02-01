/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying metadata download options for a specific project.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
// App dependencies

import { AppState } from "../../_ngrx/app.state";
import { selectSelectedProject } from "../_ngrx/files.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectMetadataComponentState } from "./project-metadata.component.state";
import EntitySpec from "../shared/entity-spec";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { ProjectTab } from "../project-detail/project-tab.model";

@Component({
    selector: "project-metadata",
    templateUrl: "./project-metadata.component.html",
    styleUrls: ["./project-metadata.component.scss"]
})
export class ProjectMetadataComponent implements OnDestroy, OnInit {

    // Template variables
    public state$ = new BehaviorSubject<ProjectMetadataComponentState>({
        loaded: false
    });

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {ProjectDetailService} projectDetailService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    public constructor(private projectDetailService: ProjectDetailService,
                       private store: Store<AppState>,
                       private activatedRoute: ActivatedRoute,
                       private router: Router) {
    }

    /**
     * Return user to project overview
     */
    public getBackButtonTab(): EntitySpec[] {

        const key = "Project Overview";
        return [{
            key,
            displayName: key
        }];
    }

    /**
     * Handle click on back button.
     *
     * @param {string} projectId
     */
    public onTabSelected(projectId: string): void {

        this.router.navigate(["/projects", projectId], {
            queryParamsHandling: "preserve"
        });
    }

    /**
     * Clear project meta tags.
     */
    public ngOnDestroy() {

        // Remove project description meta
        this.projectDetailService.removeProjectMeta();

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        this.store
            .pipe(
                select(selectSelectedProject),
                takeUntil(this.ngDestroy$),
                filter((project) => !!project)
            )
            .subscribe(project => {

                this.state$.next({
                    loaded: true,
                    project
                });

                // Update description meta for this project
                this.projectDetailService.addProjectMeta(project.projectTitle, ProjectTab.PROJECT_METADATA);
            });
    }
}
