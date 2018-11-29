/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data access object for hitting user-related API end points.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// App dependencies
import { User } from "./user.model";

@Injectable()
export class UserService {

    /**
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {}

    /**
     * Sync Session
     *
     * @returns {Observable<User>}
     */
    // syncSession(): Observable<User> {
    //     return this.get(`/api/session`);
    // }

    /**
     * Download Redwood Token
     *
     * @returns {Observable<void>}
     */
    // downloadRedwoodToken(): Observable<boolean> {
    //     window.location.href = `/api/user/redwood-token`;
    //     // return this.httpClient.get(`/api/user/redwood-token`);
    //     return Observable.of(true);
    // }
}
