/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core files component, displays results summary as well as facets.
 */

// Core dependencies
import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

// App dependencies
import { FilesComponentState } from "./files.component.state";
import { AppState } from "../_ngrx/app.state";
import { SelectEntityAction } from "./_ngrx/entity/select-entity.action";
import { selectFacetFacets } from "./_ngrx/facet/facet.selectors";
import {
    selectFileSummary,
    selectEntities,
    selectSelectedEntitySpec
} from "./_ngrx/file.selectors";
import {
    selectSearchTerms,
    selectSelectedProjectSearchTerms,
    selectSelectedSearchTerms
} from "./_ngrx/search/search.selectors";
import { SearchTerm } from "./search/search-term.model";
import EntitySpec from "./shared/entity-spec";

@Component({
    selector: "bw-files",
    templateUrl: "files.component.html",
    styleUrls: ["files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {

    // Public/template variables
    public state$: Observable<FilesComponentState>;

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {Store<AppState>} store
     * @param {Renderer2} renderer
     */
    constructor(private deviceService: DeviceDetectorService,
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
     * Class defined in hca.global.scss.
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

        this.store.dispatch(new SelectEntityAction(tab.key));
    }

    /**
     * Setup initial component state from store.
     */
    private initState() {

        this.state$ = combineLatest(
            this.store.pipe(select(selectFileSummary)), // Counts
            this.store.pipe(select(selectFacetFacets)), // Complete list of facets to display - both file facets (facets with term lists) as well as range facets
            this.store.pipe(select(selectEntities)), // Set of tabs to be displayed
            this.store.pipe(select(selectSelectedEntitySpec)), // Current selected tab
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
    }
}
