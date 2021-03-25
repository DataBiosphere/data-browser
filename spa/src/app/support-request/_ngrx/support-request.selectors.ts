/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying support request-related state from the config store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { SupportRequestState } from "./support-request.state";

/**
 * Get the support request state from the app state.
 */
export const selectSupportRequest = createFeatureSelector<SupportRequestState>("supportRequest");

/**
 * Return the active value from the support request state.
 */
export const selectSupportRequestActive =
    createSelector(selectSupportRequest, (state: SupportRequestState) => state.supportRequest.active);

/**
 * Return the source (either footer link or blue support request button) for tracking.
 */
export const selectSupportRequestSource =
    createSelector(selectSupportRequest, (state: SupportRequestState) => state.supportRequest.source);

/**
 * Return the error value from the support request state.
 */
export const selectSupportRequestSupportRequest =
    createSelector(selectSupportRequest, (state: SupportRequestState) => state.supportRequest);
