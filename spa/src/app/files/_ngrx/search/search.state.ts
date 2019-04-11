/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of selected file facet terms and entities (projects) that comprise the current search state.
 */

// App dependencies
import { FileFacetListState } from "../file-facet-list/file-facet-list.state";
import { SearchFileFacetTerm } from "../../search/search-file-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { SelectSearchTermAction } from "./select-search-term.action";
import { SetViewStateAction } from "../file-facet-list/set-view-state.action";
import { QueryStringFacet } from "../../shared/query-string-facet.model";
import { SearchEntity } from "../../search/search-entity.model";
import { FileFacetName } from "../../shared/file-facet-name.model";

export class SearchState {

    public readonly searchTermsByFacetName: Map<string, Set<SearchTerm>>;
    public readonly searchTerms: SearchTerm[];

    /**
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     */
    constructor(searchTermsByFacetName: Map<string, Set<SearchTerm>>) {

        this.searchTermsByFacetName = searchTermsByFacetName;
        this.searchTerms = Array.from(this.searchTermsByFacetName.values()).reduce((accum, searchTermSet) => {

            accum = [
                ...accum,
                ...Array.from(searchTermSet.values())
            ];

            return accum;
        }, []);
    }

    /**
     * Handle select/deselect of file facet term. Create new search state based on selected file facet term action.
     *
     * @param {SelectSearchTermAction} action
     * @returns {FileFacetListState}
     */
    public selectSearchTerm(action: SelectSearchTermAction): SearchState {

        const searchTerm = action.asSearchTerm();
        if ( action.selected ) {
            const updatedSearchTermsByFacetName =
                this.addSearchTermToSelectedSet(this.searchTermsByFacetName, searchTerm);
            return new SearchState(updatedSearchTermsByFacetName);
        }

        const updatedSearchTermsByFacetName =
            this.removeSearchTermFromSelectedSet(this.searchTermsByFacetName, searchTerm);
        return new SearchState(updatedSearchTermsByFacetName);
    }

    /**
     * Handle select of search terms on init of app. App state is pulled from URL params and we must convert this to
     * a set of selected search terms, if any.
     *
     * @param {SetViewStateAction} action
     * @returns {SearchState}
     */
    public setSelectedSearchTermsFromViewState(action: SetViewStateAction): SearchState {

        // Update new state with selected terms
        const searchTermsByFacetName = action.selectedFacets.reduce((accum, queryStringFacet) => {

            const facetName = queryStringFacet.facetName;
            const searchTerms = this.translateQueryStringToSearchTerms(queryStringFacet);
            accum.set(facetName, searchTerms);
            return accum;
        }, new Map<string, Set<SearchTerm>>());

        return new SearchState(searchTermsByFacetName);
    }

    /**
     * Create default state of search - no selected file facet terms, no selected entities.
     *
     * @returns {SearchState}
     */
    public static getDefaultState() {

        return new SearchState(new Map());
    }

    /**
     * Add specified search term to set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {SearchFileFacetTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private addSearchTermToSelectedSet(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>, selectedTerm: SearchFileFacetTerm): Map<string, Set<SearchTerm>> {

        const facetName = selectedTerm.facetName;

        // Add the newly selected search term to the set
        const updatedSearchTerms = new Set(searchTermsByFacetName.get(facetName));
        updatedSearchTerms.add(selectedTerm);

        // Clone selected map for immutability and add updated set of selected terms for the specified facet
        const clonedTermsByFacetName = new Map(searchTermsByFacetName);
        clonedTermsByFacetName.set(facetName, updatedSearchTerms);
        return clonedTermsByFacetName;
    }

    /**
     * Remove the specified search term from the set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {SearchFileFacetTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private removeSearchTermFromSelectedSet(
        searchTermsByFacetName: Map<string, Set<SearchTerm>>, selectedTerm: SearchFileFacetTerm): Map<string, Set<SearchTerm>> {

        const facetName = selectedTerm.facetName;
        const currentSearchTerms = searchTermsByFacetName.get(facetName);

        // Error state - return current state if facet is not present in the set of selected facets.
        if ( !currentSearchTerms ) {
            return searchTermsByFacetName;
        }

        // Remove the selected term for the current set of selected term
        let updatedSearchTerms = Array.from(currentSearchTerms).reduce((accum, currentSearchTerm) => {

            if ( currentSearchTerm.getSearchKey() !== selectedTerm.getSearchKey() ) {
                accum.add(currentSearchTerm);
            }

            return accum;
        }, new Set());

        // Clone selected map for immutability
        const clonedTermsByFacetName = new Map(searchTermsByFacetName);

        // Remove facet from selected set if it has no corresponding selected terms.
        if ( updatedSearchTerms.size === 0 ) {
            clonedTermsByFacetName.delete(facetName);
        }
        // Otherwise, facet has other selected terms, set updated set!
        else {
            clonedTermsByFacetName.set(facetName, updatedSearchTerms);
        }

        return clonedTermsByFacetName;
    }

    /**
     * Translate query string filters to set of search terms.
     *
     * @param {QueryStringFacet} queryStringFacet
     * @returns {Set<SearchTerm>}
     */
    private translateQueryStringToSearchTerms(queryStringFacet: QueryStringFacet): Set<SearchTerm> {

        const facetName = queryStringFacet.facetName;
        return queryStringFacet.selectedTermNames.reduce((accum, searchTermName) => {

            if ( facetName === FileFacetName.PROJECT_ID ) {
                accum.add(new SearchEntity(facetName, "", searchTermName));
            }
            else {
                accum.add(new SearchFileFacetTerm(facetName, searchTermName));
            }

            return accum;
        }, new Set<SearchTerm>());
    }
}
