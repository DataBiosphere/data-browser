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
import { CamelToSpacePipe } from "../../cc-pipe/camel-to-space/camel-to-space.pipe";
import { ClearSelectedTermsAction } from "../_ngrx/search/clear-selected-terms.action";
import { SelectFileFacetTermAction } from "../_ngrx/search/select-file-facet-term.action";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "../shared/file-facet-name.model";
import { SelectProjectAction } from "../_ngrx/search/select-project.action";
import { SelectProjectIdAction } from "../_ngrx/search/select-project-id.action";

@Component({
    selector: "hca-file-filter-result",
    templateUrl: "./hca-file-filter-result.component.html",
    styleUrls: ["./hca-file-filter-result.component.scss"],
})

export class HCAFileFilterResultComponent {

    // Inputs
    @Input() searchTerms: SearchTerm[];
    @Input() removable: boolean;

    // locals
    store: Store<AppState>;

    constructor(store: Store<AppState>) {
        this.store = store;
    }

    /**
     * Returns facet name in correct format.
     * disease is renamed "Known Diseases".
     * libraryConstructionApproach is renamed to "Library Construction Method".
     *
     * @param facetName
     * @returns {any}
     */
    public getFacetName(facetName: string): string {

        if ( facetName === "disease" ) {

            return "Known Diseases";
        }
        if ( facetName === "libraryConstructionApproach" ) {

            return "Library Construction Method";
        }

        return (new CamelToSpacePipe().transform(facetName));
    }

    /**
     * Returns true if there are no currently selected search terms.
     *
     * @returns {boolean}
     */
    public isSearchTermsEmpty(): boolean {

        return this.searchTerms.length === 0;
    }

    /**
     * Dispatch event to remove a single selected search term.
     *
     * @param {SearchTerm} searchTerm
     */
    public removeSearchTerm(searchTerm: SearchTerm) {

        let action;
        if ( searchTerm.facetName === FileFacetName.PROJECT ) {
            action = new SelectProjectAction(searchTerm.name, false);
        }
        else if (searchTerm.facetName === FileFacetName.PROJECT_ID ) {
            action = new SelectProjectIdAction(searchTerm.getSearchKey(), searchTerm.name, false);
        }
        else {
            action = new SelectFileFacetTermAction(searchTerm.facetName, searchTerm.name, false);
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
