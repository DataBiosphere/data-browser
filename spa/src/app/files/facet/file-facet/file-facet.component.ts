/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying an individual facet and its terms, as well as functionality around selecting
 * terms and displaying edit facet (term) menu.
 */

// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy,
    EventEmitter,
    Output,
} from "@angular/core";

// App dependencies
import { FacetTermSelectedEvent } from "./facet-term-selected.event";
import { FileFacet } from "./file-facet.model";
import EntitySpec from "../../shared/entity-spec";
import { Term } from "../../shared/term.model";
import { TermSortService } from "../../sort/term-sort.service";

@Component({
    selector: "file-facet",
    templateUrl: "./file-facet.component.html",
    styleUrls: ["./file-facet.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileFacetComponent {
    // Inputs
    @Input() facetName: string;
    @Input() fileFacet: FileFacet;
    @Input() selectedEntity: EntitySpec;

    // Outputs
    @Output() facetTermSelected = new EventEmitter<FacetTermSelectedEvent>();

    /**
     * @param {TermSortService} termSortService
     */
    constructor(private termSortService: TermSortService) {}

    /**
     * Returns the name of the activeTab
     *
     * @param {EntitySpec} activeTab
     * @returns {string}
     */
    public getLabelName(activeTab: EntitySpec): string {
        return activeTab.displayName;
    }

    /**
     * Sort and return the list of terms for this facet.
     *
     * @param {string} facetName
     * @param {Term[]} terms
     * @returns {Term[]}
     */
    public getSortedTerms(facetName: string, terms: Term[]): Term[] {
        const sortedTerms = [...terms];
        this.termSortService.sortTerms(facetName, sortedTerms);
        return sortedTerms;
    }

    /**
     * Handle click on term in list of terms - let parent componentds know that selected value of term is to be toggled.
     *
     * @param fileFacetSelectedEvent {FacetTermSelectedEvent}
     */
    public onFacetTermSelected(fileFacetSelectedEvent: FacetTermSelectedEvent) {
        this.facetTermSelected.emit(fileFacetSelectedEvent);
    }
}
