/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * State containing HTTP-related information (eg HTTP errors).
 */
import { ErrorResponseAction } from "./http-error-response.actions";
import { ClearErrorStateAction } from "./http-clear-state-error.actions";

// App dependencies

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
}
