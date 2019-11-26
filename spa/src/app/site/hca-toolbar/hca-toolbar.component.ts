/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core toolbar component for HCA, displays HCA logo and HCA-related menu items.
 */

// Core dependencies
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { HCAToolbarState } from "./hca-toolbar.state";
import { selectModalOpen } from "../../modal/_ngrx/modal.selectors";
import { AppState } from "../../_ngrx/app.state";
import { Subject } from "rxjs/index";

@Component({
    selector: "hca-toolbar",
    templateUrl: "hca-toolbar.component.html",
    styleUrls: ["hca-toolbar.component.scss"]
})

export class HCAToolbarComponent implements OnDestroy, OnInit {

    private ngDestroy$ = new Subject();
    private portalUrl: string;
    private state$ = new BehaviorSubject<HCAToolbarState>({
        modalOpen: false
    });

    // Output
    @Output() menuOpen = new EventEmitter<boolean>();

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService) {
        this.portalUrl = this.configService.getPortalURL();
    }

    /**
     * Event emitted when mobile navigation menu is open - to prevent body scroll.
     */
    public isMenuOpen(value) {

        this.menuOpen.emit(value);
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

        this.store.pipe(
            select(selectModalOpen),
            takeUntil(this.ngDestroy$)
        ).subscribe(modalOpen => {
            this.state$.next({modalOpen});
        });
    }
}
