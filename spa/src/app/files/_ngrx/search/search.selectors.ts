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
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";

// Search slice
export const selectSearch = createFeatureSelector<SearchState>("search");

// Returns true if selected search terms are in a loading state
export const selectIsSelectedTermsLoading = createSelector(
    selectSearch,
    (state) => state.selectedSearchTermsLoading
);

// Complete set of possible search terms to select from
export const selectSearchTerms = createSelector(
    selectSearch,
    (state) => state.searchTerms
);

// Selected search terms - current set of selected file facet terms and entities
export const selectSelectedSearchTerms = createSelector(
    selectSearch,
    (state) => state.selectedSearchTerms
);

// Selected search terms by search key - current set of selected file facet terms and entities keyed by file facet name
// or entity, respectively.
export const selectSelectedSearchTermsBySearchKey = createSelector(
    selectSearch,
    (state) => state.selectedSearchTermsBySearchKey
);

// Selected project search terms - returns the current set of selected projects
export const selectSelectedProjectSearchTerms = createSelector(
    selectSearch,
    (state) => {
        return state.selectedSearchTerms.filter((searchTerm: SearchTerm) => {
            return searchTerm.getSearchKey() === FileFacetName.PROJECT_ID;
        });
    }
);

// Select the current query from the search state
export const selectCurrentQuery = createSelector(
    selectSearch,
    (state) => state.currentQuery
);

// Select the previous query from the search state
export const selectPreviousQuery = createSelector(
    selectSearch,
    (state) => state.previousQuery
);
