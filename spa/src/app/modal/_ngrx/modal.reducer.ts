/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Modal reducer, handles actions related to updating modal state.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ModalClosedAction } from "./modal-closed.action";
import { ModalOpenedAction } from "./modal-opened.action";
import { ModalState } from "./modal.state";

/**
 * @param state {ModalState}
 * @param action {Action}
 * @returns {ModalState}
 */
export function reducer(
    state: ModalState = ModalState.getDefaultState(),
    action: Action
): ModalState {
    switch (action.type) {
        // Handle case where modal was closed
        case ModalClosedAction.ACTION_TYPE:
            return state.closeModal();

        // Handle case where modal was opened
        case ModalOpenedAction.ACTION_TYPE:
            return state.openModal();

        default:
            return state;
    }
}
