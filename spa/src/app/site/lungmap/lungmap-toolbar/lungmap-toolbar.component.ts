/**
 * LungMAP
 * https://lungmap.net/
 *
 * Core toolbar component for LungMAP, displays LungMAP logo and LungMAP-related menu items.
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
import { CloseHamburgerAction } from "../../../hamburger/_ngrx/close-hamburger.action";
import { LungMAPToolbarComponentState } from "./lungmap-toolbar.component.state";
import { selectModalOpen } from "../../../modal/_ngrx/modal.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { RoutingService } from "../../../shared/routing/routing.service";
import { HeaderComponent } from "../../site-config/header.component";
import { UrlService } from "../../../files/url/url.service";

@Component({
    selector: "lungmap-toolbar",
    templateUrl: "lungmap-toolbar.component.html",
    styleUrls: ["lungmap-toolbar.component.scss"],
})
export class LungMAPToolbarComponent
    implements HeaderComponent, OnDestroy, OnInit
{
    // Template variables
    public dropDownMenuOpen = false;
    public portalUrl: string;
    public state$ = new BehaviorSubject<LungMAPToolbarComponentState>({
        modalOpen: false,
    });

    // Locals
    private currentUrl: string;
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     * @param {RoutingService} routingService
     * @param {UrlService} urlService
     * @param {Router} router
     */
    constructor(
        private store: Store<AppState>,
        private configService: ConfigService,
        private routingService: RoutingService,
        private urlService: UrlService,
        private router: Router
    ) {
        this.portalUrl = this.configService.getPortalUrl();
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

        if (this.routingService.isPathActive([`/${EntityName.PROJECTS}`])) {
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

        this.store
            .pipe(select(selectModalOpen), takeUntil(this.ngDestroy$))
            .subscribe((modalOpen) => {
                this.state$.next({ modalOpen });
            });
    }
}
