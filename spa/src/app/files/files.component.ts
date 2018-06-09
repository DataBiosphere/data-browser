/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core files component, displays results summary as well as facets.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

// App dependencies
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";

import { FetchFileManifestSummaryRequestAction } from "./_ngrx/file-manifest-summary/file-manifest-summary.actions";
import { selectFileFacetsFileFacets, selectFileSummary, selectSelectedFileFacets } from "./_ngrx/file.selectors";
import { AppState } from "../_ngrx/app.state";
import { FetchFileFacetsRequestAction } from "./_ngrx/file-facet-list/file-facet-list.actions";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit {

    // Locals
    private route: ActivatedRoute;
    private store: Store<AppState>;

    // Public variables
    public selectFileSummary$: Observable<FileSummary>;
    public fileFacets$: Observable<FileFacet[]>;
    public selectedFileFacets$: Observable<FileFacet[]>;

    /**
     * @param route {ActivatedRoute}
     * @param store {Store<AppState>}
     */
    constructor(route: ActivatedRoute,
                store: Store<AppState>) {

        this.route = route;
        this.store = store;
    }

    /**
     * Public API
     */

    public compareComponentHeight(event) {
        this.getComponentHeight();
    }

    /**
     * Returns component heights for calculating sticky header position
     */
    public getComponentHeight() {

        // Get height for each component
        let hcaExplore = document.getElementById("hcaExplore");
        let hcaFilterWrapper = document.getElementById("hcaFilterWrapper");
        let hcaTab = document.getElementById("hcaTab");

        // Allocate top position based on calculated height
        document.getElementById("hcaExplore").style.top = "0px";
        document.getElementById("hcaFilterWrapper").style.top = hcaExplore.offsetHeight + "px";
        document.getElementById("hcaTab").style.top = hcaExplore.offsetHeight + hcaFilterWrapper.offsetHeight + "px";
        document.getElementById("hcaFileSummary").style.top = hcaExplore.offsetHeight + hcaFilterWrapper.offsetHeight + hcaTab.offsetHeight + "px";
    }

    /**
     * Window resize triggers a re-calculation of component heights
     * @param event
     */
    public onResize() {

        this.getComponentHeight();
    }

    /**
     * Dispatch action to request updated manifest summary (ie summary counts, file sizes etc)
     */
    public requestManifestSummary() {

        this.store.dispatch(new FetchFileManifestSummaryRequestAction());
    }

    /**
     * Dispatch action to download manifest summary.
     */
    // public onDownloadManifest() {
    //
    //     this.store.dispatch(new DownloadFileManifestAction());
    // }

    /**
     * Life cycle hooks
     */

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // File Summary
        this.selectFileSummary$ = this.store.select(selectFileSummary);

        // File Facets
        this.fileFacets$ = this.store.select(selectFileFacetsFileFacets);

        this.selectedFileFacets$ = this.store.select(selectSelectedFileFacets);

        // Initialize the filter state from the params in the route.
        this.initQueryParams();

        // Return component heights for sticky header
        this.getComponentHeight();

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

                if ( params && params["filters"] && params["filters"].length ) {
                    return {
                        filters: JSON.parse(decodeURIComponent(params["filters"]))
                    };
                }
                else {
                    return {};
                }
            })
            .subscribe((query) => {
                this.store.dispatch(new FetchFileFacetsRequestAction());
            });
    }
}
