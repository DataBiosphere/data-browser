import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../reducer";
import { ACTIONS } from "../../shared/boardwalk.actions";
import { Dictionary } from "../../shared/dictionary";

@Injectable()
export class FilesDispatcher {

    constructor(private store: Store<State>) {}

    addFileFilter(termFacet: {facet: string; term: string}) {
        this.store.dispatch({ type: ACTIONS.SELECT_FILE_FILTER, payload: termFacet });
    }

    receiveFileFilters(filters: Dictionary<string[]>) {
        this.store.dispatch({ type: ACTIONS.RECEIVE_FILE_FILTERS, payload: filters });
    }

    requestFileManifestSummary() {
        this.store.dispatch({ type: ACTIONS.REQUEST_FILE_MANIFEST_SUMMARY});
    }

    downloadFileManifest() {
        this.store.dispatch({ type: ACTIONS.REQUEST_DOWNLOAD_FILE_MANIFEST });
    }
}
