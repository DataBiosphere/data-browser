/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 * 
 * Core toolbar component for HCA instance, displays HCA logo and HCA-related menu items.
 */

// Core dependencies
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// App dependencies
import { DownloadRedwoodTokenAction } from "../../auth/_ngrx/auth.actions";
import { selectAuthenticated, selectAuthenticatedUser } from "../../auth/_ngrx/auth.selectors";
import { ConfigService } from "../../config/config.service";
import { User } from "../../data/user/user.model";
import { AppState } from "../../_ngrx/app.state";

@Component({
    selector: "hca-toolbar",
    templateUrl: "hca-toolbar.component.html",
    styleUrls: ["hca-toolbar.component.scss"]
})

export class HCAToolbarComponent {

    // Locals
    authenticated$: Observable<boolean>;
    authorizedUser$: Observable<User>;
    hasRedwoodToken$: Observable<boolean>;
    rootUrl: string;

    /**
     * @param {Store<AppState>} store
     * @param {ConfigService} configService
     */
    constructor(private store: Store<AppState>,
                private configService: ConfigService) {
        this.authenticated$ = this.store.select(selectAuthenticated);
        const user$ = this.store.select(selectAuthenticatedUser);

        this.authorizedUser$ = user$.map((user: User) => {
            if (user && user.email) {
                return user;
            }
            return null;
        });

        this.hasRedwoodToken$ = this.authorizedUser$.map((user: User) => {
            return user && user.redwood_token !== "None";
        });

        this.rootUrl = this.configService.getDataURL();
    }

    /**
     * Dispatch Redwood download token action.
     */
    onDownloadRedwoodToken() {
        this.store.dispatch(new DownloadRedwoodTokenAction());
    }
}
