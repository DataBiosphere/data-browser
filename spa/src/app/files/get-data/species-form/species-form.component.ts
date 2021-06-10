/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling species selection prior to get data flows.
 */

// Core dependencies
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { CheckboxOption } from "./checkbox-option.model";
import { Facet } from "../../facet/facet.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { AppState } from "../../../_ngrx/app.state";
import { FetchFilesFacetsRequestAction } from "../../_ngrx/facet/fetch-files-facets-request.action";
import { selectFilesFacets } from "../../_ngrx/facet/facet.selectors";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { Term } from "../../shared/term.model";
import { SpeciesFormComponentState } from "./species-form.component.state";

@Component({
    selector: "species-form",
    templateUrl: "./species-form.component.html",
    styleUrls: ["./species-form.component.scss"]
})
export class SpeciesFormComponent implements OnInit {

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    // Template variables
    public state$ = new BehaviorSubject<SpeciesFormComponentState>({
        loaded: false
    });
    
    // Outputs
    @Output() speciesSelected = new EventEmitter<void>();

    /**
     * @param {SearchTermHttpService} searchTermHttpService
     * @param {Store<AppState>} store
     */
    constructor(private searchTermHttpService: SearchTermHttpService, private store: Store<AppState>) {}

    /**
     * Returns true if at least one species has been selected.
     * 
     * @param {CheckboxOption[]} options
     * @returns {boolean}
     */
    public isSpeciesSelected(options: CheckboxOption[]): boolean {

        if ( !options ) {
            return false;
        }
        return options.some(option => option.selected);
    }

    /**
     * Handle click on species checkbox - toggle selected value.
     * 
     * @param {CheckboxOption} option
     */
    public onSpeciesClicked(option: CheckboxOption): void {

        option.selected = !option.selected;
    }

    /**
     * Species have been selected and export can now be requested.
     * 
     * @param {FileFacet} speciesFileFacet
     * @param {CheckboxOption[]} speciesCheckboxOptions
     */
    public onSpeciesSelected(speciesFileFacet: FileFacet, speciesCheckboxOptions: CheckboxOption[]) {

        speciesCheckboxOptions.forEach(option => {

            const termName = option.value;
            const term = speciesFileFacet.terms.find(t => t.name === termName);
            
            if ( term.selected === option.selected ) {
                return;
            }

            this.dispatchSelectedSpeciesAction(speciesFileFacet.name, option.value, option.selected);
        });

        this.speciesSelected.emit();
    }

    /**
     * Find and return the species facet from the species set of facets.
     *
     * @param {Facet[]} fileFacets
     * @returns {FileFacet}
     */
    private getSpeciesFileFacet(fileFacets: Facet[]): FileFacet {

        return fileFacets.find(facet => facet.name === FileFacetName.GENUS_SPECIES) as FileFacet;
    }

    /**
     * Update state to include the species in the set of selected species.
     *
     * @param {string} facetName ("Genus Species")
     * @param {string} termName (species)
     * @param {boolean} selected
     */
    private dispatchSelectedSpeciesAction(facetName: string, termName: string, selected: boolean): void {

        const selectTermAction =
            new SelectFileFacetTermAction(facetName, termName, selected, GASource.SPECIES_SELECTION);
        this.store.dispatch(selectTermAction);
    }

    /**
     * Set up model backing selection of species.
     * 
     * @param {Term[]} speciesTerms
     * @returns {CheckboxOption[]}
     */
    private buildSpeciesCheckboxOptions(speciesTerms: Term[]): CheckboxOption[] {

        const selectSingleOption = speciesTerms.length === 1; 
        return speciesTerms.reduce((accum, term) => {

            const speciesName = term.name;
            accum.push({
                label: speciesName,
                selected: selectSingleOption || term.selected,
                value: speciesName
            });
            return accum;
        }, []);
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
        
        // Get the list of facets so we can determine the current set of species. Must pull these from the files
        // endpoint.
        this.store.dispatch(new FetchFilesFacetsRequestAction());

        this.store.pipe(select(selectFilesFacets))
            .pipe(
                takeUntil(this.ngDestroy$),
                // Only continue if file facets have been fetched from endpoint and set in store
                filter((filesFacets) => {
                    return !!filesFacets.length;
                })
            )
            .subscribe((filesFacets) => {

                const speciesFileFacet = this.getSpeciesFileFacet(filesFacets);
                const speciesTerms = speciesFileFacet.terms;
                const speciesCheckboxOptions = this.buildSpeciesCheckboxOptions(speciesTerms);
                
                this.state$.next({
                    loaded: true,
                    speciesCheckboxOptions,
                    speciesFileFacet
                });
            });
    }
}
