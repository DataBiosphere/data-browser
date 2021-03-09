/**
 * LungMAP
 * https://lungmap.net/
 *
 * Core footer component, displays LungMAP-related links and copyright.
 */

// Core dependencies
import { Component } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";

// App dependencies
import { LungMAPFooterState } from "./lungmap-footer.state";
import { selectModalOpen } from "../../../modal/_ngrx/modal.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { FooterComponent } from "../../site-config/footer.component";

@Component({
    selector: "lungmap-footer",
    templateUrl: "lungmap-footer.component.html",
    styleUrls: ["lungmap-footer.component.scss"]
})

export class LungMAPFooterComponent implements FooterComponent {

    // Template variables
    public state$ = new BehaviorSubject<LungMAPFooterState>({
        modalOpen: false
    });

    // Locals
    private ngDestroy$ = new Subject<boolean>();
    
    /**
     * @param {Store<AppState>} store
     */
    constructor(private store: Store<AppState>) {}

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
