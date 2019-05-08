/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Interceptor handling HTTP error responses.
 */

// Core dependencies
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

// App dependencies
import { AppState } from "../_ngrx/app.state";
import { ErrorResponseAction } from "./_ngrx/http-error-response.actions";

export class HCAHttpResponseErrorInterceptor implements HttpInterceptor {

    // Constants
    private ERROR_CODE_URLS = new Map<number, string>([
        [404, "/not-found"],
        [500, "/error"]
    ]);

    /**
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    constructor(private router:  Router, private store: Store<AppState>) {}

    /**
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {

                if ( error instanceof HttpErrorResponse ) {

                    // Save error to store
                    const errorMessage = this.parseErrorMessage(error);
                    this.store.dispatch(new ErrorResponseAction(req.url, error.status, errorMessage));

                    // If there isn't a specific error page for the error status, show the generic "500" error page
                    const redirectUrl = this.ERROR_CODE_URLS.get(error.status) || this.ERROR_CODE_URLS.get(500);
                    this.router.navigateByUrl(redirectUrl, {replaceUrl: true});

                    return EMPTY;
                }

                return throwError(error);
            })
        );
    }

    /**
     * Grab the error message from the response error - we'll add this to the store. Must handle different formats of
     * error responses.
     * 
     * @param {HttpErrorResponse} error
     * @returns {string}
     */
    private parseErrorMessage(error: HttpErrorResponse): string {

        if ( !error.error ) {
            return error.toString();
        }

        if ( error.error.Message ) {
            return error.error.Message;
        }

        return error.error;

    }
}
