/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for modal layout.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { HamburgerComponentState } from "./hamburger.component.state";
import { selectHamburgerOpen } from "../_ngrx/hamburger.selectors";
import { HamburgerState } from "../_ngrx/hamburger.state";
import { ToggleHamburgerAction } from "../_ngrx/toggle-hamburger.action";

@Component({
    selector: "hamburger",
    templateUrl: "./hamburger.component.html",
    styleUrls: ["./hamburger.component.scss"],
})
export class HamburgerComponent implements OnInit {
    // Template/public variables
    public state$ = new BehaviorSubject<HamburgerComponentState>({
        open: false,
    });

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {Store<HamburgerState>} store
     */
    constructor(private store: Store<HamburgerState>) {}

    /**
     * Handle click on hamburger.
     */
    public onHamburgerToggleClicked() {
        this.store.dispatch(new ToggleHamburgerAction());
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab current state of hamburger.
     */
    public ngOnInit() {
        // Grab the current catalog value - we need this for the announcement banner
        this.store
            .pipe(select(selectHamburgerOpen), takeUntil(this.ngDestroy$))
            .subscribe((open) => {
                this.state$.next({ open });
            });
    }
}
