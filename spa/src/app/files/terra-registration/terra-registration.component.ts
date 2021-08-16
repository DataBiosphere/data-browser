/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying Terra registration information page. Displayed when user is authenticated
 * but not registered with Terra.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import GoogleUser = gapi.auth2.GoogleUser;
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

// App dependencies
import { LogoutRequestAction } from "../../auth/_ngrx/logout-request.action";
import { selectUser } from "../../auth/_ngrx/auth.selectors";
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { TerraRegistrationComponentState } from "./terra-registration.component.state";

@Component({
    selector: "terra-registration",
    templateUrl: "terra-registration.component.html",
    styleUrls: ["terra-registration.component.scss"]
})
export class TerraRegistrationComponent implements OnDestroy, OnInit {
    
    // Template variables
    public state$ = new BehaviorSubject<TerraRegistrationComponentState>({
        loaded: false
    });
    
    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState} store
     */
    constructor(private configService: ConfigService, private store: Store<AppState>) {}

    /**
     * Returns the Terra registration URL. 
     */
    public getRegistrationUrl() {

        return this.configService.getTerraExportUrl();
    }

    /**
     * Return the email for the current user.
     *
     * @param {GoogleUser} user
     * @returns {string}
     */
    public getEmail(user: GoogleUser): string {

        return user.getBasicProfile().getEmail();
    }

    /**
     * Dispatch event to logout user via Google.
     */
    public onLogoutClicked() {

        this.store.dispatch(new LogoutRequestAction());
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab the current user credentials.
     */
    public ngOnInit() {

        this.store.pipe(
            select(selectUser),
            takeUntil(this.ngDestroy$)
        ).subscribe(user => {
            this.state$.next({
                loaded: true,
                user
            })
        });
    }
}
