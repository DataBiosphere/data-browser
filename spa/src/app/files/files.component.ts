/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Core files component, displays results summary as well as facets.
 */

// Core dependencies
import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";

// App dependencies
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";
import { FetchFileManifestSummaryRequestAction } from "./_ngrx/file-manifest-summary/file-manifest-summary.actions";
import {
    selectFileFacetsFileFacets,
    selectFileSummary,
    selectSelectedFileFacets,
    selectEntities,
    selectSelectedEntity, selectSelectedViewState
} from "./_ngrx/file.selectors";
import { AppState } from "../_ngrx/app.state";
import { EntitySelectAction } from "./_ngrx/table/table.actions";
import EntitySpec from "./shared/entity-spec";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnDestroy, OnInit {

    // Public variables
    public fileFacets$: Observable<FileFacet[]>;
    public projectDetail;
    public selectFileSummary$: Observable<FileSummary>;
    public selectedFileFacets$: Observable<FileFacet[]>;
    public entities$: Observable<EntitySpec[]>;
    public selectedEntity$: Observable<EntitySpec>;
    public noScroll: boolean;

    // Locals
    private urlUpdater: Subscription;

    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {ActivatedRoute} route
     * @param {Router} router
     * @param {Store<AppState>} store
     * @param {ElementRef} elementRef
     * @param {Location} location
     */
    constructor(private activatedRoute: ActivatedRoute,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>,
                private elementRef: ElementRef,
                private location: Location) {

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
     * Handle click on tab - update selected entity.
     *
     * @param {EntitySpec} tab
     */
    public onTabSelected(tab: EntitySpec) {

        this.store.dispatch(new EntitySelectAction(tab.key));
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
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        if ( this.urlUpdater ) {
            this.urlUpdater.unsubscribe();
        }
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // Grab the counts etc
        this.selectFileSummary$ = this.store.select(selectFileSummary);

        // Get the list of facets to display
        this.fileFacets$ = this.store.select(selectFileFacetsFileFacets);

        // Get the set of selected facet terms
        this.selectedFileFacets$ = this.store.select(selectSelectedFileFacets);

        // Grab the set of tabs to be displayed
        this.entities$ = this.store.select(selectEntities);

        // Determine the current selected tab
        this.selectedEntity$ = this.store.select(selectSelectedEntity);

        // Set up the URL state management - write the browser address bar when the selected facets change.
        this.store.select(selectSelectedViewState)
            .distinctUntilChanged((previous, current) => {
                return _.isEqual(previous, current);
            })
            .subscribe((viewState) => {

                // Convert facets to query string state
                const queryStringFacets = viewState.selectSelectedFileFacets.reduce((accum, selectedFacet) => {
                    accum.add({
                        facetName: selectedFacet.name,
                        terms: selectedFacet.selectedTerms.map(term => term.name)
                    });
                    return accum;
                }, new Set<any>());

                const path = viewState.selectSelectedEntity.key;
                const params = new URLSearchParams();
                if ( queryStringFacets.size > 0 ) {
                    params.set("filter", JSON.stringify(Array.from(queryStringFacets)));
                }

                this.location.replaceState(path, params.toString());
            });
    }
}
