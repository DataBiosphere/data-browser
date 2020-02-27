/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Top-level application component.
 */

// Core dependencies
import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subscription, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

// App dependencies
import { Config } from "./config/config.model";
import { selectConfigConfig } from "./config/_ngrx/config.selectors";
import { SetViewStateAction } from "./files/_ngrx/file-facet-list/set-view-state.action";
import { EntityName } from "./files/shared/entity-name.model";
import { QueryStringFacet } from "./files/shared/query-string-facet.model";
import { AppState } from "./_ngrx/app.state";
import { DeviceDetectorService } from "ngx-device-detector";
import { HealthRequestAction } from "./system/_ngrx/health/health-request.action";
import { selectHealth, selectIndex } from "./system/_ngrx/system.selectors";
import { IndexRequestAction } from "./system/_ngrx/index/index-request.action";
import { SystemState } from "./system.state";
import { FileFacetName } from "./files/shared/file-facet-name.model";
import { GenusSpecies } from "./files/shared/genus-species.model";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit, OnDestroy {

    // Template/public variables
    public systemStatus$: Observable<SystemState>;
    public config$: Observable<Config>;

    // Locals
    private ngDestroy$ = new Subject();
    private routerEventsSubscription: Subscription;

    /**
     * @param {DeviceDetectorService} deviceService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Location} location
     * @param {Router} router
     * @param {Renderer2} renderer
     */
    constructor(private deviceService: DeviceDetectorService,
                private store: Store<AppState>,
                private activatedRoute: ActivatedRoute,
                private location: Location,
                private router: Router,
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
     * Returns true if the maintenance mode warning is visible.
     * 
     * @param {string} environmentName
     * @returns {boolean}
     */
    public isMaintenanceModeWarningVisible(environmentName: string): boolean {

        // Maintenance mode warning is currently disabled. To re-enable, uncomment line below.
        // return environmentName === "prod";
        return false;
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
     * Returns true when the url path is not "releases".
     *
     * @returns {boolean}
     */
    public showRRelease() {

        return !this.router.url.includes("/releases/");
    }

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
            return EntityName.FILES;
        }

        if ( path === "/samples" ) {
            return EntityName.SAMPLES;
        }

        return EntityName.PROJECTS;
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
     * Fetch current status of system, and current status of index, and display information banners, if necessary.
     */
    private systemCheck() {

        this.store.dispatch(new HealthRequestAction());
        const health$ = this.store.pipe(select(selectHealth));

        this.store.dispatch(new IndexRequestAction());
        const index$ = this.store.pipe(select(selectIndex));
        
        this.systemStatus$ = combineLatest(health$, index$).pipe(
            takeUntil(this.ngDestroy$),
            map(([health, index]) => {

                return {
                    health,
                    index
                }
            })
        );
    }

    /**
     * Set up app state from query string parameters, if any.
     */
    private setAppStateFromURL() {

        // Using NavigationEnd here as subscribing to activatedRoute.queryParamsMap always emits an initial value,
        // making it difficult to detect the difference between the initial value or an intentionally empty value. Using
        // activatedRoute.queryParamsMap would therefore make it difficult to determine when app state setup is complete,
        // and when we can safely unsubscribe.
        this.routerEventsSubscription = this.router.events.subscribe((evt) => {

            if ( evt instanceof NavigationEnd ) {

                const params = this.activatedRoute.snapshot.queryParams;
                const tab = this.parseTab();

                const filter = this.parseQueryStringFacets(params);

                // Default app state to have human selected. This is only necessary if there is currently no filter
                // applied.
                if ( filter.length === 0 ) {
                    const queryStringFacet =
                        new QueryStringFacet(FileFacetName.GENUS_SPECIES, [GenusSpecies.HOMO_SAPIENS]);
                    filter.push(queryStringFacet);
                }
                
                this.store.dispatch(new SetViewStateAction(tab, filter));

                if ( this.routerEventsSubscription ) {
                    this.routerEventsSubscription.unsubscribe();
                }
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
     * Set up app state from URL, if specified. Kick off health check. Grab config - we need to know which environment
     * we're in for displaying the ingest info banner.
     */
    public ngOnInit() {

        this.setAppStateFromURL();
        this.systemCheck();
        
        this.config$ = this.store.pipe(
            select(selectConfigConfig),
            takeUntil(this.ngDestroy$)
        );
    }
}

