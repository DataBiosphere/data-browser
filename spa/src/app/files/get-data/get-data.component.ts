/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component controlling get data flows.
 */

// Core dependencies
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { GetDataViewState } from "./get-data-view-state.model";
import { Facet } from "../facet/facet.model";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { GetDataComponentState } from "./get-data.component.state";
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { BackToEntityAction } from "../_ngrx/entity/back-to-entity.action";
import { selectFilesFacets } from "../_ngrx/facet/facet.selectors";
import { FetchFilesFacetsRequestAction } from "../_ngrx/facet/fetch-files-facets-request.action";
import { selectFileSummary, selectSelectedEntitySpec } from "../_ngrx/files.selectors";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";
import EntitySpec from "../shared/entity-spec";
import { Term } from "../shared/term.model";
import { SearchTermUrlService } from "../search/url/search-term-url.service";

@Component({
    selector: "get-data",
    templateUrl: "./get-data.component.html",
    styleUrls: ["./get-data.component.scss"],
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

export class GetDataComponent implements OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Template variables
    public selectedViewState: GetDataViewState; // View state to navigate to once species selection is completed
    public state$ = new BehaviorSubject<GetDataComponentState>({
        loaded: false
    });
    public viewState = GetDataViewState.NONE;

    /**
     * @param {ConfigService} configService
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    public constructor(private configService: ConfigService,
                       private searchTermUrlService: SearchTermUrlService,
                       private router: Router,
                       private store: Store<AppState>) {
    }

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

        // If state hasn't been init'ed yet, there won't be a selected entity. Return empty set such that tab structure
        // is displayed (without links).
        if ( !selectedEntity ) {
            return [];
        }
        
        let displayName;
        if ( this.viewState === GetDataViewState.SPECIES_SELECTION ) {
            displayName = "Export Data";
        }
        else if ( this.viewState === GetDataViewState.NONE ) {
            displayName = "Back";
        }
        else {
            displayName = "Species Selection"; 
        }

        return [{key: selectedEntity.key, displayName: displayName}];
    }

    /**
     * Return the display text for the current selected type of export/data.
     * 
     * @returns {string}
     */
    public getExportDescription(): string {
        
        if ( this.selectedViewState === GetDataViewState.BULK_DOWNLOAD ) {
            return "curl command";
        }
        if ( this.selectedViewState === GetDataViewState.MANIFEST ) {
            return "file manifest";
        }
        return "export";
    }

    /**
     * Find and return the species facet from the species set of facets.
     *
     * @param {Facet[]} fileFacets
     * @returns {FileFacet}
     */
    public getSpeciesFileFacet(fileFacets: Facet[]): FileFacet {

        return fileFacets.find(facet => facet.name === FileFacetName.GENUS_SPECIES) as FileFacet;
    }

    /**
     * Returns the page title.
     *
     * @returns {string}
     */
    public getTitle(): string {

        if ( this.viewState === GetDataViewState.BULK_DOWNLOAD ) {
            return "Download Selected Data Using curl";
        }

        if ( this.viewState === GetDataViewState.MANIFEST ) {
            return "Request File Manifest";
        }

        if ( this.viewState === GetDataViewState.TERRA ) {
            return "Export to Terra";
        }

        return "Export Selected Data";
    }

    /**
     * Returns true if the species selection form is currently visible. True if view state is not DEFAULT (that is,
     * an export or download has been selected) but species selection is required before export/download can continue.
     * 
     * @param {boolean} speciesSelectionRequired
     * @param {GetDataViewState} viewState
     * @returns {boolean}
     */
    public isSpeciesSelectionFormVisible(speciesSelectionRequired: boolean, viewState: GetDataViewState): boolean {

        return speciesSelectionRequired && viewState !== GetDataViewState.NONE;
    }

    /**
     * Returns the effective terms for the disease facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedDiseases(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.DISEASE);
    }

    /**
     * Returns the effective terms for the donor disease facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedDonorDiseases(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.DONOR_DISEASE);
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
     * Returns the effective terms for the organ facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedOrgans(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.ORGAN)
    }

    /**
     * Returns the effective terms for the organ part facet.
     *
     * @param {FileFacet[]} fileFacets
     * @returns {Term[]}
     */
    public listSelectedOrganParts(fileFacets: FileFacet[]): Term[] {

        return this.listSelectedTermsOfFacet(fileFacets, FileFacetName.ORGAN_PART)
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

        this.selectedViewState = GetDataViewState[download];
        this.viewState = GetDataViewState.SPECIES_SELECTION;
    }

    /**
     * Trigger fetch of files facets to populate data summary.
     */
    public onSpeciesSelected() {

        this.store.dispatch(new FetchFilesFacetsRequestAction());
        
        // Grab the selected export/download and reset
        this.viewState = this.selectedViewState;
        this.selectedViewState = GetDataViewState.NONE;
    }

    /**
     * Handle click on tab.
     * If current page is a download page, view is changed back to download overview page.
     * Otherwise, selected entity in state is updated and return user back to table.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        if ( this.viewState === GetDataViewState.SPECIES_SELECTION ) {
            this.viewState = GetDataViewState.NONE;
        }
        else if ( this.viewState !== GetDataViewState.NONE ) {
            this.selectedViewState = this.viewState;
            this.viewState = GetDataViewState.SPECIES_SELECTION;
        }
        else {
            this.store.dispatch(new BackToEntityAction(tab.key));
            this.router.navigate(["/" + tab.key], {
                queryParamsHandling: "preserve"
            });
        }
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

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up state.
     */
    public ngOnInit() {

        // Get the list of facets to display. Must pull these from the files endpoint.
        this.store.dispatch(new FetchFilesFacetsRequestAction());

        combineLatest(
            this.store.pipe(select(selectCatalog)),
            this.store.pipe(select(selectFilesFacets)),
            this.store.pipe(select(selectFileSummary)),
            this.store.pipe(select(selectSelectedEntitySpec)),
            this.store.pipe(select(selectSelectedSearchTerms))
        )
            .pipe(
                takeUntil(this.ngDestroy$),
                // Only continue if file facets have been fetched from endpoint and set in store
                filter(([filesFacets]) => {
                    return !!filesFacets.length;
                })
            )
            .subscribe(([catalog, filesFacets, fileSummary, selectedEntity, selectedSearchTerms]) => {

                this.state$.next({
                    catalog,
                    filesFacets,
                    fileSummary,
                    loaded: true,
                    selectedEntity,
                    selectedSearchTerms
                });
            });
    }
}
