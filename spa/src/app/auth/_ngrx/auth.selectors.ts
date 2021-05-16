/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying auth-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { AuthState } from "./auth.state";

/**
 * Get the auth state from the app state.
 */
export const selectAuth = createFeatureSelector<AuthState>("auth");

/**
 * Return true if the auth state has been initialized.
 */
export const selectAuthInit =
    createSelector(selectAuth, (state: AuthState) => state.init);

/**
 * Return true if the user is authenticated
 */
export const selectAuthenticated =
    createSelector(selectAuth, (state: AuthState) => state.authenticated);

/**
 * Returns the current authenticated user, if any.
 */
export const selectUser =
    createSelector(selectAuth, (state: AuthState) => state.user);
