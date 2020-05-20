/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Core footer component, displays HCA-related links and copyright.
 */

// Core dependencies
import { Component } from "@angular/core";
import { ConfigService } from "../../config/config.service";
import { BehaviorSubject, Subject } from "rxjs/index";
import { AppState } from "../../_ngrx/app.state";
import { takeUntil } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { selectModalOpen } from "../../modal/_ngrx/modal.selectors";
import { HCAFooterState } from "./hca-footer.state";

@Component({
    selector: "hca-footer",
    templateUrl: "hca-footer.component.html",
    styleUrls: ["hca-footer.component.scss"]
})

export class HCAFooterComponent {

    private ngDestroy$ = new Subject();
    private portalUrl: string;
    private state$ = new BehaviorSubject<HCAFooterState>({
        modalOpen: false
    });

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService) {
        this.portalUrl = this.configService.getPortalURL();
    }

    /**
     * Returns true when environment is not v2.
     *
     * @returns {boolean}
     */
    public showSystemStatus(): boolean {

        return !this.configService.isV2();
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
