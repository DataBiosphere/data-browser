// Core dependencies
import { AfterViewInit, Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";


// App dependencies
import {
    RequestFileManifestSummaryAction, RequestDownloadFileManifestAction,
} from "./actions/file-actions";
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
 * Core files component, displays results summary as well as facets. Also handles "snap" of results summary by
 * listening to wheel event on the host element. Listener must be setup on this component due to it's overflow-y spec
 * (and it therefore can listen to the scroll event, and also determine the scroll Y).
 */

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements AfterViewInit, OnInit {

    // Locals
    private elementRef: ElementRef;
    private route: ActivatedRoute;
    private store: Store<BoardwalkStore>;

    // Public variables
    public selectFileSummaryLoading$: Observable<boolean>;
    public selectFileSummary$: Observable<FileSummary>;
    public fileFacetsLoading$: Observable<boolean>;
    public fileFacets$: Observable<FileFacet[]>;
    public manifestSummaryLoading$: Observable<boolean>;
    public manifestSummary$: Observable<FileManifestSummary[]>;
    public files$: Observable<any[]>;
    public donors$: Observable<any[]>;

    /**
     * @param elementRef {ElementRef}
     * @param route {ActivatedRoute}
     * @param store {Store<BoardwalkStore>}
     */
    constructor(elementRef: ElementRef,
                route: ActivatedRoute,
                store: Store<BoardwalkStore>) {

        this.elementRef = elementRef;
        this.route = route;
        this.store = store;
    }

    /**
     * Public API
     */

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
        return this.store.dispatch({
            type: ACTIONS.CLEAR_KEYWORDS_QUERY, payload: {
                type: searchRequest.type
            }
        });
    }

    /**
     * Request manifest summary
     */
    public requestManifestSummary() {

        this.store.dispatch(new RequestFileManifestSummaryAction());
    }


    /**
     * Dispatch Manifest Download Request
     */
    public onDownloadManifest() {
        this.store.dispatch(new RequestDownloadFileManifestAction());
    }

    /**
     * Snap results summary element if beyond certain scroll point.
     *
     * @param wheelEvent
     */
    snapSummary(wheelEvent: WheelEvent) {

    }

    /**
     * Life cycle hooks
     */

    /**
     * Set up snap of results summary element
     */
    public ngAfterViewInit() {

        let nativeElement = this.elementRef.nativeElement;
        Observable.fromEvent(nativeElement, "wheel")
            .subscribe(() => {

                let snapped = nativeElement.classList.contains("snap");
                if (nativeElement.scrollTop > 16 && !snapped) {
                    nativeElement.classList.add("snap");
                }

                if (nativeElement.scrollTop < 16 && snapped) {
                    nativeElement.classList.remove("snap");
                }
            });
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

        // initialize the filter state from the params in the route.
        this.initQueryParams();

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
