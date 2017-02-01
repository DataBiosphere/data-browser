import { Action } from "@ngrx/store";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { ACTIONS } from "../../shared/boardwalk.actions";

export class SelectFileFacetAction implements Action {
    public readonly type = ACTIONS.FILE_FACET_SELECTED;
    payload: FileFacetSelectedEvent;

    constructor(event: FileFacetSelectedEvent) {
        this.payload = event;
    }
}