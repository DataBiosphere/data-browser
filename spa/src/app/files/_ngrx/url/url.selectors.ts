/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying state required for URL-related functionality, from the store.
 */

// Core dependencies
import { createSelector } from "@ngrx/store";

// App dependencies
import { selectSelectedEntitySpec } from "../file.selectors";
import { selectSelectedSearchTermsBySearchKey } from "../search/search.selectors";

/**
 * Return the selected entity spec (required for path-related functionality) and selected search terms (required
 * for filter query string param functionality), combined into a single object.
 */
export const selectUrlSpecState  = createSelector(
    selectSelectedEntitySpec, selectSelectedSearchTermsBySearchKey,
    (selectedEntitySpec, selectedSearchTermsBySearchKey) => {
        return {selectedEntitySpec, selectedSearchTermsBySearchKey};
    });
