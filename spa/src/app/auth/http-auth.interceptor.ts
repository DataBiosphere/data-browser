/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Auth interceptor, adds bearer token to requests if user is currently authorized.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { concatMap, take } from "rxjs/operators";

// App dependencies
import { AuthState } from "./_ngrx/auth.state";
import { selectAuthenticated, selectUser } from "./_ngrx/auth.selectors";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    /**
     * @param store
     */
    constructor(private store: Store<AuthState>) {}

    /**
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.store.pipe(
            select(selectUser),
            take(1),
            concatMap((user) => {
                if (user) {
                    const token = user.getAuthResponse(true).access_token;
                    const authRequest = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    return next.handle(authRequest);
                }

                // User isn't authenticated - allow request to continue unchanged
                return next.handle(req);
            })
        );
    }
}
