/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying metadata associated with a project.
 */

// Core dependencies
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../_ngrx/app.state";
import { combineLatest, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

// App dependencies
import { selectSelectedProject } from "../_ngrx/file.selectors";
import { FetchProjectRequestAction } from "../_ngrx/table/table.actions";
import { ProjectMetadataState } from "./project-metadata.state";

@Component({
    selector: "project-metadata",
    templateUrl: "./project-metadata.component.html",
    styleUrls: ["./project-metadata.component.scss"]
})
export class ProjectMetadataComponent {

    // Template variables
    public state$: Observable<ProjectMetadataState>;

    /**
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {Store<AppState>} store
     */
    public constructor(private activatedRoute: ActivatedRoute,
                       private store: Store<AppState>) {
    }

    /**
     * Update state with selected project.
     */
    public ngOnInit() {

        // Add selected project to state - grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");
        this.store.dispatch(new FetchProjectRequestAction(projectId));

        // Grab reference to selected project
        const project$ = this.store.pipe(select(selectSelectedProject));

        this.state$ = combineLatest(
            project$,
        )
            .pipe(
                filter(([project]) => !!project),
                map(([project]) => {

                    return {
                        projectId: project.entryId,
                        projectTitle: project.projectTitle
                    };
                })
            );
    }
}
