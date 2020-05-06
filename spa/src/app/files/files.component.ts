/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core files component, displays results summary as well as facets.
 */

// Core dependencies
import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Location } from "@angular/common";
import * as _ from "lodash";
import { DeviceDetectorService } from "ngx-device-detector";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { distinctUntilChanged, map, takeUntil } from "rxjs/operators";

// App dependencies
import { FilesState } from "./files.state";
import { AppState } from "../_ngrx/app.state";
import { selectFacetFacets } from "./_ngrx/facet/facet.selectors";
import {
    selectFileSummary,
    selectEntities,
    selectSelectedEntity
} from "./_ngrx/file.selectors";
import {
    selectSearchTerms,
    selectSelectedProjectSearchTerms,
    selectSelectedSearchTerms, selectSelectedSearchTermsBySearchKey
} from "./_ngrx/search/search.selectors";
import { EntitySelectAction } from "./_ngrx/table/table.actions";
import { SearchTerm } from "./search/search-term.model";
import { SearchTermUrlService } from "./search/url/search-term-url.service";
import EntitySpec from "./shared/entity-spec";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {

    // Public/template variables
    public state$: Observable<FilesState>;

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {SearchTermUrlService} locationService
     * @param {Location} location
     * @param {Store<AppState>} store
     * @param {Renderer2} renderer
     */
    constructor(private deviceService: DeviceDetectorService,
                private locationService: SearchTermUrlService,
                private location: Location,
                private store: Store<AppState>,
                private renderer: Renderer2) {
    }

    /**
     * Returns true if device is either mobile or tablet.
     * @returns {boolean}
     */
    public isDeviceHandheld(): boolean {

        const mobile = this.deviceService.isMobile();
        const tablet = this.deviceService.isTablet();

        return (mobile || tablet);
    }

    /**
     * Remove scroll on body when menu is open.
     * Adds class no-scroll to body tag.
     * Class defined in _cgl.global.scss.
     *
     * @param opened: boolean
     */
    public onMenuOpen(opened: boolean) {

        if ( opened ) {
            this.renderer.addClass(document.body, "no-scroll");
        }
        else {
            this.renderer.removeClass(document.body, "no-scroll");
        }
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
     * Update URL on change of selected facets.
     */
    private initOnStateChanges() {

        // Set up the URL state management - write the browser address bar when the selected facets change.
        combineLatest(
            this.store.pipe(select(selectFacetFacets)),
            this.store.pipe(select(selectSelectedEntity)),
            this.store.pipe(select(selectSelectedSearchTermsBySearchKey))
        )
        .pipe(
            takeUntil(this.ngDestroy$),
            distinctUntilChanged((previous, current) => {
                return _.isEqual(previous, current);
            })
        )
        .subscribe(([facets, selectedEntity, selectedSearchTermsBySearchKey]) => {

            const filterQueryString = this.locationService.stringifySearchTerms(facets, selectedSearchTermsBySearchKey);
            
            const path = selectedEntity.key;
            const params = new URLSearchParams();
            if ( !!filterQueryString ) {
                params.set("filter", filterQueryString);
            }
            this.location.replaceState(path, params.toString());
        });
    }

    /**
     * Setup initial component state from store.
     */
    private initState() {

        this.state$ = combineLatest(
            this.store.pipe(select(selectFileSummary)), // Counts
            this.store.pipe(select(selectFacetFacets)), // Complete list of facets to display - both file facets (facets with term lists) as well as range facets
            this.store.pipe(select(selectEntities)), // Set of tabs to be displayed
            this.store.pipe(select(selectSelectedEntity)), // Current selected tab
            this.store.pipe(select(selectSelectedSearchTerms)), // Set of possible search terms, used to populate the search autosuggest.
            this.store.pipe(select(selectSearchTerms)),
            this.store.pipe( // Current set of selected projects, if any
                select(selectSelectedProjectSearchTerms),
                map(this.mapSearchTermsToProjectIds)
            )
        )
            .pipe(
                takeUntil(this.ngDestroy$),
                map(([
                         fileSummary,
                         facets,
                         entities,
                         selectedEntity,
                         selectedSearchTerms,
                         searchTerms,
                         selectedProjectIds]) => {

                    return {
                        entities,
                        facets,
                        fileSummary,
                        searchTerms,
                        selectedEntity,
                        selectedProjectIds,
                        selectedSearchTerms
                    };
                }));
    }

    /**
     * Transform selected project search term set into set of selected project IDs.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string[]}
     */
    private mapSearchTermsToProjectIds(searchTerms: SearchTerm[]): string[] {

        return searchTerms.map((searchTerm: SearchTerm) => {
            return searchTerm.getSearchValue();
        });
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        this.initState();
        this.initOnStateChanges();
    }
}
