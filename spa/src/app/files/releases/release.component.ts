/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Release component for displaying release details.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectReleaseByName } from "../_ngrx/release/release.selectors";
import EntitySpec from "../shared/entity-spec";
import { ReleaseService } from "../shared/release.service";
import { ReleaseState } from "./release.state";
import { ReleaseName } from "./release-name.model";
import { ReleaseOrganView } from "./release-organ-view.model";
import { ConfigService } from "../../config/config.service";

@Component({
    selector: "release",
    templateUrl: "./release.component.html",
    styleUrls: ["./release.component.scss"]
})
export class ReleaseComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    
    // Template variables
    public columnsToDisplay = ["projectTitle", "dataset", "organ", "developmentalStage", "technology", 
        "releaseFiles", "visualize", "attributes", "actions"]; // attributes and actions are mobile-only columns, to group values into a single column 
    public  portalUrl: string;
    public  state$ = new BehaviorSubject<ReleaseState>({
        loaded: false,
        releaseOrganViews: []
    });

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     * @param {ReleaseService} releaseService
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService,
                private releaseService: ReleaseService) {

        this.portalUrl = this.configService.getPortalUrl()

    }

    /**
     * Tab provides opportunity to return back to project table.
     *
     * @returns {EntitySpec[]}
     */
    public getReleaseTabs(): EntitySpec[] {

        return [];
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

        this.store.pipe(
            select(selectReleaseByName, {name: ReleaseName.RELEASE_2020_MAR}),
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
