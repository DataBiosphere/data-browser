/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Set of selected file facet terms and entities (projects) that comprise the current search state, as well as the
 * complete set of search terms that are selectable.
 */

// Core dependencies
import * as _ from "lodash";

// App dependencies
import { ClearSelectedAgeRangeAction } from "./clear-selected-age-range.action";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { ResponseTermService } from "../../http/response-term.service";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { SelectSearchTermAction } from "./select-search-term.action";
import { SearchEntity } from "../../search/search-entity.model";
import { SearchTermsUpdatedAction } from "./search-terms-updated.action";
import { QueryStringSearchTerm } from "../../search/url/query-string-search-term.model";
import { FacetAgeRangeName } from "../../facet/facet-age-range/facet-age-range-name.model";
import { SearchTermHttpService } from "../../search/http/search-term-http.service";
import { SearchAgeRange } from "../../search/search-age-range.model";
import { SelectFacetAgeRangeAction } from "./select-facet-age-range.action";

export class SearchState {

    public readonly searchTerms: SearchTerm[] = []; // Set of possible search terms that are selectable
    public readonly selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>; // Current set of search terms, keyed by facet/entity name
    public readonly selectedSearchTerms: SearchTerm[]; // Current set of selected search terms
    public readonly previousQuery: string; // Stringified version of the previous set of selected search terms
    
    private searchTermHttpService: SearchTermHttpService = new SearchTermHttpService(new ResponseTermService());

    /**
     * @param {SearchTerm[]} searchTerms
     * @param {Map<string, Set<SearchTerm>>} selectedSearchTermsBySearchKey
     * @param {string} previousQuery
     */
    constructor(searchTerms: SearchTerm[], selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>, previousQuery: string) {

        this.searchTerms = searchTerms;
        this.selectedSearchTermsBySearchKey = selectedSearchTermsBySearchKey;
        this.selectedSearchTerms = Array.from(this.selectedSearchTermsBySearchKey.values()).reduce((accum, searchTermSet) => {

            accum = [
                ...accum,
                ...Array.from(searchTermSet.values())
            ];

            return accum;
        }, []);
        this.previousQuery = previousQuery;
    }

    /**
     * Clear all selected search terms.
     * 
     * @returns {SearchState}
     */
    public clearAllSelectedSearchTerms(): SearchState {

        const previousQuery = this.buildPreviousQuery(this.selectedSearchTerms);
        return new SearchState([], new Map(), previousQuery);
    }

    /**
     * Handle clear of age range - remove age range from the set of selected search terms.
     *
     * @param {SelectFacetAgeRangeAction} action
     * @returns {SearchState}
     */
    public clearAgeRange(action: ClearSelectedAgeRangeAction): SearchState {

        const searchTerm = action.asSearchTerm();
        const updatedSearchTermsByFacetName =
            this.removeSearchTermFromSelectedSet(this.selectedSearchTermsBySearchKey, searchTerm);
        const previousQuery = this.buildPreviousQuery(this.selectedSearchTerms);
        return new SearchState(this.searchTerms, updatedSearchTermsByFacetName, previousQuery);
    }

    /**
     * Handle select of age range - add age range to the set of selected search terms.
     * 
     * @param {SelectFacetAgeRangeAction} action
     * @returns {SearchState}
     */
    public selectAgeRange(action: SelectFacetAgeRangeAction): SearchState {

        const searchTerm = action.asSearchTerm();
        const updatedSearchTermsByFacetName = 
            this.replaceSearchTermInSelectedSet(this.selectedSearchTermsBySearchKey, searchTerm);
        const previousQuery = this.buildPreviousQuery(this.selectedSearchTerms);
        return new SearchState(this.searchTerms, updatedSearchTermsByFacetName, previousQuery);
    }

    /**
     * Handle select/deselect of file facet term. Create new search state based on selected file facet term action.
     *
     * @param {SelectSearchTermAction} action
     * @returns {FacetState}
     */
    public selectSearchTerm(action: SelectSearchTermAction): SearchState {

        const previousQuery = this.buildPreviousQuery(this.selectedSearchTerms);
        
        const searchTerm = action.asSearchTerm();
        if ( action.selected ) {
            const updatedSearchTermsByFacetName =
                this.addSearchTermToSelectedSet(this.selectedSearchTermsBySearchKey, searchTerm);
            return new SearchState(this.searchTerms, updatedSearchTermsByFacetName, previousQuery);
        }

        const updatedSearchTermsByFacetName =
            this.removeSearchTermFromSelectedSet(this.selectedSearchTermsBySearchKey, searchTerm);
        return new SearchState(this.searchTerms, updatedSearchTermsByFacetName, previousQuery);
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
        const searchTermsByFacetName = action.selectedSearchTerms.reduce((accum, queryStringFacet) => {

            const facetName = queryStringFacet.facetName;
            const searchTerms = this.translateQueryStringToSearchTerms(queryStringFacet);
            accum.set(facetName, searchTerms);
            return accum;
        }, new Map<string, Set<SearchTerm>>());
        
        return new SearchState(this.searchTerms, searchTermsByFacetName, "");
    }

    /**
     * Set of possible search terms that use can select, have been updated - update store. We also need to check the set
     * of selected search terms here and add any missing data. For example, if the app is loaded with a selected project
     * ID in the URL, we won't have the corresponding project name until the full set of project ID-to-project name
     * mappings are returned from the server. If there are any selected project IDs with no corresponding project name
     * in the server response, remove the "partially constructed" project ID from the set of selected search terms. (See
     * this.translateQueryStringToSearchTerms() to see the partially constructed SearchEntity search term).
     * 
     * @param {SearchTermsUpdatedAction} action
     */
    public setSearchTerms(action: SearchTermsUpdatedAction) {

        let searchTermsBySearchKey = this.searchTerms.length === 0 ?
            this.patchSearchTerms(action.searchTerms, this.selectedSearchTermsBySearchKey) :
            this.selectedSearchTermsBySearchKey;

        const previousQuery = this.buildPreviousQuery(this.selectedSearchTerms);
        return new SearchState(action.searchTerms, searchTermsBySearchKey, previousQuery);
    }

    /**
     * Create default state of search - no selected file facet terms, no selected entities.
     *
     * @returns {SearchState}
     */
    public static getDefaultState() {

        return new SearchState([], new Map(), "");
    }

    /**
     * Add specified search term to set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {SearchTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private addSearchTermToSelectedSet(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>, selectedTerm: SearchTerm): Map<string, Set<SearchTerm>> {

        const searchKey = selectedTerm.getSearchKey();

        // Add the newly selected search term to the set
        const updatedSearchTerms = new Set(searchTermsBySearchKey.get(searchKey));
        updatedSearchTerms.add(selectedTerm);

        // Clone selected map for immutability and add updated set of selected terms for the specified facet
        const clonedTermsBySearchKey = new Map(searchTermsBySearchKey);
        clonedTermsBySearchKey.set(searchKey, updatedSearchTerms);
        return clonedTermsBySearchKey;
    }

    /**
     * Build up the previous query from the current set of selected search terms.
     * 
     * @param {SearchTerm[]} selectedSearchTerms
     */
    private buildPreviousQuery(selectedSearchTerms: SearchTerm[]): string {

        return this.searchTermHttpService.marshallSearchTerms(selectedSearchTerms);
    }

    /**
     * Remove the specified search term from the set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {SearchTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private removeSearchTermFromSelectedSet(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>, selectedTerm: SearchTerm): Map<string, Set<SearchTerm>> {

        const searchKey = selectedTerm.getSearchKey();
        const currentSearchTerms = searchTermsBySearchKey.get(searchKey);

        // Error state - return current state if facet is not present in the set of selected facets.
        if ( !currentSearchTerms ) {
            return searchTermsBySearchKey;
        }

        // Remove the selected term for the current set of selected term
        let updatedSearchTerms = Array.from(currentSearchTerms).reduce((accum, currentSearchTerm) => {

            if ( !_.isEqual(currentSearchTerm, selectedTerm) ) {
                accum.add(currentSearchTerm);
            }

            return accum;
        }, new Set<SearchTerm>());

        // Clone selected map for immutability
        const clonedTermsByFacetName = new Map(searchTermsBySearchKey);

        // Remove facet from selected set if it has no corresponding selected terms.
        if ( updatedSearchTerms.size === 0 ) {
            clonedTermsByFacetName.delete(searchKey);
        }
        // Otherwise, facet has other selected terms, set updated set!
        else {
            clonedTermsByFacetName.set(searchKey, updatedSearchTerms);
        }

        return clonedTermsByFacetName;
    }

    /**
     * Replace specified search term in set of selected search terms.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsBySearchKey
     * @param {SearchTerm} selectedTerm
     * @returns {Map<string, Set<SearchTerm>>}
     */
    private replaceSearchTermInSelectedSet(
        searchTermsBySearchKey: Map<string, Set<SearchTerm>>, selectedTerm: SearchTerm): Map<string, Set<SearchTerm>> {

        const searchKey = selectedTerm.getSearchKey();

        // Replace the newly selected search term in the set
        const updatedSearchTerms = new Set<SearchTerm>();
        updatedSearchTerms.add(selectedTerm);

        // Clone selected map for immutability and add updated set of selected terms for the specified facet
        const clonedTermsBySearchKey = new Map(searchTermsBySearchKey);
        clonedTermsBySearchKey.set(searchKey, updatedSearchTerms);
        return clonedTermsBySearchKey;
    }

    /**
     * Translate query string search terms to set of selected search terms.
     *
     * @param {QueryStringSearchTerm} queryStringSearchTerm
     * @returns {Set<SearchTerm>}
     */
    private translateQueryStringToSearchTerms(queryStringSearchTerm: QueryStringSearchTerm): Set<SearchTerm> {

        const searchKey = queryStringSearchTerm.facetName;
        return queryStringSearchTerm.value.reduce((accum, searchValue) => {

            if ( searchKey === FileFacetName.PROJECT_ID ) {
                accum.add(new SearchEntity(searchKey, searchValue, ""));
            }
            else if (searchKey === FacetAgeRangeName.ORGANISM_AGE_RANGE) {
                accum.add(new SearchAgeRange(searchKey, searchValue));
            }
            else {
                accum.add(new SearchFacetTerm(searchKey, searchValue));
            }

            return accum;
        }, new Set<SearchTerm>());
    }

    /**
     * Update values of selected search terms from the full set of possible search terms. This is required to cover
     * the case where app state is set up from URL state that contains a selected project ID. We need to grab the
     * corresponding project short names from the full set of possible search terms returned from the server (as the
     * short name is not in the URL).
     * 
     * @param {SearchTerm[]} searchTerms
     * @param {Map<string, Set<SearchTerm>>} selectedSearchTermsBySearchKey
     */
    private patchSearchTerms(searchTerms: SearchTerm[], selectedSearchTermsBySearchKey: Map<string, Set<SearchTerm>>) {
        
        // If there's no selected project IDs, return the selected search terms as is
        if ( !selectedSearchTermsBySearchKey.has(FileFacetName.PROJECT_ID) ) {
            return selectedSearchTermsBySearchKey;
        }

        // Group project ID search terms by search key - we'll use map as a quick reference to the selected search terms
        const allSearchTermsById = searchTerms
            .filter(searchTerm => searchTerm.getSearchKey() === FileFacetName.PROJECT_ID) 
            .reduce((accum, searchTerm) => {
                accum.set(searchTerm.getId(), searchTerm);
                return accum;
            }, new Map<string, SearchTerm>());

        // Update the current set of selected project search terms with values from the correpsonding search terms returned
        // from the server
        const patchedProjectSearchTerms = Array.from(selectedSearchTermsBySearchKey.get(FileFacetName.PROJECT_ID))
            .reduce((accum, selectedSearchTerm) => {

                const completeSearchTerm = allSearchTermsById.get(selectedSearchTerm.getId());
                if ( !!completeSearchTerm ) {
                    accum.add(new SearchEntity(
                        completeSearchTerm.getSearchKey(),
                        completeSearchTerm.getSearchValue(),
                        completeSearchTerm.getDisplayValue()));
                }
                return accum;
            }, new Set<SearchTerm>());

        const updatedSearchTermsBySearchKey = new Map(selectedSearchTermsBySearchKey);
        updatedSearchTermsBySearchKey.set(FileFacetName.PROJECT_ID, patchedProjectSearchTerms);
        return updatedSearchTermsBySearchKey;
    }
}
