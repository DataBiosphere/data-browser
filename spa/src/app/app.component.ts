/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Top-level application component.
 */

// Core dependencies
import {
    Component,
    ComponentFactoryResolver, HostBinding,
    Inject,
    OnDestroy,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Subject, BehaviorSubject, combineLatest } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { AppComponentState } from "./app.component.state";
import { ConfigService } from "./config/config.service";
import { selectCatalog } from "./files/_ngrx/catalog/catalog.selectors";
import { FetchProjectEditsRequestAction } from "./files/_ngrx/project-edits/fetch-project-edits-request.action";
import { DeviceDetectorService } from "ngx-device-detector";
import { AppState } from "./_ngrx/app.state";
import { SiteConfigService } from "./site/site-config/site-config.service";
import { SITE_CONFIG_SERVICE } from "./site/site-config/site-config.token";
import { selectSystemStatus } from "./system/_ngrx/system.selectors";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})

export class AppComponent implements OnInit, OnDestroy {

    @HostBinding("class") className = "";

    // Template/public variables
    public state$ = new BehaviorSubject<AppComponentState>({});

    // Locals
    private ngDestroy$ = new Subject();
    
    // View child/ren
    @ViewChild("footer", {static: true, read: ViewContainerRef}) footerRef: ViewContainerRef;
    @ViewChild("header", {static: true, read: ViewContainerRef}) headerRef: ViewContainerRef;

    /**
     * @param {ConfigService} configService
     * @param {DeviceDetectorService} deviceService
     * @param {SiteConfigService} siteConfigService
     * @param {Store<AppState>} store
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {Router} router
     */
    constructor(private configService: ConfigService,
                private deviceService: DeviceDetectorService,
                @Inject(SITE_CONFIG_SERVICE) private siteConfigService: SiteConfigService,
                private store: Store<AppState>,
                private componentFactoryResolver: ComponentFactoryResolver,
                private router: Router) {
        
        this.className = this.configService.getAtlas();
    }

    /**
     * Returns true for environments where dcp1 catalog is available. This is currently only local and the dcp2
     * environment.
     */
    public isAnnouncementCatalogVisible(): boolean {

        return this.configService.isEnvLocal() || this.configService.isEnvDCP2();
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
     * Returns true if support requests are enbled for this site.
     * 
     * @returns {boolean}
     */
    public isSupportRequestEnabled(): boolean {
        
        return this.siteConfigService.isSupportRequestEnabled();
    }

    /**
     * Load project edits data from local JSON files.
     */
    private loadProjectEditsData(): void {

        this.store.dispatch(new FetchProjectEditsRequestAction());
    }

    /**
     * Fetch current status of system, and current status of index, and display information banners, if necessary.
     */
    private initState() {

        // Grab the current catalog value - we need this for the announcement banner
        const catalog$ = this.store.pipe(
            select(selectCatalog),
            takeUntil(this.ngDestroy$)
        );

        // Grab the system status
        const systemStatus$ = this.store.pipe(
            select(selectSystemStatus),
            takeUntil(this.ngDestroy$));

        combineLatest(catalog$, systemStatus$)
            .pipe(
                takeUntil(this.ngDestroy$)
            )
            .subscribe(([catalog, systemStatus]) => {

            this.state$.next({
                catalog: catalog,
                systemStatus: systemStatus
            });
        });
    }

    /**
     * Set up header and footer components depending on the site config.
     */
    private initViewContainers() {

        const headerComponent = this.siteConfigService.getHeader();
        this.insertComponent(headerComponent, this.headerRef);
        
        const footerComponent = this.siteConfigService.getFooter();
        this.insertComponent(footerComponent, this.footerRef);
    }

    /**
     * Insert the specified component into the specified view container.
     * 
     * @param {Type<any>} component
     * @param {ViewContainerRef} viewContainerRef
     */
    private insertComponent(component: Type<any>, viewContainerRef: ViewContainerRef) {

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
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

        this.initViewContainers();
        this.initState();
        this.loadProjectEditsData();
    }
}

