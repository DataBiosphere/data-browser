/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying search-related state from the store.
 */

// Core dependencies
import { createFeatureSelector, createSelector } from "@ngrx/store";

// App dependencies
import { SearchState } from "./search.state";
import { SearchTerm } from "../../search/search-term.model";
import { FileFacetName } from "../../shared/file-facet-name.model";

// Search slice
export const selectSearch = createFeatureSelector<SearchState>("search");

// Search terms - current set of selected file facet terms and entities
export const selectSearchTerms = createSelector(selectSearch, (state) => state.searchTerms);

// Search terms by facet name - current set of selected file facet terms and entities keyed by facet name
export const selectSearchTermsByFacetName = createSelector(selectSearch, (state) => state.searchTermsByFacetName);

// Project search terms - returns the current set of selected projects
export const selectProjectSearchTerms = createSelector(selectSearch, (state) => {
    return state.searchTerms.filter((searchTerm: SearchTerm) => {
        return searchTerm.facetName === FileFacetName.PROJECT ||
            searchTerm.facetName === FileFacetName.PROJECT_ID;
    });
});
