import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";

import "rxjs/add/operator/switchMap";

import { UserService } from "../../data/user/user.service";
import { User } from "../../data/user/user.model";
import { SyncSessionRequestAction, SyncSessionSuccessAction } from "./auth.actions";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
                private userService: UserService) {
    }

    @Effect()
    $syncSession = this.actions$
        .ofType(SyncSessionRequestAction.ACTION_TYPE)
        .switchMap(() => {
            return this.userService
                .syncSession();
        })
        .map((user: User) => {
            return new SyncSessionSuccessAction(user);
        });
}
