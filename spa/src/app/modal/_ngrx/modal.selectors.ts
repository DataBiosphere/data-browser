/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying modal-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { ModalState } from "./modal.state";

/**
 * Get the modal state.
 */
export const selectModal = createFeatureSelector<ModalState>("modal");

/**
 * Returns true if modal is currently open, otherwise false.
 */
export const selectModalOpen = createSelector(
    selectModal,
    (state: ModalState) => state.open
);
