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

    syncSession(): Observable<User> {
        return this.get(`/api/session`);
    }
}