/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling species selection prior to get data flows.
 */

// Core dependencies
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { CheckboxOption } from "./checkbox-option.model";
import { FileFacet } from "../../facet/file-facet/file-facet.model";
import { AppState } from "../../../_ngrx/app.state";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { GASource } from "../../../shared/analytics/ga-source.model";
import { GenusSpecies } from "../../shared/genus-species.model";
import { SearchTerm } from "../../search/search-term.model";
import { Term } from "../../shared/term.model";


@Component({
    selector: "species-form",
    templateUrl: "./species-form.component.html",
    styleUrls: ["./species-form.component.scss"]
})
export class SpeciesFormComponent implements OnChanges {

    // Template variables
    public speciesCheckboxOptions: CheckboxOption[];

    // Inputs/outputs
    @Input() exportDescription: string;
    @Input() speciesFileFacet: FileFacet;
    @Output() speciesSelected = new EventEmitter<boolean>();

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
     * Let parent components know that a species has been selected and data can now be requested.
     * 
     * @param {FileFacet} speciesFileFacet
     * @param {CheckboxOption[]} speciesCheckboxOptions
     */
    public onSpeciesSelected(speciesFileFacet: FileFacet, speciesCheckboxOptions: CheckboxOption[]) {

        speciesCheckboxOptions.forEach(option => {

            const termName = option.value;
            const term = speciesFileFacet.terms.find(t => t.name === termName);
            
            if ( term.selected && option.selected ) {
                return;
            }

            this.dispatchSelectedSpeciesAction(speciesFileFacet.name, option.value, option.selected);
        });
        
        // Let parents know species have been selected, and exit component
        this.speciesSelected.emit(true);
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

        return speciesTerms.reduce((accum, term) => {

            // If there's more than one species and this species is homo sapiens, default it to selected. Otherwise
            // species is not selected by default.
            const speciesName = term.name;
            accum.push({
                label: speciesName,
                selected: term.selected,
                value: speciesName
            });
            return accum;
        }, []);
    }

    /**
     * Set up checkbox form controls for each species, on change of species facet.
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        
        const speciesTerms = this.speciesFileFacet.terms;
        this.speciesCheckboxOptions = this.buildSpeciesCheckboxOptions(speciesTerms);
    }
}
