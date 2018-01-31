/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 * 
 * File list-related actions.
 */

import { Action } from "@ngrx/store";
import { FileFacet } from "../../shared/file-facet.model";
import { FileFacetSelectedEvent } from "../../file-facets/file-facet.events";

export class FetchFileFacetsRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_REQUEST";
    public readonly type = FetchFileFacetsRequestAction.ACTION_TYPE;
    constructor() {}
}

export class FetchFileFacetsSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.FETCH_SUCCESS";
    public readonly type = FetchFileFacetsSuccessAction.ACTION_TYPE;
    constructor(public readonly fileFacets: FileFacet[]) {}
}

/**
 * Action that is triggered when file facet term is selected. Select can be dispatched from facet card itself or from 
 * corresponding term menu displayed over facet card (this includes search facets and their menus).
 */
export class SelectFileFacetAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.SELECT_FACET";
    public readonly type = SelectFileFacetAction.ACTION_TYPE;
    constructor(public readonly event: FileFacetSelectedEvent) {}
}

export class ClearSelectedFileFacetsAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.CLEAR_SELECTED";
    public readonly type = ClearSelectedFileFacetsAction.ACTION_TYPE;
    constructor() {}
}

export type All
    = FetchFileFacetsRequestAction
    | FetchFileFacetsSuccessAction
    | SelectFileFacetAction
    | ClearSelectedFileFacetsAction;

