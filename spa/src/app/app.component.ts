/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Top-level application component.
 */

// Core dependencies
import { Location } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { SetViewStateAction } from "./files/_ngrx/file-facet-list/file-facet-list.actions";
import { AppState } from "./_ngrx/app.state";
import { QueryStringFacet } from "./files/shared/query-string-facet.model";
import { HealthRequestAction } from "./system/_ngrx/health/health-request.action";
import { selectIndexing } from "./system/_ngrx/system.selectors";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit, OnDestroy {

    // Template/public variables
    public indexing$: Observable<boolean>;

    // Locals
    private ngDestroy$ = new Subject();
    private routerEventsSubscription: Subscription;

    /**
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Location} location
     * @param {Renderer2} renderer
     * @param {Window} window
     */
    constructor(private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private location: Location,
                private router: Router,
                private renderer: Renderer2,
                @Inject("Window") private window: Window) {
    }

    /**
     * Public API
     */

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
     * Privates
     */

    /**
     * Returns true if a filter state is encoded in the query params.
     *
     * @param {Params} params
     * @returns {boolean}
     */
    private isFilterParamSpecified(params: Params): boolean {

        return !!params["filter"];
    }

    /**
     * Determine the current selected tab.
     *
     * @returns {string}
     */
    private parseTab(): string {

        const path = this.location.path().split("?")[0];
        if ( path === "/files" ) {
            return "files";
        }

        if ( path === "/specimens" ) {
            return "specimens";
        }

        return "projects";
    }

    /**
     * Parse the "filter" query string param, if specified.
     *
     * @param {Params} params
     * @returns {QueryStringFacet[]}
     */
    private parseQueryStringFacets(params: Params): QueryStringFacet[] {

        if ( this.isFilterParamSpecified(params) ) {

            // We have a filter, let's extract it.
            let filter;
            const filterParam = params["filter"];
            try {
                filter = JSON.parse(filterParam);
            }
            catch (error) {
                console.log(error);
            }

            let queryStringFacets = [];
            if ( filter && filter.length && filter[0].facetName ) {
                queryStringFacets = filter.map((selectedFacet) => {
                    return new QueryStringFacet(selectedFacet["facetName"], selectedFacet["terms"]);
                });
            }

            return queryStringFacets;
        }

        return [];
    }

    /**
     * Fetch current status of system and display information banners, if necessary.
     */
    private healthCheck() {

        this.store.dispatch(new HealthRequestAction());
        this.indexing$ = this.store.pipe(
            select(selectIndexing),
            takeUntil(this.ngDestroy$)
        );
    }

    /**
     * Set up app state from query string parameters, if any.
     */
    private setAppStateFromURL() {

        // Using NavigationEnd here as subscribing to activatedRoute.queryParamsMap always emits an initial value,
        // making it difficult to detect the difference between the initial value or an intentionally empty value. We
        // are therefore unable to determine when app state setup is complete and can safely unsubscribe.
        this.routerEventsSubscription = this.router.events.subscribe((evt) => {

            if (evt instanceof NavigationEnd) {

                const params = this.activatedRoute.snapshot.queryParams;
                const filter = this.parseQueryStringFacets(params);
                const tab = this.parseTab();
                this.store.dispatch(new SetViewStateAction(tab, filter));
                this.routerEventsSubscription.unsubscribe();
            }
        });
    }

    /**
     * Life cycle hooks
     */

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        if ( !!this.routerEventsSubscription ) {
            this.routerEventsSubscription.unsubscribe();
        }

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up app state from URL, if specified. Kick off health check.
     */
    public ngOnInit() {

        this.setAppStateFromURL();
        this.healthCheck();
    }
}

