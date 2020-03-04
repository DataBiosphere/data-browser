/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Release component for displaying project release details.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs/index";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectReleaseByProjectId } from "../_ngrx/release/release.selectors";
import { ReleaseState } from "../releases/release.state";
import { ReleaseName } from "../releases/release-name.model";
import { ReleaseOrganView } from "../releases/release-organ-view.model";
import { ReleaseService } from "../shared/release.service";

@Component({
    selector: "project-release",
    templateUrl: "./project-release.component.html",
    styleUrls: ["./project-release.component.scss"]
})
export class ProjectReleaseComponent implements OnDestroy, OnInit {

    // Locals
    public columnsToDisplay = ["dataset", "developmentalStage", "technology", "releaseFiles", "visualize"];
    private ngDestroy$ = new Subject();
    private state$ = new BehaviorSubject<ReleaseState>({
        loaded: false,
        releaseOrganViews: []
    });

    /**
     * @param {Store<AppState>} store
     */
    constructor(private activatedRoute: ActivatedRoute,
                private store: Store<AppState>,
                private releaseService: ReleaseService) {}

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab release data from store.
     */
    public ngOnInit() {

        // Grab the project ID from the URL.
        const projectId = this.activatedRoute.parent.snapshot.paramMap.get("id");

        this.store.pipe(
            select(selectReleaseByProjectId, {name: ReleaseName.RELEASE_2020_MAR, projectId: projectId}),
            filter(release => !!release),
            map((release) =>
                this.releaseService.buildReleaseView(release)),
            takeUntil(this.ngDestroy$)
        ).subscribe((releaseOrganViews: ReleaseOrganView[]) => {
            this.state$.next({
                loaded: true,
                releaseOrganViews
            });
        });
    }
}
