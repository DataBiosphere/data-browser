/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Interceptor handling HTTP error responses.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

// App dependencies
import { AppState } from "../_ngrx/app.state";
import { ErrorResponseAction } from "./_ngrx/http-error-response.actions";

@Injectable()
export class HCAHttpResponseErrorInterceptor implements HttpInterceptor {

    // Constants
    private ERROR_CODE_URLS = new Map<number, string>([
        [404, "/not-found"],
        [500, "/error"]
    ]);
    private NO_REDIRECT_PATHS = [
        "/integrations"
    ];

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

                    // Allow system service to handle health check errors or HEAD checks
                    if ( this.isNoRedirectOnError(req, error) ) {
                        return throwError(error);
                    }

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
     * Returns true if the error should be ignored by interceptor and handled by calling code.
     * 
     * @param {HttpRequest<any>} req
     * @param {HttpErrorResponse} error
     * @returns {boolean}
     */
    private isNoRedirectOnError(req: HttpRequest<any>, error: HttpErrorResponse): boolean {

        return this.isHEADRequest(req) ||
            this.isNoRedirectPath(req, error) ||
            this.isHealthCheckError(error);
    }

    /**
     * Returns true if the request path can be handled by the calling code and ignored by the interceptor.
     *
     * @param {HttpRequest<any>} req
     * @param {HttpErrorResponse} error
     * @returns {boolean}
     */
    private isNoRedirectPath(req: HttpRequest<any>, error: HttpErrorResponse): boolean {

        const path = new URL(error.url).pathname;
        return error.status === 400 && 
            this.NO_REDIRECT_PATHS.indexOf(path) >= 0;
    }

    /**
     * Returns true if the request URL is the health check URL, and the response code is 503. The health check end point
     * returns a 503 if there health status is not OK.
     *
     * @param {HttpErrorResponse} error
     * @returns {boolean}
     */
    private isHealthCheckError(error: HttpErrorResponse): boolean {

        return error.status === 503 && new URL(error.url).pathname === "/health/progress";
    }

    /**
     * Returns true if the request method is HEAD.
     * 
     * @param {HttpRequest<any>} req
     */
    private isHEADRequest(req: HttpRequest<any>): boolean {
        
        return req.method === "HEAD";
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
