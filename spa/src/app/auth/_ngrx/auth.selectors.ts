import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

/**
 * Select Auth State
 */
export const selectAuth = createFeatureSelector<AuthState>("auth");

/**
 * Select Authenticated
 *
 * @type {MemoizedSelector<Object, boolean>}
 */
export const selectAuthenticated = createSelector(selectAuth, (state: AuthState) => state.authenticated);

/**
 * Select User
 *
 * @type {MemoizedSelector<Object, User>}
 */
export const selectAuthenticatedUser = createSelector(selectAuth, (state: AuthState) => state.user);
