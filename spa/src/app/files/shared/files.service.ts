import { Injectable } from "@angular/core";
import { Store, Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs/observable/combineLatest";

import { ACTIONS } from "./../../shared";
import { FilesDAO } from "./files.dao";
import { State } from "../reducer/index";

@Injectable()
export class FilesService {

    constructor(private fileDAO: FilesDAO,
                private store: Store<State>) {}

    /**
     * Send Both Requests
     *
     * @param filter
     */
    fetchFileData(filter: Object = {}): void {
        this.fetchFileSummary(filter);
        this.fetchFileFacets(filter);
    }

    /**
     * Fetch File Summary
     *
     * @param filter
     */
    fetchFileSummary(filter: Object = {}): void {

        this.fetchFileSummaryObs(filter)
            .subscribe((action) => {
                this.store.dispatch(action);
            });
    }

    /**
     * Fetch File Files
     *
     * @param filter
     */
    fetchFileFacets(filter: Object = {}): void {

        this.fetchFileFacetsObs(filter)
            .subscribe(((action) => {
                this.store.dispatch(action);
            }));
    }

    fetchFileFacetsObs(filter = {}): Observable<Action> {
        return this.fileDAO
            .fetchFileFacets(filter)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_FILE_FACETS,
                    payload: response
                };
            });
    }

    fetchFileSummaryObs(filter = {}): Observable<Action> {
        return this.fileDAO
            .fetchFileSummary(filter)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_FILE_SUMMARY,
                    payload: response
                };
            });
    }
}
