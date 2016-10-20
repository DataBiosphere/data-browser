import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { RepositoryFilesState, repositoryFilesSelectors } from "../repository-files";
import { RepositorySummaryState, repositorySummarySelectors } from "../repository-summary";
import { BoardwalkStore, ACTIONS } from "./../../shared";
import { RepositoryDAO } from "./repository.dao";


@Injectable()
export class RepositoryService {

    private summary$: Observable<RepositorySummaryState>;
    private files$: Observable<RepositoryFilesState>;

    constructor(private repositoryDAO: RepositoryDAO,
                private store: Store<BoardwalkStore>) {
        this.summary$ = this.store.select<RepositorySummaryState>("repositorySummary");
        this.files$ = this.store.select<RepositoryFilesState>("repositoryFiles");
    }

    /**
     * Fetch Repository Summary
     *
     * @param filter
     */
    fetchRepositorySummary(filter: Object = {}) {

        this.repositoryDAO
            .fetchRepositorySummary(filter)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_REPOSITORY_SUMMARY,
                    payload: response
                };
            })
            .subscribe((action) => {
                this.store.dispatch(action);
            });
    }

    /**
     * Fetch Repository Files
     *
     * @param filter
     */
    fetchRepositoryFiles(filter: Object = {}) {

        this.repositoryDAO
            .fetchRepositoryFiles(filter)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_REPOSITORY_FILES,
                    payload: response
                };
            })
            .subscribe(((action) => {
                this.store.dispatch(action);
            }));
    }

    /**
     * SELECTORS
     */
    getRepositorySummary() {
        return repositorySummarySelectors.getRepositorySummary(this.summary$);
    }

    getRepositorySummaryLoaded() {
        return repositorySummarySelectors.getRepositorySummaryLoaded(this.summary$);
    }

    getRepositoryFiles() {
        return repositoryFilesSelectors.getRepositoryFiles(this.files$);
    }

    getRepositoryFilesLoaded() {
        return repositoryFilesSelectors.getRepositoryFilesLoaded(this.files$);
    }
}
