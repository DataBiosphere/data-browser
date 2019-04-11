/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action dispatched when current set of selected facet terms, as well as the corresponding tab (entity) are to be
 * stored. Currently, this action is dispatched on app init when app state is read from URL params.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { QueryStringFacet } from "../../shared/query-string-facet.model";

export class SetViewStateAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_LIST.SET_VIEW_STATE";
    public readonly type = SetViewStateAction.ACTION_TYPE;
    constructor(public selectedEntity: string, public selectedFacets: QueryStringFacet[]) {}
}
