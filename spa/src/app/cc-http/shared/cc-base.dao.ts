// Dependencies
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
// See robwormald's comments on https://github.com/angular/angular/issues/5632 regarding RxJS operators.
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import * as _ from "lodash";

// App dependencies
import { CONFLICT, NO_CONTENT } from "./http-response-status";
import { ConflictError } from "./error";

/**
 * Base DAO (service) for handing, formatting and parsing HTTP requests/responses.
 */

@Injectable()
export class CCBaseDAO {

    // Local variables
    protected http: Http;

    /**
     * * DAO functionality required HTTP!
     *
     * @param http {Http}
     */
    constructor(http: Http) {
        this.http = http;
    }

    /**
     * Public API
     */

    /**
     * Send straight-up DELETE request, where T is a specific entity class (eg Person).
     *
     * @param url {string}
     * @returns {Observable<any>}
     */
    public deleteEntity<T>(url: string): Observable<T> {

        return this.http
            .delete(url)
            .map(response => this.toJSON(response))
            .catch(response => this.handleError(response));
    }

    /**
     * Send straight-up GET request, where T can be a specific entity class (eg Person).
     *
     * @param url {string}
     * @param queryStringParams {any}
     * @returns {Observable<T>}
     */
    public get<T>(url: string, queryStringParams?: any): Observable<T> {

        // Build up GET headers
        let headers = new Headers();
        this.addAcceptHeader(headers);

        // Build options
        let requestOptions = new RequestOptions({
            headers: headers
        });

        if (!_.isEmpty(queryStringParams)) {

            let params = new URLSearchParams();
            _.forOwn(queryStringParams, (paramValue, paramName) => {
                params.append(paramName, paramValue);
            });

            requestOptions.search = params;
        }

        return <Observable<T>>this.http // TODO revisit typing here...
            .get(url, requestOptions)
            .map(response => this.toJSON(response))
            .catch(response => this.handleError(response));
    }

    /**
     * Send straight-up POST request, where T is a specific entity class (eg Person).
     *
     * @param url {string}
     * @param form {Object}
     * @returns {Observable<T>}
     */
    public post<T>(url: string, form: any = {}): Observable<T> {

        return this.http
            .post(url, form)
            .map(response => this.toJSON(response))
            .catch(response => this.handleError(response));
    }

    /**
     * Send straight-up PUT request, where T is a specific entity class (eg Person).
     *
     * @param url {string}
     * @param form {T}
     * @returns {Observable<T>}
     */
    public put<T>(url: string, form: any): Observable<T> {

        return this.http
            .put(url, form)
            .map(response => this.toJSON(response))
            .catch(response => this.handleError(response));
    }

    /**
     * Handle error responses
     *
     * @param response
     * @returns {any}
     */
    public handleError(response: Response) {

        // TODO conflict here with session timeout vs invalid login - disabled this to enable handling of 401 on
        // invalid login in LoginComponent if ( response.status === UNAUTHORIZED ) { window.location.reload(); }

        if (response.status === CONFLICT) {
            return Observable.throw(new ConflictError(response.json()));
        }

        return Observable.throw(response.json());
    }

    /**
     * Parse response as JSON. If response code is 204 (no content), return empty object.
     *
     * @param response {Response}
     * @returns {any}
     */
    public toJSON(response: Response): any {

        if (response.status === NO_CONTENT) {
            return {};
        }
        return response.json();
    }

    /**
     * Private API
     */

    /**
     * Add accept of "application/json" to headers
     *
     * @param headers {Headers}
     */
    private addAcceptHeader(headers: Headers): void {

        headers.append("accept", "application/json");
    }

    // /**
    //  * Add content type of "application/json" to headers
    //  *
    //  * @param headers {Headers}
    //  */
    // private addContentTypeHeader(headers: Headers): void {
    //
    //     headers.append("content-type", "application/json;charset=UTF-8");
    // }
}
