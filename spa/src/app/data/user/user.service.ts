import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { CCBaseDAO } from "../../cc-http/shared/cc-base.dao";
import { User } from "./user.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService extends CCBaseDAO {

    constructor(http: Http) {
        super(http);
    }

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
    //     // return this.get(`/api/user/redwood-token`);
    //     return Observable.of(true);
    // }
}