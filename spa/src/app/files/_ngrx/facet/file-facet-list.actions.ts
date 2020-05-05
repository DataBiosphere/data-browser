/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Facet-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

/**
 * Action dispatched when file fileFacets are to be updated. This can be on load of app, select or clear of fileFacets, or
 * select of project.
 *
 * @param {boolean} updateTableData - True if table data is to be updated. This is false on select of project as we
 * want table data and state (eg pagination) to remain unchanged on select of project.
 */
export class FetchFileFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.FETCH_REQUEST";
    public readonly type = FetchFileFacetsRequestAction.ACTION_TYPE;

    constructor(public readonly updateTableData: boolean) {}
}

export class NoOpAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.NOOP";
    public readonly type = NoOpAction.ACTION_TYPE;

    constructor() {}
}

/**
 * Action dispatched when entity state is not yet cached and needs to be initialized.
 */
export class InitEntityStateAction implements Action {
    public static ACTION_TYPE = "FILE.FACET.INIT_ENTITY_STATE";
    public readonly type = InitEntityStateAction.ACTION_TYPE;
    constructor() {}
}

export type All
    =  FetchFileFacetsRequestAction
    | InitEntityStateAction
    | NoOpAction;
