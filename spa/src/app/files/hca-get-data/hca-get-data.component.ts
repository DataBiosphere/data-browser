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
import { ConfigService } from "../../config/config.service";
import { DownloadViewState } from "./download-view-state.model";
import { FileFacet } from "../facet/file-facet/file-facet.model";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { HcaGetDataComponentState } from "./hca-get-data.component.state";
import { AppState } from "../../_ngrx/app.state";
import { BackToEntityAction } from "../_ngrx/entity/back-to-entity.action";
import { ClearIsMatrixSupportedAction } from "../_ngrx/facet/clear-is-matrix-supported.action";
import { selectFacetFileFacets, selectMatrixSupported } from "../_ngrx/facet/facet.selectors";
import { FetchIsMatrixSupportedRequestAction } from "../_ngrx/facet/fetch-is-matrix-supported-request.action";
import { selectSelectedEntitySpec } from "../_ngrx/file.selectors";
import { selectSelectedSearchTerms, selectSelectedSearchTermsBySearchKey } from "../_ngrx/search/search.selectors";
import EntitySpec from "../shared/entity-spec";
import { Term } from "../shared/term.model";
import { SearchTermUrlService } from "../search/url/search-term-url.service";

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
    private state$: Observable<HcaGetDataComponentState>;
    private viewState = DownloadViewState.NONE;

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

        let displayName = this.viewState !== DownloadViewState.NONE ? "Export Data" : "Back";
        return [{key: selectedEntity.key, displayName: displayName}];
    }

    /**
     * Find and return the species facet from the species set of facets.
     * 
     * @param {FileFacet[]} fileFacets
     * @returns {FileFacet}
     */
    public getSpeciesFileFacet(fileFacets: FileFacet[]): FileFacet {

        return fileFacets.find(facet => facet.name === FileFacetName.GENUS_SPECIES);
    }

    /**
     * Returns the page title.
     *
     * @returns {string}
     */
    public getTitle(): string {
        
        if ( this.viewState === DownloadViewState.MANIFEST ) {
            return "Request File Manifest";
        }
        
        if ( this.viewState === DownloadViewState.TERRA ) {
            return "Export to Terra";
        }
        
        if ( this.viewState === DownloadViewState.MATRIX || this.viewState === DownloadViewState.MATRIX_SPECIES_SELECTION ) {
            return "Request Expression Matrix";
        }

        return "Export Data";
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
            this.store.dispatch(new BackToEntityAction(tab.key));
            this.router.navigate(["/" + tab.key]);
        }
    }

    /**
     * Returns true if user must select the set of species to be included in a matrix download.
     * 
     * For the set of species present in the current data:
     * 
     * - one species, human, not selected, species selection required
     * - one species, non-human, not selected, species selection required
     * - one species, either human or non-human, selected, species selection not required
     * - more than one species, none selected, species selection required
     * - more than one species, at least one selected (either human or non-human), species selection not required 
     * 
     * @returns {boolean}
     */
    private isMatrixSpeciesSelectionRequired(fileFacets: FileFacet[]): boolean {

        const speciesFileFacet = this.getSpeciesFileFacet(fileFacets);
        if ( !speciesFileFacet ) {
            return false;
        }

        const effectiveTerms = speciesFileFacet.getEffectiveTerms();

        // There's only one species in our data set, species selection is required if the species is not currently
        // selected
        if ( effectiveTerms.length === 1 ) {
            return !effectiveTerms[0].selected;
        }

        // There's more than one species in our data set, species selection is required if non species is currently
        // selected
        const selectedTerms = effectiveTerms.filter(term => term.selected);
        return selectedTerms.length === 0;
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
     * Set up state.
     */
    public ngOnInit() {

        // Determine the current selected tab (from table)
        const selectedEntity$ = this.store.pipe(select(selectSelectedEntitySpec));

        // Get the list of file facets to display
        const fileFacets$ = this.store.pipe(select(selectFacetFileFacets));

        // Grab the current set of selected search terms
        const selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));
        
        // Determine if Matrix files are included in the current files result set.
        this.store.dispatch(new FetchIsMatrixSupportedRequestAction());
        const matrixSupported$ = this.store.pipe(select(selectMatrixSupported));

        this.state$ = combineLatest(
            selectedEntity$,
            fileFacets$,
            matrixSupported$,
            selectedSearchTerms$
        )
            .pipe(
                map(([selectedEntity, fileFacets, matrixSupported, selectedSearchTerms]) => {

                    const disableFeature = this.configService.isV2();
                    const matrixSpeciesSelectionRequired = this.isMatrixSpeciesSelectionRequired(fileFacets);

                    return {
                        selectedEntity,
                        disableFeature,
                        fileFacets,
                        matrixSpeciesSelectionRequired,
                        matrixSupported,
                        matrixSupportedLoaded: this.isMatrixSupportedLoaded(matrixSupported),
                        selectedSearchTerms
                    };
                })
            );
    }
}
