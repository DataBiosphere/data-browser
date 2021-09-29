/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling species selection during project downloads.
 * 
 * TODO
 * Move get data species form to reuse this version once get data flows are updated to use download-specific state
 * and not app-wide state.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";

// App dependencies
import { Facet } from "../../facet/facet.model";
import { FacetTermSelectedEvent } from "../../facet/file-facet/facet-term-selected.event";
import { CheckboxOption } from "../../get-data/species-form/checkbox-option.model";
import { Term } from "../../shared/term.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";

@Component({
    selector: "project-species-form",
    templateUrl: "./project-species-form.component.html",
    styleUrls: ["./project-species-form.component.scss"]
})
export class ProjectSpeciesFormComponent {

    // Template variables
    public speciesCheckboxOptions: CheckboxOption[] = [];
    
    // Inputs/outputs
    @Input() speciesFacet: Facet;
    @Output() speciesSelected = new EventEmitter<FacetTermSelectedEvent>();

    /**
     * Handle click on species checkbox - toggle selected value.
     * 
     * @param {CheckboxOption} option
     */
    public onSpeciesClicked(option: CheckboxOption): void {

        const event = new FacetTermSelectedEvent(FileFacetName.GENUS_SPECIES, option.value, !option.selected);
        this.speciesSelected.emit(event);
    }

    /**
     * Set up model backing selection of species.
     * 
     * @param {Term[]} speciesTerms
     * @returns {CheckboxOption[]}
     */
    private buildSpeciesCheckboxOptions(speciesTerms: Term[]): CheckboxOption[] {

        return speciesTerms.reduce((accum, term) => {

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
     * Update checkboxes on update of selected species.
     */
    public ngOnChanges(changes: SimpleChanges) {

        if ( changes.speciesFacet ) {
            this.speciesCheckboxOptions =
                this.buildSpeciesCheckboxOptions(changes.speciesFacet.currentValue.terms);
        }
    }
}
