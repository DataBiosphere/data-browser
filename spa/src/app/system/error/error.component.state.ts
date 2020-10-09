/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing error component.
 */

export interface ErrorComponentState {
    errorMessage?: string;
    loaded: boolean;
    requestUrl?: string;
}
