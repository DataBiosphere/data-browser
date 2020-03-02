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
import { ReleaseName } from "./release-name.model";
import { ReleaseState } from "./release.state";
import { ReleaseOrganView } from "./release-organ-view.model";
import { Release } from "./2020-march/release";
import { ReleaseProject } from "./2020-march/release-project";
import { ReleaseDatasetView } from "./release-dataset-view.model";
import { ReleaseDataset } from "./2020-march/release-dataset";


@Component({
    selector: "release",
    templateUrl: "./release.component.html",
    styleUrls: ["./release.component.scss"]
})
export class ReleaseComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject();
    private state$ = new BehaviorSubject<ReleaseState>({
        loaded: false,
        releaseOrganViews: []
    });

    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

    /**
     * Build view model of release. That is, project datasets grouped by organ.
     * 
     * @param {Release} release
     * @returns {ReleaseOrganView[]}
     */
    private buildReleaseView(release: Release): ReleaseOrganView[] {

        const releaseOrganViewsByOrgan = release.projects.reduce((accum, releaseProject: ReleaseProject) => {

            const entryId = releaseProject.entryId;
            releaseProject.datasets.forEach((releaseDataset: ReleaseDataset) => {

                const organ = releaseDataset.organ;
                const datasetView = Object.assign({
                    entryId,
                }, releaseDataset);
                
                if ( accum.has(organ) ) {

                    accum.get(organ).datasets.push(datasetView);
                }
                else {
                    accum.set(organ, {organ, datasets: [datasetView]});
                }
            });

            return accum;
        }, new Map<string, ReleaseOrganView>());
        
        return Array.from(releaseOrganViewsByOrgan.values());
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
            map(this.buildReleaseView),
            takeUntil(this.ngDestroy$)
        ).subscribe((releaseOrganViews: ReleaseOrganView[]) => {
            this.state$.next({
                loaded: true,
                releaseOrganViews
            });
        });
    }
}
