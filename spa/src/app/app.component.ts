/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Top-level application component.
 */

// Core dependencies
import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Subject, BehaviorSubject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { AppComponentState } from "./app.component.state";
import { ConfigService } from "./config/config.service";
import { ClearReleaseReferrerAction } from "./files/_ngrx/release/clear-release-referrer.action";
import { FetchProjectEditsRequestAction } from "./files/_ngrx/project-edits/fetch-project-edits-request.action";
import { ReleaseService } from "./files/shared/release.service";
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
    public state$ = new BehaviorSubject<AppComponentState>({});

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {ConfigService} configService
     * @param {DeviceDetectorService} deviceService
     * @param {ReleaseService} releaseService
     * @param {Store<AppState>} store
     * @param {Router} router
     * @param {Renderer2} renderer
     */
    constructor(private configService: ConfigService,
                private deviceService: DeviceDetectorService,
                private releaseService: ReleaseService,
                private store: Store<AppState>,
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
     * Fetch current status of system, and current status of index, and display information banners, if necessary.
     */
    private initState() {

        this.store.dispatch(new SystemStatusRequestAction());
        this.store.pipe(
            select(selectSystemStatus),
            takeUntil(this.ngDestroy$)
        ).subscribe((systemStatus) => {

            this.state$.next({
                systemStatus
            });
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
     * Kick off health check. Grab config - we need to know which environment we're in for displaying the ingest
     * info banner.
     */
    public ngOnInit() {

        this.initState();
        this.loadReleaseData();
        this.loadProjectEditsData();
        this.initReleaseReferrerListener();
    }
}

