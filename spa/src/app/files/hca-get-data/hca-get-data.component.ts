/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying HCA get data.
 */

// Core dependencies
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
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
import { HCAGetDataState } from "./hca-get-data.state";

@Component({
    selector: "hca-get-data",
    templateUrl: "./hca-get-data.component.html",
    styleUrls: ["./hca-get-data.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("fadeIn", [
            transition(":enter", [
                style({opacity: 0}),
                animate("750ms ease-out", style({opacity: 1}))
            ])
        ])
    ]
})

export class HCAGetDataComponent implements OnInit {

    // Locals
    private ngDestroy$ = new Subject();

    // Template variables
    private state$: Observable<HCAGetDataState>;
    private viewState = DownloadViewState.NONE;

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

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.GENUS_SPECIES);
    }

    /**
     * Returns the effective terms for the library construction approach facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedLibraryConstructionApproaches(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.LIBRARY_CONSTRUCTION_APPROACH);
    }

    /**
     * Returns the effective terms for the paired end facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedPairedEnds(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.PAIRED_END);
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
     * Returns true if whether matrix is supported or not, has been determined.
     *
     * @param {boolean} supported
     * @returns {boolean}
     */
    private isMatrixSupportedLoaded(supported: boolean): boolean {

        return (supported === true || supported === false);
    }

    /**
     * Returns the effective terms for the specified facet
     *
     * @param {FileFacet[]} fileFacets
     * @param {string} facetName
     * @returns {Term[]}
     */
    private listSelectedTermsOfFacet(fileFacets: FileFacet[], facetName: string): Term[] {

        if ( fileFacets.length ) {
            const facet = fileFacets.find(fileFacet => fileFacet.name === facetName);
            if ( !facet ) {
                return [];
            }
            return facet.getEffectiveTerms();
        }
        else {
            return [];
        }
    }

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
        const selectedEntity$ = this.store.pipe(select(selectSelectedEntity));

        // Get the list of facets to display
        const fileFacets$ = this.store.pipe(select(selectFileFacetsFileFacets));

        // Determine if Matrix files are included in the current files result set.
        this.store.dispatch(new FetchIsMatrixSupportedRequestAction());
        const matrixSupported$ = this.store.pipe(select(selectMatrixSupported));

        this.state$ = combineLatest(
            selectedEntity$,
            fileFacets$,
            matrixSupported$
        )
            .pipe(
                map(([selectedEntity, fileFacets, matrixSupported]) => {

                    return {
                        selectedEntity,
                        fileFacets,
                        matrixSupported,
                        matrixSupportedLoaded: this.isMatrixSupportedLoaded(matrixSupported)
                    };
                })
            );
    }
}
