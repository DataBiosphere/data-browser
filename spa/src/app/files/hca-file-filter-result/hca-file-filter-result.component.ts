/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying set of currently selected search terms (file facet terms and projects).
 */

// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { ClearSelectedTermsAction } from "../_ngrx/search/clear-selected-terms.action";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "../shared/file-facet-name.model";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";
import { FileFacetDisplayService } from "../shared/file-facet-display.service";

@Component({
    selector: "hca-file-filter-result",
    templateUrl: "./hca-file-filter-result.component.html",
    styleUrls: ["./hca-file-filter-result.component.scss"],
})

export class HCAFileFilterResultComponent {

    // Inputs
    @Input() selectedSearchTerms: SearchTerm[];
    @Input() removable: boolean;

    /**
     * @param {FileFacetDisplayService} fileFacetDisplayService
     * @param {Store<AppState>} store
     */
    constructor(private fileFacetDisplayService: FileFacetDisplayService, private store: Store<AppState>) {
    }

    /**
     * Returns facet name in format appropriate for display.
     *
     * @param facetName
     * @returns {string}
     */
    public getFacetName(facetName: string): string {

        return this.fileFacetDisplayService.getFileFacetDisplayName(facetName);
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
     * Dispatch event to remove a single selected search term.
     *
     * @param {SearchTerm} searchTerm
     */
    public removeSearchTerm(searchTerm: SearchTerm) {

        let action;
        if ( searchTerm.getSearchKey() === FileFacetName.PROJECT_ID ) {
            action = new SelectProjectIdAction(searchTerm.getSearchValue(), searchTerm.getDisplayValue(), false);
        }
        else {
            action = new SelectFileFacetTermAction(searchTerm.getSearchKey(), searchTerm.getSearchValue(), false);
        }

        this.store.dispatch(action);
    }

    /**
     * Dispatch event to remove all selected search terms.
     */
    public removeAllSearchTerms() {

        this.store.dispatch(new ClearSelectedTermsAction());
    }
}
