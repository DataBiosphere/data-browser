// Dependencies
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { selectAuthenticated, selectAuthenticatedUser } from "../../auth/_ngrx/auth.selectors";
import { User } from "../../data/user/user.model";
import { AppState } from "../../_ngrx/app.state";
import { DownloadRedwoodTokenAction } from "../../auth/_ngrx/auth.actions";
import { ConfigService } from "../config.service";

/**
 * Core toolbar component, displays UCSC Genomics Institute logo and CGL-related menu items.
 */

@Component({
    selector: "cgl-toolbar",
    templateUrl: "cgl-toolbar.component.html",
    styleUrls: ["cgl-toolbar.component.scss"]
})

export class CGLToolbarComponent {

    authenticated$: Observable<boolean>;
    authorizedUser$: Observable<User>;
    hasRedwoodToken$: Observable<boolean>;
    rootUrl: string;

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

        this.rootUrl = this.configService.getRootUrl();
    }

    onDownloadRedwoodToken() {
        this.store.dispatch(new DownloadRedwoodTokenAction());
    }
}
