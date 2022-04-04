/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Modal reducer, handles actions related to updating modal state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { CloseHamburgerAction } from "./close-hamburger.action";
import { HamburgerState } from "./hamburger.state";
import { ToggleHamburgerAction } from "./toggle-hamburger.action";

export function reducer(
    state: HamburgerState = HamburgerState.getDefaultState(),
    action: Action
): HamburgerState {
    switch (action.type) {
        // Handle case where hamburger has been closed
        case CloseHamburgerAction.ACTION_TYPE:
            return state.closeHamburger();

        // Handle case where hamburger has been toggled
        case ToggleHamburgerAction.ACTION_TYPE:
            return state.toggleHamburger();

        default:
            return state;
    }
}
