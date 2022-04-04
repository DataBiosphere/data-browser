/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying hamburger-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { HamburgerState } from "./hamburger.state";

/**
 * Get the hamburger state.
 */
export const selectHamburger =
    createFeatureSelector<HamburgerState>("hamburger");

/**
 * Returns true if hamburger is currently open, otherwise false.
 */
export const selectHamburgerOpen = createSelector(
    selectHamburger,
    (state: HamburgerState) => state.open
);
