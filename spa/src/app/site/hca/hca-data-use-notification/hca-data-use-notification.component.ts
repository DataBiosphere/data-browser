/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying download citation.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { select, Store } from "@ngrx/store";
import { takeUntil } from "rxjs/operators";
import { selectAuthenticated } from "../../../auth/_ngrx/auth.selectors";
import { AppState } from "../../../_ngrx/app.state";
import { BehaviorSubject, Subject } from "rxjs";
import { HCADataUseNotificationComponentState } from "./hca-data-use-notification.component.state";

@Component({
    selector: "hca-data-use-notification",
    templateUrl: "./hca-data-use-notification.component.html",
    styleUrls: ["./hca-data-use-notification.component.scss"],
})
export class HCADataUseNotificationComponent implements OnDestroy, OnInit {
    // Template variables
    public portalURL: string;
    public state$ = new BehaviorSubject<HCADataUseNotificationComponentState>({
        authenticated: false,
    });

    // Locals
    private ngDestroy$ = new Subject();

    /**
     *
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     */
    public constructor(
        private configService: ConfigService,
        private store: Store<AppState>
    ) {
        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Returns true if the data confidentiality statement is visible.
     */
    public isConfidentialityVisible(authenticated: boolean): boolean {
        return this.configService.isAuthEnabled() && authenticated;
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
        this.store
            .pipe(select(selectAuthenticated), takeUntil(this.ngDestroy$))
            .subscribe((authenticated) => this.state$.next({ authenticated }));
    }
}
