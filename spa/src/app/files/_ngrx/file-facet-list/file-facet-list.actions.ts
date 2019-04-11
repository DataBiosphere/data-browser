/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * File list-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileFacetTermSelectedEvent } from "../../shared/file-facet-term-selected.event";
import { FileFacet } from "../../shared/file-facet.model";

/**
 * Action dispatched when file facets are to be updated. This can be on load of app, select or clear of facets, or
 * select of project.
 *
 * @param {boolean} updateTableData - True if table data is to be updated. This is false on select of project as we
 * want table data and state (eg pagination) to remain unchanged on select of project.
 */
export class FetchFileFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_REQUEST";
    public readonly type = FetchFileFacetsRequestAction.ACTION_TYPE;

    constructor(public readonly updateTableData: boolean) {}
}

export class FetchFileFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_SUCCESS";
    public readonly type = FetchFileFacetsSuccessAction.ACTION_TYPE;

    constructor(public readonly fileFacets: FileFacet[], public readonly fileFacetSelectedEvent?: FileFacetTermSelectedEvent) {}
}

export class ClearSelectedFileFacetsAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.CLEAR_SELECTED";
    public readonly type = ClearSelectedFileFacetsAction.ACTION_TYPE;

    constructor() {}
}

export class NoOpAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.NOOP";
    public readonly type = NoOpAction.ACTION_TYPE;

    constructor() {}
}

/**
 * Action dispatched when entity state is not yet cached and needs to be initialized.
 */
export class InitEntityStateAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.INIT_ENTITY_STATE";
    public readonly type = InitEntityStateAction.ACTION_TYPE;
    constructor() {}
}

export type All
    =  ClearSelectedFileFacetsAction
    | FetchFileFacetsRequestAction
    | FetchFileFacetsSuccessAction
    | InitEntityStateAction
    | NoOpAction;
