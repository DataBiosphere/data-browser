/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core toolbar component for HCA, displays HCA logo and HCA-related menu items.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { SelectEntityAction } from "../../../files/_ngrx/entity/select-entity.action";
import { EntityName } from "../../../files/shared/entity-name.model";
import { ReleaseService } from "../../../files/shared/release.service";
import { CloseHamburgerAction } from "../../../hamburger/_ngrx/close-hamburger.action";
import { HCAToolbarComponentState } from "./hca-toolbar.component.state";
import { selectModalOpen } from "../../../modal/_ngrx/modal.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { RoutingService } from "../../../shared/routing/routing.service";
import { HeaderComponent } from "../../site-config/header.component";

@Component({
    selector: "hca-toolbar",
    templateUrl: "hca-toolbar.component.html",
    styleUrls: ["hca-toolbar.component.scss"]
})

export class HCAToolbarComponent implements HeaderComponent, OnDestroy, OnInit {

    // Template variables
    public dropDownMenuOpen = false;
    public portalUrl: string;
    public state$ = new BehaviorSubject<HCAToolbarComponentState>({
        modalOpen: false
    });

    // Locals
    private currentUrl: string;
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     * @param {ReleaseService} releaseService
     * @param {RoutingService} routingService
     * @param {Router} router
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService,
                private releaseService: ReleaseService,
                private routingService: RoutingService,
                private router: Router) {
        this.portalUrl = this.configService.getPortalUrl();
    }

    /**
     * Return the data portal release documentation url.
     *
     * @returns {string}
     */
    public getReleasesDocumentationUrl(): string {

        return `${this.portalUrl}/releases/2020-mar`;
    }

    /**
     * Returns true if the current navigation is "Explore".
     *
     * @returns {boolean}
     */
    public isExploreActiveUrl(): boolean {

        if ( this.currentUrl ) {

            const explorePaths = ["projects", "samples", "files", "get-data"];
            const explorePathExists = explorePaths.some(explorePath => this.currentUrl.includes(explorePath));
            const homePathExists = this.currentUrl === "/";

            return explorePathExists || homePathExists;
        }
    }

    /**
     * Returns true if the current navigation is "March 2020 Release".
     *
     * @returns {boolean}
     */
    public isReleasesActiveUrl(): boolean {

        return this.currentUrl && this.currentUrl.includes("releases");
    }

    /**
     * Returns true if release functionality is available on the current environment.
     *
     * @returns {boolean}
     */
    public isReleaseFeatureEnabled(): boolean {

        return this.releaseService.isReleaseFeatureEnabled();
    }

    /**
     * Event registering the opening or closing of the toolbar nav drop down menu.
     *
     * @param event
     */
    public onDropDownMenuOpened(event) {

        this.dropDownMenuOpen = event;
    }

    /**
     * Set projects as selected entity in store. If we're currently viewing the projects route, a navigation event will
     * not be dispatched to reload this route resulting in the auto-close of the hamburger to not be triggered. We must
     * manually trigger the close here.
     */
    public onExploreLinkClicked() {

        this.store.dispatch(new SelectEntityAction(EntityName.PROJECTS));
        
        if ( this.routingService.isPathActive([`/${EntityName.PROJECTS}`]) ) {
            this.store.dispatch(new CloseHamburgerAction());
        }
    }

    /**
     * Toggles open / closed the toolbar nav drop down menu.
     *
     * @param {MouseEvent} event
     */
    public toggleDropDownMenu(event: MouseEvent) {

        event.stopPropagation();
        this.dropDownMenuOpen = !this.dropDownMenuOpen;
    }

    /**
     * Listens for the current url.
     */
    private initCurrentUrl() {

        this.router.events.pipe(
            filter(evt => evt instanceof NavigationEnd),
            takeUntil(this.ngDestroy$)
        ).subscribe((evt: NavigationEnd) => {

            this.currentUrl = evt.url;
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
     * Listen for changes in modal opened/closed state and update header UI accordingly.
     */
    public ngOnInit() {

        // Sets up the current url
        this.initCurrentUrl();

        this.store.pipe(
            select(selectModalOpen),
            takeUntil(this.ngDestroy$)
        ).subscribe(modalOpen => {
            this.state$.next({modalOpen});
        });
    }
}
