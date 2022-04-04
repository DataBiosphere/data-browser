/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Selectors for querying Terra auth-related state from the store.
 */

// Core dependencies
import { createSelector, createFeatureSelector } from "@ngrx/store";

// App dependencies
import { selectAuthenticated } from "../../auth/_ngrx/auth.selectors";
import { TerraAuthState } from "./terra-auth.state";

/**
 * Get the Terra auth state from the app state.
 */
export const selectTerraAuth =
    createFeatureSelector<TerraAuthState>("terraAuth");

/**
 * Return true if the auth state has been initialized.
 */
export const selectTerraAuthInit = createSelector(
    selectTerraAuth,
    (state: TerraAuthState) => state.init
);

/**
 * Return true if the user is registered with Terra
 */
export const selectTerraRegistered = createSelector(
    selectTerraAuth,
    (state: TerraAuthState) => state.registered
);

/**
 * Return true if the user is registered with Terra
 */
export const selectTerraAuthInitAndRegistered = createSelector(
    selectTerraAuth,
    (state: TerraAuthState) => ({
        init: state.init,
        registered: state.registered,
    })
);

/**
 * Returns true if Terra registration is required.
 */
export const selectTerraRegistrationRequired = createSelector(
    selectAuthenticated,
    selectTerraAuth,
    (authenticated: boolean, terraAuthState: TerraAuthState) =>
        authenticated && terraAuthState.init && !terraAuthState.registered
);
