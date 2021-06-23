/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service coordinating auth functionality.
 */

// Core dependencies
import { Inject, Injectable, NgZone } from "@angular/core";
import GoogleUser = gapi.auth2.GoogleUser;
import { Action, select, Store } from "@ngrx/store";
import { filter, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../config/config.service";
import { AuthInitAction } from "./_ngrx/auth-init.action";
import { selectAuthInit } from "./_ngrx/auth.selectors";
import { AuthState } from "./_ngrx/auth.state";
import { LoginSuccessAction } from "./_ngrx/login-success.action";
import { LogoutSuccessAction } from "./_ngrx/logout-success.action";
import { SessionContinueAction } from "./_ngrx/session-continue-action";

@Injectable()
export class AuthService {

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {NgZone} ngZone
     * @param {Window} window
     */
    constructor(private configService: ConfigService,
                private store: Store<AuthState>,
                private ngZone: NgZone,
                @Inject("Window") private window: Window) {}

    /**
     * Initialize auth on app init. Must return promise here as this method is called during Angular's app
     * initialization and we need to resolve the auth details before any components are instantiated, or API endpoints
     * are hit.
     * 
     * Currently dev only.
     */
    public init() {

        // Auth is currently only enabled on environments with a configured client ID
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

        const auth2 = this.getGAPI().auth2.getAuthInstance();
        auth2.signIn();
    }

    /**
     * Logout user.
     */
    public logout() {

        const auth2 = this.getGAPI().auth2.getAuthInstance();
        auth2.signOut();
    }

    /**
     * Dispatch of actions from third-party callbacks must be exectued from within Angular context.
     * 
     * @param {Action} action
     */
    private dispatch(action: Action) {

        this.ngZone.run(() => {
            this.store.dispatch(action);
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

        this.getGAPI().auth2.init({
            client_id: this.configService.getGoogleOAuthClientId()
        }).then(() => {

            // Listen for sign-in state changes.
            const signedIn = gapi.auth2.getAuthInstance().isSignedIn; 
            signedIn.listen(_ => this.onSignInChanged(_));

            // Handle initial sign-in state.
            this.onInitialLoginState(signedIn.get());
        });
    }

    /**
     * Dispatch action to indicate auth has been initialized.
     */
    private onInit() {

        this.dispatch(new AuthInitAction()); // TODO revisit - dispatch action regardless of success/error (finally?)
    }

    /**
     * Handle initial login state. If user is authenticated, save user state to store.
     * 
     * @param {boolean} authenticated
     */
    private onInitialLoginState(authenticated: boolean) {

        if ( authenticated ) {
            this.dispatch(new SessionContinueAction(this.getCurrentUser()));
        }

        this.onInit();
    }

    /**
     * Return the authenticated Google user.
     * 
     * @returns {GoogleUser}
     */
    private getCurrentUser(): GoogleUser {

        return this.getGAPI().auth2.getAuthInstance().currentUser.get();
    }

    /**
     * Listener method for sign in/sign out events; set/clear user details in store.
     *
     * @param {boolean} authenticated
     */
    private onSignInChanged(authenticated: boolean) {

        if ( authenticated ) {
            this.dispatch(new LoginSuccessAction(this.getCurrentUser()));
        }
        else {
            this.dispatch(new LogoutSuccessAction());
            }
    };
}
