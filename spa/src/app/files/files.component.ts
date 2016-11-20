import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

import { FilesDispatcher } from "./shared/files.dispatcher";
import {
    selectFileSummaryLoading, selectFileSummary, selectFileFacetsLoading,
    selectUserStateFileFacets, selectManifestSummaryLoading, selectRepositoryManifestSummaries
} from "./reducer/index";

import { FileFacet } from "./file-facets/file-facets";
import { FileSummary } from "./file-summary/file-summary";
import { BoardwalkStore } from "../shared/boardwalk.model";
import { FileManifestSummary } from "./file-manifest-summary/file-manifest-summary";
import { selectKeywordsHits, selectKeywordFiles, selectKeywordDonors } from "../keywords/reducer/index";
import { ACTIONS } from "../shared/boardwalk.actions";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.css"]
})
export class FilesComponent implements OnInit {

    summaryLoading$: Observable<boolean>;
    summary$: Observable<FileSummary>;
    facetsLoading$: Observable<boolean>;
    facets$: Observable<FileFacet[]>;
    manifestSummaryLoading$: Observable<boolean>;
    manifestSummary$: Observable<FileManifestSummary[]>;
    files$: Observable<any[]>;
    donors$: Observable<any[]>;

    constructor(private route: ActivatedRoute,
                private store: Store<BoardwalkStore>,
                private fileDispatcher: FilesDispatcher
    ) { }

    ngOnInit() {
        this.initSelectors();
        this.getQueryParams();
    }

    onSearch(searchRequest: {searchTerm: string, type: string}) {
        if (searchRequest.searchTerm.length > 2) {
            return this.store.dispatch({
                type: ACTIONS.REQUEST_KEYWORDS_QUERY,
                payload: searchRequest
            });
        }
        return this.store.dispatch({type: ACTIONS.CLEAR_KEYWORDS_QUERY, payload: {
            type: searchRequest.type
        }});
    }

    /**
     * Request Manifest Summary
     */
    requestManifestSummary() {
        this.fileDispatcher.requestFileManifestSummary();
    }

    /**
     * Add/Remove Term from Facet Query
     *
     * @param termFacet
     */
    onTermSelected(termFacet: {facet: string; term: string}) {
        this.fileDispatcher.addFileFilter(termFacet);
    }

    /**
     * Dispatch Manifest Download Request
     */
    onDownloadManifest() {
        this.fileDispatcher.downloadFileManifest();
    }

    /**
     * PRIVATES
     */

    private initSelectors() {
        this.summaryLoading$ = selectFileSummaryLoading(this.store);
        this.summary$ = selectFileSummary(this.store);
        this.facetsLoading$ = selectFileFacetsLoading(this.store);
        this.facets$ = selectUserStateFileFacets(this.store);
        this.manifestSummaryLoading$ = selectManifestSummaryLoading(this.store);
        this.manifestSummary$ = selectRepositoryManifestSummaries(this.store);
        // this.hits$ = selectKeywordsHits(this.store);
        this.files$ = selectKeywordFiles(this.store);
        this.donors$ = selectKeywordDonors(this.store);

    }

    /**
     * Parse queryParams into file filters
     */
    private getQueryParams() {

        this.route.queryParams
            .map((query) => {

                if (query && query["filters"] && query["filters"].length) {
                    return {
                        filters: JSON.parse(decodeURIComponent(query["filters"]))
                    };
                }
                else {
                    return {};
                }
            })
            .subscribe((query) => {
                this.fileDispatcher.receiveFileFilters(query);
            });
    }
}
