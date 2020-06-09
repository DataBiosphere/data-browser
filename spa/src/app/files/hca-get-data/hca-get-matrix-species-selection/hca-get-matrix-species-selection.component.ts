/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling species selection prior to matrix download.
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
    selector: "hca-get-matrix-species-selection",
    templateUrl: "./hca-get-matrix-species-selection.component.html",
    styleUrls: ["./hca-get-matrix-species-selection.component.scss"]
})
export class HCAGetMatrixSpeciesSelectionComponent implements OnChanges {

    // Template variables
    public speciesCheckboxOptions: CheckboxOption[];

    // Inputs/outputs
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
     * Let parent components know that a species has been selected and matrix expression can now be requested.
     * 
     * @param {FileFacet} speciesFileFacet
     * @param {CheckboxOption[]} speciesCheckboxOptions
     */
    public onSpeciesSelected(speciesFileFacet: FileFacet, speciesCheckboxOptions: CheckboxOption[]) {

        // Determine the set of selected species and update state
        const selectedSpeciesOptions = speciesCheckboxOptions.filter(option => {
            return option.selected;
        });

        selectedSpeciesOptions.forEach(option => {
            this.dispatchSelectedSpeciesAction(speciesFileFacet.name, option.value);
        });
        
        // Let parents know species have been selected, and exit component
        this.speciesSelected.emit(true);
    }

    /**
     * Update state to include the species in the set of selected species.
     *
     * @param {string} facetName ("Genus Species")
     * @param {string} termName (species)
     */
    private dispatchSelectedSpeciesAction(facetName: string, termName: string): void {

        const selectTermAction =
            new SelectFileFacetTermAction(facetName, termName, true, GASource.COHORT_MATRIX);
        this.store.dispatch(selectTermAction);
    }

    /**
     * Set up model backing selection of species.
     * 
     * @param {Term[]} speciesTerms
     * @returns {CheckboxOption[]}
     */
    private buildSpeciesCheckboxOptions(speciesTerms: Term[]): CheckboxOption[] {

        const multipleSpecies = speciesTerms.length > 1;
        return speciesTerms.reduce((accum, term) => {

            // If there's more than one species and this species is homo sapiens, default it to selected. Otherwise
            // species is not selected by default.
            const speciesName = term.name;
            accum.push({
                label: speciesName,
                selected: multipleSpecies && this.isTermHomoSapiens(speciesName),
                value: speciesName
            });
            return accum;
        }, []);
    }

    /**
     * Returns true if the specified term name is Home Sapiens
     * 
     * @param {string} termName
     * @returns {boolean}
     */
    private isTermHomoSapiens(termName: string): boolean {

        return termName === GenusSpecies.HOMO_SAPIENS || termName === GenusSpecies.homo_sapiens;
    }

    /**
     * We can assume that at this point, considering this component is being displayed, that no species are selected. If
     * there's only one species in our data set and that species is human, we can update human skip species
     * selection. If there's more than one species, default human to be selected.
     * 
     * Set up checkbox form controls for each species, on change of species facet.
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        
        // If there's only one species, and that species is homo sapiens, auto-select it and let parent know species
        // selection can be skipped
        const speciesTerms = this.speciesFileFacet.terms;
        if ( speciesTerms.length === 1 && this.isTermHomoSapiens(speciesTerms[0].name) ) {

            this.dispatchSelectedSpeciesAction(this.speciesFileFacet.name, speciesTerms[0].name);

            // Species selection can be skipped - exit component
            this.speciesSelected.emit(true);
            return;
        }
        
        this.speciesCheckboxOptions = this.buildSpeciesCheckboxOptions(speciesTerms);
    }
}
