/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectConfigConfig } from "../../config/_ngrx/config.selectors";
import { Config } from "../../config/config.model";
import { Deployment } from "../../config/deployment.model";
import {
    selectFileFacetsFileFacets,
    selectMatrixSupported,
    selectSelectedEntity
} from "../_ngrx/file.selectors";
import { ClearIsMatrixSupportedAction } from "../_ngrx/file-facet-list/clear-is-matrix-supported.action";
import { FetchIsMatrixSupportedRequestAction } from "../_ngrx/file-facet-list/fetch-is-matrix-supported-request.action";
import { EntitySelectAction } from "../_ngrx/table/table.actions";
import EntitySpec from "../shared/entity-spec";
import { FileFacet } from "../shared/file-facet.model";
import { DownloadViewState } from "./download-view-state.model";
import { FileFacetName } from "../shared/file-facet-name.model";
import { Term } from "../shared/term.model";

@Component({
    selector: "hca-get-data",
    templateUrl: "./hca-get-data.component.html",
    styleUrls: ["./hca-get-data.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HCAGetDataComponent implements OnInit {

    // Locals
    private ngDestroy$ = new Subject();

    // Template variables
    public config$: Observable<Config>;
    public fileFacets$: Observable<FileFacet[]>;
    public matrixSupported$: Observable<boolean>;
    public selectedEntity$: Observable<EntitySpec>;
    public viewState = DownloadViewState.NONE;

    /**
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    public constructor(private router: Router,
                       private store: Store<AppState>) {
    }

    /**
     * Public API
     */

    /**
     * Returns null value for EntitySpec, no need for an active tab.
     *
     * @returns {EntitySpec}
     */
    public getActiveTab(): EntitySpec {

        return {key: "", displayName: ""};
    }

    /**
     * Tab provides opportunity to return back to previously active table tab.
     * Display name to indicate back to table view or back to export data download overview page.
     *
     * @returns {EntitySpec[]}
     */
    public getDataTabs(selectedEntity: EntitySpec): EntitySpec[] {

        let displayName = this.viewState !== DownloadViewState.NONE ? "Export Data" : "Back";
        return [{key: selectedEntity.key, displayName: displayName}];
    }

    public getTitle(): string {

        let downloadTitle = this.viewState === DownloadViewState.MANIFEST ?
            "Request File Manifest" :
            this.viewState === DownloadViewState.TERRA ?
                "Export to Terra" :
                this.viewState === DownloadViewState.MATRIX ?
                    "Request Expression Matrix" :
                    null;
        return this.viewState !== DownloadViewState.NONE ? downloadTitle : "Export Data";
    }

    /**
     * Returns the effective terms for the genus species facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedGenusSpecies(fileFacets: FileFacet[]): Term[] {

        if ( fileFacets.length ) {
            return fileFacets.filter(fileFacet => fileFacet.name === FileFacetName.GENUS_SPECIES)[0].getEffectiveTerms();
        }
        else {
            return [];
        }
    }

    /**
     * Returns the effective terms for the library construction approach facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedLibraryConstructionApproaches(fileFacets: FileFacet[]): Term[] {

        if ( fileFacets.length ) {
            return fileFacets.filter(fileFacet => fileFacet.name === FileFacetName.LIBRARY_CONSTRUCTION_APPROACH)[0].getEffectiveTerms();
        }
        else {
            return [];
        }
    }

    /**
     * Returns true if export to Terra functionality is enabled. Currently true for dev and ux-dev.
     *
     * @param {Config} config
     * @returns {boolean}
     */
    public isTerraEnabled(config: Config): boolean {

        const deployment = config.deployment;
        return deployment === Deployment.LOCAL ||
            deployment === Deployment.DEVELOP ||
            deployment === Deployment.UX_DEV;
    }

    /**
     * Sets a string value to indicate which download has been selected, and is in progress.
     *
     * @param {string} download
     */
    public onDownloadSelected(download: string) {

        this.viewState = DownloadViewState[download];
    }

    /**
     * Handle click on tab.
     * If current page is a download page, view is changed back to download overview page.
     * Otherwise, selected entity in state is updated and return user back to table.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        if ( this.viewState !== DownloadViewState.NONE ) {
            this.viewState = DownloadViewState.NONE;
        }
        else {
            this.store.dispatch(new EntitySelectAction(tab.key));
            this.router.navigate(["/" + tab.key]);
        }
    }

    /**
     * Life cycle hooks
     */

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearIsMatrixSupportedAction());
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Update state.
     */
    public ngOnInit() {

        // Determine the current selected tab (from table)
        this.selectedEntity$ = this.store.pipe(select(selectSelectedEntity));

        // Get the list of facets to display
        this.fileFacets$ = this.store.pipe(select(selectFileFacetsFileFacets));

        // Determine if Matrix files are included in the current files result set.
        this.store.dispatch(new FetchIsMatrixSupportedRequestAction());
        this.matrixSupported$ = this.store.pipe(select(selectMatrixSupported));

        this.config$ = this.store.pipe(
            select(selectConfigConfig),
            takeUntil(this.ngDestroy$)
        );
    }
}
