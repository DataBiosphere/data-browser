/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying set of currently selected search terms (file facet terms and projects).
 */

// Core dependencies
import { AppState } from "../../../_ngrx/app.state";
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ClearSelectedAgeRangeAction } from "../../_ngrx/search/clear-selected-age-range.action";
import { ClearSelectedTermsAction } from "../../_ngrx/search/clear-selected-terms.action";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import { SearchTerm } from "../search-term.model";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SelectProjectIdAction } from "../../_ngrx/search/select-project-id.action";
import { FacetDisplayService } from "../../facet/facet-display.service";
import { FacetAgeRangeName } from "../../facet/facet-age-range/facet-age-range-name.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

@Component({
    selector: "selected-search-terms",
    templateUrl: "./selected-search-terms.component.html",
    styleUrls: ["./selected-search-terms.component.scss"],
})
export class SelectedSearchTermsComponent {
    // Inputs
    @Input() selectedSearchTerms: SearchTerm[];
    @Input() loading: boolean;
    @Input() removable: boolean;
    @Input() tableFilter: boolean;

    /**
     * @param {FacetDisplayService} facetDisplayService
     * @param {Store<AppState>} store
     */
    constructor(
        private facetDisplayService: FacetDisplayService,
        private store: Store<AppState>
    ) {}

    /**
     * Returns facet name in format appropriate for display.
     *
     * @param facetName
     * @returns {string}
     */
    public getFacetName(facetName: string): string {
        return this.facetDisplayService.getFacetDisplayName(facetName);
    }

    /**
     * Returns a distinct array of facet names from the selected search terms.
     *
     * @returns {string[]}
     */
    public getSelectedSearchFacets(): string[] {
        return this.selectedSearchTerms
            .map((selectedSearchTerm) => selectedSearchTerm.getSearchKey())
            .filter(
                (facetName, i, facetNames) =>
                    facetNames.indexOf(facetName) === i
            );
    }

    /**
     * Returns search terms for each selected search facet.
     *
     * @param selectedSearchFacet
     * @returns {SearchTerm[]}
     */
    public getSelectedSearchTerms(selectedSearchFacet): SearchTerm[] {
        return this.selectedSearchTerms.filter(
            (selectedSearchTerm) =>
                selectedSearchTerm.getSearchKey() === selectedSearchFacet
        );
    }

    /**
     * Returns true if there are no currently selected search terms.
     *
     * @returns {boolean}
     */
    public isSelectedSearchTermsEmpty(): boolean {
        return this.selectedSearchTerms.length === 0;
    }

    /**
     * Removes all selected search terms for a given selected search facet.
     *
     * @param selectedSearchFacet
     */
    public removeAllSelectedTermsInFacet(selectedSearchFacet) {
        if (this.removable) {
            this.getSelectedSearchTerms(selectedSearchFacet).forEach(
                (selectedSearchTerm) =>
                    this.removeSearchTerm(selectedSearchTerm)
            );
        }
    }

    /**
     * Dispatch event to remove a single selected search term.
     *
     * @param {SearchTerm} searchTerm
     */
    public removeSearchTerm(searchTerm: SearchTerm) {
        if (!this.removable) {
            return;
        }

        let action;
        if (searchTerm.getSearchKey() === FileFacetName.PROJECT_ID) {
            action = new SelectProjectIdAction(
                searchTerm.getSearchValue(),
                searchTerm.getDisplayValue(),
                false,
                GASource.SELECTED_TERMS
            );
        } else if (
            searchTerm.getSearchKey() === FacetAgeRangeName.ORGANISM_AGE_RANGE
        ) {
            action = new ClearSelectedAgeRangeAction(
                searchTerm.getSearchKey(),
                searchTerm.getSearchValue(),
                GASource.SELECTED_TERMS
            );
        } else {
            action = new SelectFileFacetTermAction(
                searchTerm.getSearchKey(),
                searchTerm.getSearchValue(),
                false,
                GASource.SELECTED_TERMS
            );
        }

        this.store.dispatch(action);
    }

    /**
     * Dispatch event to remove all selected search terms, across all selected facets.
     */
    public removeAllSearchTerms() {
        this.store.dispatch(
            new ClearSelectedTermsAction(GASource.SELECTED_TERMS)
        );
    }
}
