/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State containing HTTP-related information (eg HTTP errors).
 * 
 * TODO Update to reflect handling of client-side errors (#1504)
 */

// App dependencies
import { ErrorAction } from "./error.action";
import { ErrorResponseAction } from "./http-error-response.actions";
import { ClearErrorStateAction } from "./http-clear-state-error.actions";

export class HttpState {

    /**
     * @param {string} requestUrl
     * @param {number} statusCode
     * @param {string} errorMessage
     */
    constructor(
        public readonly requestUrl?: string, public readonly statusCode?: number, public readonly errorMessage?: string) {}

    /**
     * Create default state - no errors.
     *
     * @returns {HttpState}
     */
    public static getDefaultState() {

        return new HttpState();
    }

    /**
     * Clear error status code and message.
     *
     * @param {ClearErrorStateAction} action
     * @returns {HttpState}
     */
    public clearErrorState(action: ClearErrorStateAction): HttpState {

        // Not returned default state here as we may add other non error-related values to the state at a later date.
        return new HttpState();
    }

    /**
     * Handle error response returned from server.
     *
     * @param {ErrorResponseAction} action
     * @returns {HttpState}
     */
    public receiveErrorResponse(action: ErrorResponseAction): HttpState {

        return new HttpState(action.requestUrl, action.statusCode, action.errorMessage);
    }

    /**
     * Handle client-side error.
     *
     * @param {ErrorAction} action
     * @returns {HttpState}
     */
    public setErrorMessage(action: ErrorAction): HttpState {

        return new HttpState("", 0, action.errorMessage);
    }
}
