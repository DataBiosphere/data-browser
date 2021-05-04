/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Wrapper component displaying export selection and export requests (curl, manifest, Terra).
 */

// Core dependencies
import { animate, style, transition, trigger } from "@angular/animations";
import { Component, ChangeDetectionStrategy, OnInit, Output, EventEmitter, Input, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { Facet } from "../../facet/facet.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { GetDataLayoutComponentState } from "./get-data-layout.component.state";
import { AppState } from "../../../_ngrx/app.state";
import { selectFilesFacets } from "../../_ngrx/facet/facet.selectors";
import { FetchFilesFacetsRequestAction } from "../../_ngrx/facet/fetch-files-facets-request.action";
import { selectSelectedEntitySpec } from "../../_ngrx/files.selectors";
import EntitySpec from "../../shared/entity-spec";
import { Term } from "../../shared/term.model";


@Component({
    selector: "get-data-layout",
    templateUrl: "./get-data-layout.component.html",
    styleUrls: ["./get-data-layout.component.scss"],
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

export class GetDataLayoutComponent implements OnDestroy, OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Template variables
    public state$ = new BehaviorSubject<GetDataLayoutComponentState>({
        loaded: false
    });
    public speciesSelectionFormVisible = false;

    // Inputs/Outputs
    @Input() speciesSelectionEnabled: boolean;
    @Output() backClicked = new EventEmitter<EntitySpec>();

    /**
     * @param {Store<AppState>} store
     */
    public constructor(private store: Store<AppState>) {}

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

        return [{key: selectedEntity.key, displayName: "Back"}];
    }

    /**
     * Find and return the species facet from the species set of facets, required for species selection form.
     *
     * @param {Facet[]} fileFacets
     * @returns {FileFacet}
     */
    public getSpeciesFileFacet(fileFacets: Facet[]): FileFacet {

        return fileFacets.find(facet => facet.name === FileFacetName.GENUS_SPECIES) as FileFacet;
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
     * Trigger fetch of files facets to populate data summary, display export.
     */
    public onSpeciesSelected() {

        this.store.dispatch(new FetchFilesFacetsRequestAction());
        this.speciesSelectionFormVisible = false;
    }

    /**
     * Handle click on back:
     * - If species selection is disabled, always return user to get data options
     * - If currently viewing species selection, return user to get data options
     * - If currently viewing export, return user to species selection form
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {
        
        if ( !this.speciesSelectionEnabled || this.speciesSelectionFormVisible ) {
            this.backClicked.emit(tab);
        }
        else {
            this.speciesSelectionFormVisible = true;
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

        // Show species selection form, enabled for actual exports (curl, manifest, Terra), disabled for export 
        // options.
        if ( this.speciesSelectionEnabled ) {
            this.speciesSelectionFormVisible = true;
        }

        combineLatest(
            this.store.pipe(select(selectFilesFacets)),
            this.store.pipe(select(selectSelectedEntitySpec))
        )
            .pipe(
                takeUntil(this.ngDestroy$),
                // Only continue if file facets have been fetched from endpoint and set in store
                filter(([filesFacets]) => {
                    return !!filesFacets.length;
                })
            )
            .subscribe(([filesFacets, selectedEntity]) => {

                this.state$.next({
                    filesFacets,
                    loaded: true,
                    selectedEntity
                });
            });
    }
}
