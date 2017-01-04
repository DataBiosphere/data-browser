// Core dependencies
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


// App dependencies
import {
    RequestFileManifestSummaryAction, RequestDownloadFileManifiestAction,
    SelectFileFacetAction
} from "./actions/file-actions";
import { FileFacetSelectedEvent } from "./file-facets/file-facet.events";
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";
import { FileManifestSummary } from "./file-manifest-summary/file-manifest-summary";
import {
    selectFileSummaryLoading, selectFileSummary, selectFileFacetsLoading,
    selectManifestSummaryLoading, selectRepositoryManifestSummaries, selectFileFacets
} from "./files.reducer";
import { selectKeywordsHits, selectKeywordFiles, selectKeywordDonors } from "../keywords/reducer/index";
import { ACTIONS } from "../shared/boardwalk.actions";
import { BoardwalkStore } from "../shared/boardwalk.model";

/**
 * Core files component, displays results summary as well as facets.
 */

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit {

    private route: ActivatedRoute;
    private store: Store<BoardwalkStore>;

    public selectFileSummaryLoading$: Observable<boolean>;
    public selectFileSummary$: Observable<FileSummary>;

    public fileFacetsLoading$: Observable<boolean>;
    public fileFacets$: Observable<FileFacet[]>;

    public manifestSummaryLoading$: Observable<boolean>;
    public manifestSummary$: Observable<FileManifestSummary[]>;

    public files$: Observable<any[]>;
    public donors$: Observable<any[]>;

    /**
     * @param route {ActivatedRoute}
     * @param store {Store<BoardwalkStore>}
     */
    constructor(route: ActivatedRoute,
                store: Store<BoardwalkStore>) {

        this.route = route;
        this.store = store;
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // File Summary
        this.selectFileSummaryLoading$ = selectFileSummaryLoading(this.store);
        this.selectFileSummary$ = selectFileSummary(this.store);

        // File Facets
        this.fileFacetsLoading$ = selectFileFacetsLoading(this.store);
        this.fileFacets$ = selectFileFacets(this.store);

        this.manifestSummaryLoading$ = selectManifestSummaryLoading(this.store);
        this.manifestSummary$ = selectRepositoryManifestSummaries(this.store);

        // this.hits$ = selectKeywordsHits(this.store);
        this.files$ = selectKeywordFiles(this.store);
        this.donors$ = selectKeywordDonors(this.store);

        //initialize the filter state from the params in the route.
        this.initQueryParams();

    }

    /**
     *
     * @param searchRequest
     */
    public onSearch(searchRequest: {searchTerm: string, type: string}) {
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
    public requestManifestSummary() {
        this.store.dispatch(new RequestFileManifestSummaryAction());
    }

    /**
     * Add/Remove Term from Facet Query
     *
     * @param termFacet
     */
    public onTermSelected(event: FileFacetSelectedEvent) {
        this.store.dispatch(new SelectFileFacetAction(event));
    }

    /**
     * Dispatch Manifest Download Request
     */
    public onDownloadManifest() {
        this.store.dispatch( new RequestDownloadFileManifiestAction());
    }

    /**
     * PRIVATES
     */

    /**
     * Parse queryParams into file filters
     */
    private initQueryParams() {

        this.route.queryParams
            .map((params) => {

                if (params && params["filters"] && params["filters"].length) {
                    return {
                        filters: JSON.parse(decodeURIComponent(params["filters"]))
                    };
                }
                else {
                    return {};
                }
            })
            .subscribe((query) => {
                this.store.dispatch({ type: ACTIONS.INIT_FILE_FACETS, payload: query });
            });
    }
}
