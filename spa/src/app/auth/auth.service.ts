/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating auth functionality.
 */

// Core dependencies
import { Inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { filter, take } from "rxjs/operators";

// App dependencies
import { selectAuthInit } from "./_ngrx/auth.selectors";
import { AuthState } from "./_ngrx/auth.state";
import { LoginSuccessAction } from "./_ngrx/login-success.action";
import { LogoutSuccessAction } from "./_ngrx/logout-success.action";
import { AuthInitAction } from "./_ngrx/auth-init.action";
import { ConfigService } from "../config/config.service";

@Injectable()
export class AuthService {

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {Window} window
     */
    constructor(private configService: ConfigService, private store: Store<AuthState>, @Inject("Window") private window: Window) {}

    /**
     * Initialize auth on app init. Must return promise here as this method is called during Angular's app
     * initialization and we need to resolve the auth details before any components are instantiated, or API endpoints
     * are hit.
     * 
     * Currently dev only.
     */
    public init() {

        // Auth is currently only enabled on dev 
        if ( !this.configService.isAuthEnabled() ) {
            this.onInit();
            return Promise.resolve();
        }

        this.getGAPI().load("auth2", () => this.initAuthListeners());

        // Wait for auth to be completed before allowing app init to continue (as we require auth for initial
        // API requests).
        return new Promise((resolve) => {

            this.store.pipe(
                select(selectAuthInit),
                filter(init => init),
                take(1)
            ).subscribe(() => {
                resolve(); // TODO revisit - handle error flows here (redirect to error page?)
            })
        });
    }

    /**
     * Login user via Google.
     */
    public login() {

        this.getGAPI().auth2.getAuthInstance().signIn();
    }

    /**
     * Logout user.
     */
    public logout() {

        const auth2 = this.getGAPI().auth2.getAuthInstance();
        auth2.signOut().then(() => {
            this.store.dispatch(new LogoutSuccessAction());
        });
    }

    /**
     * Return the Google API object.
     */
    private getGAPI(): any {

        return this.window["gapi"];
    }

    /**
     * Initialize sign in and set up listeners.
     */
    private initAuthListeners() {

        const auth2 = this.getGAPI().auth2.init({
            client_id: "CLIENT_ID",
            scope: "profile"
        }).then(() => {

            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(_ => this.onSignInChanged(_));

            // Handle initial sign-in state.
            this.onSignInChanged(gapi.auth2.getAuthInstance().isSignedIn.get());

            this.onInit();
        });
    }

    /**
     * Dispatch action to indicate auth has been initialized.
     */
    private onInit() {

        this.store.dispatch(new AuthInitAction()); // TODO revisit - dispatch action regardless of success/error (finally?)
    }

    /**
     * Listener method for sign-out.
     *
     * @param {boolean} authenticated the updated signed out state.
     */
    private onSignInChanged(authenticated: boolean) {

        if ( authenticated ) {
            const user = this.getGAPI().auth2.getAuthInstance().currentUser.get();
            this.store.dispatch(new LoginSuccessAction(user));
        } else {
            this.store.dispatch(new LogoutSuccessAction()); // TODO revisit - should this still be a logout action for the initial page load? 
        }
    };
}
