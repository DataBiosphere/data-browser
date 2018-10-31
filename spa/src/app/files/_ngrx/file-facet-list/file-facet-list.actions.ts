/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * File list-related actions.
 */

import { Action } from "@ngrx/store";
import { FileFacet } from "../../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../../file-facets/file-facet.events";
import { QueryStringFacet } from "../../shared/query-string-facet.model";

export class FetchFileFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_REQUEST";
    public readonly type = FetchFileFacetsRequestAction.ACTION_TYPE;

    constructor(public readonly fileFacetSelectedEvent?: FileFacetSelectedEvent) {}
}

export class FetchFileFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_SUCCESS";
    public readonly type = FetchFileFacetsSuccessAction.ACTION_TYPE;

    constructor(public readonly fileFacets: FileFacet[], public readonly fileFacetSelectedEvent?: FileFacetSelectedEvent) {}
}

/**
 * Action that is triggered when file facet term is selected. Select can be dispatched from facet card itself or from
 * corresponding term menu displayed over facet card (this includes search facets and their menus).
 */
export class SelectFileFacetAction implements Action { // TODO rename to SelectFileFacetTermAction - this is fired when a term is selected from a facet drop down (and not when a drop down itself is opened)
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.SELECT_FACET";
    public readonly type = SelectFileFacetAction.ACTION_TYPE;

    constructor(public readonly event: FileFacetSelectedEvent) {}
}

export class ClearSelectedFileFacetsAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.CLEAR_SELECTED";
    public readonly type = ClearSelectedFileFacetsAction.ACTION_TYPE;

    constructor() {}
}

export class ClearSelectedTermsAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.CLEAR_SELECTED_TERMS";
    public readonly type = ClearSelectedTermsAction.ACTION_TYPE;

    constructor() {}
}

export class NoOpAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.NOOP";
    public readonly type = NoOpAction.ACTION_TYPE;

    constructor() {}
}

/**
 * Action dispatched when overall, original, file-related file facets are to be requested from the endpoint API.
 */
export class FetchUnfacetedFileFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.UNFACETED_FILE_FACETS.FETCH_REQUEST";
    public readonly type = FetchUnfacetedFileFacetsRequestAction.ACTION_TYPE;
    constructor() {}
}

/**
 * Action dispatched when overall, original, file-realted file facets have been requested and successfully returned 
 * from the endpoint API.
 */
export class FetchUnfacetedFileFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.UNFACETED_FILE_FACETS.FETCH_SUCCESS";
    public readonly type = FetchUnfacetedFileFacetsSuccessAction.ACTION_TYPE;
    constructor(public readonly fileFacets: FileFacet[]) {}
}


/**
 * Action dispatched when current set of selected facet terms, as well as the corresponding tab (entity) are to be
 * stored. Currently, this action is dispatched on app init when app state is read from URL params.
 */
export class SetViewStateAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.SET_VIEW_STATE";
    public readonly type = SetViewStateAction.ACTION_TYPE;
    constructor(public selectedEntity: string, public selectedFacets: QueryStringFacet[]) {}
}

export type All
    =  ClearSelectedFileFacetsAction
    | FetchFileFacetsRequestAction
    | FetchFileFacetsSuccessAction
    | NoOpAction
    | SelectFileFacetAction
    | SetViewStateAction
    | FetchUnfacetedFileFacetsSuccessAction
    | FetchUnfacetedFileFacetsRequestAction;

