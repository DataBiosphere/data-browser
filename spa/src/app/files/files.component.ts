/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core files component, displays results summary as well as facets.
 */

// Core dependencies
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Location } from "@angular/common";
import * as _ from "lodash";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

// App dependencies
import { DeviceDetectorService } from "ngx-device-detector";
import { FileFacet } from "./shared/file-facet.model";
import { FileSummary } from "./file-summary/file-summary";
import {
    selectFileFacetsFileFacets,
    selectFileSummary,
    selectEntities,
    selectSelectedEntity,
    selectSelectedViewState,
    selectFileTypeMatrix
} from "./_ngrx/file.selectors";
import {
    selectSearchTerms,
    selectSelectedProjectSearchTerms,
    selectSelectedSearchTerms
} from "./_ngrx/search/search.selectors";
import { AppState } from "../_ngrx/app.state";
import { EntitySelectAction } from "./_ngrx/table/table.actions";
import { SearchTerm } from "./search/search-term.model";
import EntitySpec from "./shared/entity-spec";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {

    // Public/template variables
    public entities$: Observable<EntitySpec[]>;
    public fileFacets$: Observable<FileFacet[]>;
    public fileTypeMatrix$: Observable<boolean>;
    public selectedEntity$: Observable<EntitySpec>;
    public selectFileSummary$: Observable<FileSummary>;
    public selectedProjectIds: Observable<string[]>;
    public searchTerms$: Observable<SearchTerm[]>;
    public selectedSearchTerms$: Observable<SearchTerm[]>;

    // Locals
    private deviceInfo = null;
    private urlUpdater: Subscription;

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {Store<AppState>} store
     * @param {Location} location
     * @param {Renderer2} renderer
     * @param {Window} window
     */
    constructor(private deviceService: DeviceDetectorService,
                private store: Store<AppState>,
                private location: Location,
                private renderer: Renderer2,
                @Inject("Window") private window: Window) {
    }

    /**
     * Public API
     */

    /**
     * Returns true if device is either mobile or tablet.
     * @returns {boolean}
     */
    public isDeviceHandheld(): boolean {

        this.deviceInfo = this.deviceService.getDeviceInfo();
        const isMobile = this.deviceService.isMobile();
        const isTablet = this.deviceService.isTablet();

        return (isMobile || isTablet);
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
     * PRIVATE
     */

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
        this.selectFileSummary$ = this.store.pipe(select(selectFileSummary));

        // Get the list of facets to display
        this.fileFacets$ = this.store.pipe(select(selectFileFacetsFileFacets));

        // Grab the set of tabs to be displayed
        this.entities$ = this.store.pipe(select(selectEntities));

        // Determine the current selected tab
        this.selectedEntity$ = this.store.pipe(select(selectSelectedEntity));

        // Determine if Matrix files are included in the current files result set.
        this.fileTypeMatrix$ = this.store.pipe(select(selectFileTypeMatrix));

        // Grab the set of current selected search terms
        this.selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));
        
        // Grab the set of possible search terms, we'll use this to populate the search autosuggest.
        this.searchTerms$ = this.store.pipe(select(selectSearchTerms));

        // Grab the current set of selected projects, if any
        this.selectedProjectIds = this.store.pipe(
            select(selectSelectedProjectSearchTerms),
            map(this.mapSearchTermsToProjectIds)
        );

        // Set up the URL state management - write the browser address bar when the selected facets change.
        this.store.pipe(
            select(selectSelectedViewState),
            distinctUntilChanged((previous, current) => {
                return _.isEqual(previous, current);
            })
        )
        .subscribe(({selectedSearchTermsBySearchKey, selectedEntity}) => {

            // Convert search terms to query string state
            const queryStringSearchTerms = Array.from(selectedSearchTermsBySearchKey.keys()).reduce((accum, facetName) => {

                const searchTerms = selectedSearchTermsBySearchKey.get(facetName);
                accum.add({
                    facetName: facetName,
                    terms: Array.from(searchTerms.values()).map(searchTerm => searchTerm.getSearchValue())
                });
                return accum;
            }, new Set<any>());

            const path = selectedEntity.key;
            const params = new URLSearchParams();
            if ( queryStringSearchTerms.size > 0 ) {
                params.set("filter", JSON.stringify(Array.from(queryStringSearchTerms)));
            }

            this.location.replaceState(path, params.toString());
        });
    }
}
