/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core files component, displays results summary as well as facets.
 */
// Core dependencies
import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
// App dependencies
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";
import { FetchFileManifestSummaryRequestAction } from "./_ngrx/file-manifest-summary/file-manifest-summary.actions";
import {
    selectEntities,
    selectFileFacetsFileFacets,
    selectFileSummary,
    selectSelectedEntity,
    selectSelectedFileFacets
} from "./_ngrx/file.selectors";
import { AppState } from "../_ngrx/app.state";
import { FetchFileFacetsRequestAction } from "./_ngrx/file-facet-list/file-facet-list.actions";
import { FileFacetSelectedEvent } from "./file-facets/file-facet.events";
import EntitySpec from "./_ngrx/table/entity-spec";
import { EntitySelectAction } from "./_ngrx/table/table.actions";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit {

    // Public variables
    public fileFacets$: Observable<FileFacet[]>;
    public projectDetail;
    public selectFileSummary$: Observable<FileSummary>;
    public selectedFileFacets$: Observable<FileFacet[]>;
    public entities$: Observable<EntitySpec[]>;
    public selectedEntity$: Observable<EntitySpec>;
    public noScroll: boolean;

    /**
     * @param route {ActivatedRoute}
     * @param store {Store<AppState>}
     */
    constructor(private elementRef: ElementRef,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) {

        this.projectDetail = false;
    }

    /**
     * Public API
     */

    public getProjectDetailTabs() {
        return ["Projects"];
    }

    /**
     * Remove scroll on body when menu is open
     *
     * @param value
     */
    public isMenuOpen(value) {

        this.noScroll = value;
        this.preventScroll();
    }

    /**
     * Prevent scroll on body when menu is open
     */
    public preventScroll() {

        let nativeElement = this.elementRef.nativeElement;
        let openedMenu = nativeElement.classList.contains("noScroll");
        if ( this.noScroll && !openedMenu ) {
            nativeElement.classList.add("noScroll");
        }
        else if ( !this.noScroll && openedMenu ) {
            nativeElement.classList.remove("noScroll");
        }
    }

    public onTabSelected(tab) {

        // this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
        this.router.navigate(["/" + tab.key], { queryParams: { entity: tab.key }}], { relativeTo: this.route });
      //  this.store.dispatch(new EntitySelectAction(tab.key));
    }

    /**
     * Dispatch action to request updated manifest summary (ie summary counts, file sizes etc)
     */
    public requestManifestSummary() {

        this.store.dispatch(new FetchFileManifestSummaryRequestAction());
    }

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

        this.entities$ = this.store.select(selectEntities);
        this.selectedEntity$ = this.store.select(selectSelectedEntity);

        // Initialize the filter state from the params in the route.
        this.initQueryParams();

        // Sets up element by id
        this.getComponentElementById();

        // Return component heights for sticky header
        if (!this.projectDetail) {
            // TODO I think this is causing an exception when adjusting screen size @fran
            this.getComponentHeight();
        }
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

                if (params && params["filter"] && params["filter"].length) {

                    let filterParam = decodeURIComponent(params["filter"]);
                    let filter
                    try {
                        filter = JSON.parse(filterParam);
                    }
                    catch (err) {
                        console.log(err);
                    }

                    if (filter && filter.facetName) {
                        return filter;
                    }
                    else {
                        return "";
                    }
                }
            })
            .subscribe((filter) => {
                if (filter) {
                    this.store.dispatch(new FetchFileFacetsRequestAction(new FileFacetSelectedEvent(filter.facetName, filter.termName, true)));
                }
                else {
                    this.store.dispatch(new FetchFileFacetsRequestAction());
                }
            });
    }
}
