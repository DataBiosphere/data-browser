/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Top-level application component.
 */

// Core dependencies
import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";

// App dependencies
import { AppComponentState } from "./app.component.state";
import { ConfigService } from "./config/config.service";
import { SearchTermUrlService } from "./files/search/url/search-term-url.service";
import { SetViewStateAction } from "./files/_ngrx/facet/set-view-state.action";
import { ClearReleaseReferrerAction } from "./files/_ngrx/release/clear-release-referrer.action";
import { FetchProjectEditsRequestAction } from "./files/_ngrx/project-edits/fetch-project-edits-request.action";
import { ReleaseService } from "./files/shared/release.service";
import { EntityName } from "./files/shared/entity-name.model";
import { FetchReleasesRequestAction } from "./files/_ngrx/release/fetch-releases-request.action";
import { DeviceDetectorService } from "ngx-device-detector";
import { AppState } from "./_ngrx/app.state";
import { selectSystemStatus } from "./system/_ngrx/system.selectors";
import { SystemStatusRequestAction } from "./system/_ngrx/system-status-request.action";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit, OnDestroy {

    // Template/public variables
    public state$: Observable<AppComponentState>;

    // Locals
    private ngDestroy$ = new Subject();
    private routerEventsSubscription: Subscription;

    /**
     * @param {ConfigService} configService
     * @param {DeviceDetectorService} deviceService
     * @param {ReleaseService} releaseService
     * @param {SearchTermUrlService} searchUrlService
     * @param {Store<AppState>} store
     * @param {ActivatedRoute} activatedRoute
     * @param {Location} location
     * @param {Router} router
     * @param {Renderer2} renderer
     */
    constructor(private configService: ConfigService,
                private deviceService: DeviceDetectorService,
                private releaseService: ReleaseService,
                private searchUrlService: SearchTermUrlService,
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
     * @returns {boolean}
     */
    public isMaintenanceModeWarningVisible(): boolean {

        // Maintenance mode warning is currently disabled.
        return false;
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
     * Returns true when the url path is not the releases or project detail pages, and if we're currently on an
     * environment where release is visible.
     *
     * @returns {boolean}
     */
    public showRelease() {
        
        if ( !this.releaseService.isReleaseFeatureEnabled() ) {
            return false;
        }

        return !( this.router.url.includes("/releases/") || this.router.url.includes("/projects/") );
    }

    /**
     * Returns true if this isn't a v2.0 environment (DCP-wide system status is only available in pre v2.0 environments).
     * 
     * @returns {boolean}
     */
    public isStatusPageFeatureEnabled(): boolean {

        return !this.configService.isV2();
    }

    /**
     * Load project edits data from local JSON files.
     */
    private loadProjectEditsData(): void {

        this.store.dispatch(new FetchProjectEditsRequestAction());
    }
    
    /**
     * Load release data from local JSON files.
     */
    private loadReleaseData(): void {

        this.store.dispatch(new FetchReleasesRequestAction());
    }

    /**
     * Clear release referrer if the user is no longer in the context of viewing release information. This is used
     * by the project detail to determine where the back button should navigate to; either the release page if the
     * referrer flag is set, otherwise the project tab.
     */
    private initReleaseReferrerListener(): void {

        this.router.events.pipe(
            filter(evt => evt instanceof NavigationEnd),
            filter(evt => (evt as NavigationEnd).url.indexOf("releases") === -1),
            takeUntil(this.ngDestroy$)
        ).subscribe(() => {
            this.store.dispatch(new ClearReleaseReferrerAction());
        });
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
     * Fetch current status of system, and current status of index, and display information banners, if necessary. Also
     * check for changes in config.
     */
    private initState() {
        
        this.store.dispatch(new SystemStatusRequestAction());
        this.state$ = this.store.pipe(
            select(selectSystemStatus),
            takeUntil(this.ngDestroy$),
            map((systemStatus) => {

                return {
                    systemStatus
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

                const filter = this.searchUrlService.parseQueryStringSearchTerms(params);

                // Default app state is to have human selected. This is only necessary if there is currently no filter
                // applied.
                if ( filter.length === 0 ) {
                    filter.push(this.searchUrlService.getDefaultSearchState());
                }

                this.store.dispatch(new SetViewStateAction(tab, filter));

                if ( this.routerEventsSubscription ) {
                    this.routerEventsSubscription.unsubscribe();
                }
            }
        });
    }

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
        this.initState();
        this.loadReleaseData();
        this.loadProjectEditsData();
        this.initReleaseReferrerListener();
    }
}

