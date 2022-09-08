/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core toolbar component for HCA, displays HCA logo and HCA-related menu items.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { NavigationEnd, Router } from "@angular/router";
import GoogleUser = gapi.auth2.GoogleUser;
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

// App dependencies
import {
    selectAuthenticated,
    selectUser,
} from "../../../auth/_ngrx/auth.selectors";
import { LoginRequestAction } from "../../../auth/_ngrx/login-request.action";
import { LogoutRequestAction } from "../../../auth/_ngrx/logout-request.action";
import { ConfigService } from "../../../config/config.service";
import { SelectEntityAction } from "../../../files/_ngrx/entity/select-entity.action";
import { EntityName } from "../../../files/shared/entity-name.model";
import { UrlService } from "../../../files/url/url.service";
import { CloseHamburgerAction } from "../../../hamburger/_ngrx/close-hamburger.action";
import { selectHamburgerOpen } from "../../../hamburger/_ngrx/hamburger.selectors";
import { HCAToolbarComponentState } from "./hca-toolbar.component.state";
import { selectModalOpen } from "../../../modal/_ngrx/modal.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { RoutingService } from "../../../shared/routing/routing.service";
import { HeaderComponent } from "../../site-config/header.component";
import { selectCatalogUpdatedSinceLastVisit } from "../../../files/_ngrx/catalog/catalog.selectors";

@Component({
    selector: "hca-toolbar",
    templateUrl: "hca-toolbar.component.html",
    styleUrls: ["hca-toolbar.component.scss"],
})
export class HCAToolbarComponent implements HeaderComponent, OnDestroy, OnInit {
    // Template variables
    public desktop: boolean;
    public portalUrl: string;
    public searchOpen = false;
    public state$ = new BehaviorSubject<HCAToolbarComponentState>({
        authenticated: false,
        catalogUpdatedSinceLastVisit: false,
        menuOpen: false,
        modalOpen: false,
    });

    // Locals
    private currentUrl: string;
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     * @param {BreakpointObserver} observer
     * @param {RoutingService} routingService
     * @param {UrlService} urlService
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private configService: ConfigService,
        private observer: BreakpointObserver,
        private routingService: RoutingService,
        private urlService: UrlService,
        private router: Router
    ) {
        this.portalUrl = this.configService.getPortalUrl();
    }

    /**
     * Return the full name for the current user.
     *
     * @param {GoogleUser} user
     * @returns {string}
     */
    public getFullName(user: GoogleUser): string {
        return user.getBasicProfile().getName();
    }

    /**
     * Return the first letter of the user's given name.
     *
     * @returns {string}
     */
    public getNameStartsWith(user: GoogleUser): string {
        return user.getBasicProfile().getGivenName().substring(0, 1);
    }

    /**
     * Return the URL to the user's profile image.
     *
     * @param {GoogleUserUser} user
     * @returns {string}
     */
    public getProfileImageUrl(user: GoogleUser): string {
        return user.getBasicProfile().getImageUrl();
    }

    /**
     * Returns true if auth is enabled.
     */
    public isAuthEnabled() {
        return this.configService.isAuthEnabled();
    }

    /**
     * Returns true if the current navigation is "Explore".
     *
     * @returns {boolean}
     */
    public isExploreActiveUrl(): boolean {
        if (this.currentUrl) {
            const explorePathExists = this.urlService.isViewingEntities();
            const homePathExists = this.currentUrl === "/";

            return explorePathExists || homePathExists;
        }
    }

    /**
     * Returns true if there's a profile image for the current user.
     *
     * @param {GoogleUser} user
     * @returns {boolean}
     */
    public isProfileImageSpecified(user: GoogleUser): boolean {
        return !!this.getProfileImageUrl(user);
    }

    /**
     * Returns true if the toolbar navigation is displayable.
     *
     * @param {boolean} menuOpen
     * @returns {boolean}
     */
    public isToolbarNavOpen(menuOpen: boolean): boolean {
        return this.desktop || menuOpen;
    }

    /**
     * Set projects as selected entity in store. If we're currently viewing the projects route, a navigation event will
     * not be dispatched to reload this route resulting in the auto-close of the hamburger to not be triggered. We must
     * manually trigger the close here.
     */
    public onExploreLinkClicked() {
        this.store.dispatch(new SelectEntityAction(EntityName.PROJECTS));

        if (this.routingService.isPathActive([`/${EntityName.PROJECTS}`])) {
            this.store.dispatch(new CloseHamburgerAction());
        }
    }

    /**
     * Dispatch event to login user via Google.
     */
    public onLoginClicked() {
        this.store.dispatch(new LoginRequestAction());
    }

    /**
     * Dispatch event to logout user via Google.
     */
    public onLogoutClicked() {
        this.store.dispatch(new LogoutRequestAction());
    }

    /**
     * Closes portal search.
     */
    public onSearchClose() {
        this.searchOpen = false;
    }

    /**
     * Opens portal search.
     */
    public onSearchOpen() {
        this.searchOpen = true;
    }

    /**
     * Listens for the desktop breakpoint.
     */
    private initBreakpointObserver() {
        this.observer.observe("(min-width: 1440px)").subscribe((result) => {
            this.desktop = result.matches;
            // Closes menu when desktop breakpoint matches.
            if (this.desktop) {
                this.store.dispatch(new CloseHamburgerAction());
            }
        });
    }

    /**
     * Listens for the current url.
     */
    private initCurrentUrl() {
        this.router.events
            .pipe(
                filter((evt) => evt instanceof NavigationEnd),
                takeUntil(this.ngDestroy$)
            )
            .subscribe((evt: NavigationEnd) => {
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

        // Sets up breakpoint observer
        this.initBreakpointObserver();

        const menuOpen$ = this.store.pipe(
            select(selectHamburgerOpen),
            takeUntil(this.ngDestroy$)
        );

        const modalOpen$ = this.store.pipe(
            select(selectModalOpen),
            takeUntil(this.ngDestroy$)
        );

        const authenticated$ = this.store.pipe(
            select(selectAuthenticated),
            takeUntil(this.ngDestroy$)
        );

        const user$ = this.store.pipe(
            select(selectUser),
            takeUntil(this.ngDestroy$)
        );

        const catalogUpdatedSinceLastVisit$ = this.store.pipe(
            select(selectCatalogUpdatedSinceLastVisit),
            takeUntil(this.ngDestroy$)
        );

        combineLatest([
            authenticated$,
            catalogUpdatedSinceLastVisit$,
            menuOpen$,
            modalOpen$,
            user$,
        ])
            .pipe(takeUntil(this.ngDestroy$))
            .subscribe(
                ([
                    authenticated,
                    catalogUpdatedSinceLastVisit,
                    menuOpen,
                    modalOpen,
                    user,
                ]) => {
                    this.state$.next({
                        authenticated,
                        catalogUpdatedSinceLastVisit,
                        menuOpen,
                        modalOpen,
                        user,
                    });
                }
            );
    }
}
