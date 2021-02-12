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
import { BehaviorSubject, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectReleaseByProjectId } from "../_ngrx/release/release.selectors";
import { ReleaseState } from "../releases/release.state";
import { ReleaseName } from "../releases/release-name.model";
import { ReleaseOrganView } from "../releases/release-organ-view.model";
import { ProjectDetailService } from "../project-detail/project-detail.service";
import { GAAction } from "../../shared/analytics/ga-action.model";
import { ReleaseService } from "../shared/release.service";
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "project-release",
    templateUrl: "./project-release.component.html",
    styleUrls: ["./project-release.component.scss"]
})
export class ProjectReleaseComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();
    
    // Template variables
    public columnsToDisplay = ["dataset", "organ", "developmentalStage", "technology", "releaseFiles", "visualize",
        "attributes", "actions"]; // attributes and actions are mobile-only columns, to group values into a single column
    public portalUrl: string;
    public state$ = new BehaviorSubject<ReleaseState>({
        loaded: false,
        releaseOrganViews: []
    });

    /**
     * @param {ProjectDetailService} projectAnalyticsService
     * @param {ConfigService} configService
     * @param {ReleaseService} releaseService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     */
    constructor(private projectAnalyticsService: ProjectDetailService,
                private configService: ConfigService,
                private releaseService: ReleaseService,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute) {
        this.portalUrl = this.configService.getPortalUrl();
    }

    /**
     * Set up tracking of tab.
     * 
     * @param {string} projectId
     */
    private initTracking(projectId: string) {
        
        // Grab the release project
        this.store.pipe(
            select(selectReleaseByProjectId, {name: ReleaseName.RELEASE_2020_MAR, projectId: projectId}),
            filter(release => !!release),
            take(1)
        ).subscribe((release) => {

            const project = release.projects[0];
            this.projectAnalyticsService.trackTabView(GAAction.VIEW_RELEASES, project.projectId, project.projectShortname);
        });
    }

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

        // Set up tracking of project tab
        this.initTracking(projectId);
    }
}
