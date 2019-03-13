import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";


import { UserService } from "../../data/user/user.service";
import { User } from "../../data/user/user.model";
// import { SyncSessionRequestAction, SyncSessionSuccessAction } from "./auth.actions";

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions,
                private userService: UserService) {
    }

    // @Effect()
    // $syncSession = this.actions$
    //     .ofType(SyncSessionRequestAction.ACTION_TYPE)
    //     .switchMap(() => {
    //         return this.userService
    //             .syncSession();
    //     })
    //     .map((user: User) => {
    //         return new SyncSessionSuccessAction(user);
    //     });

    // @Effect({dispatch: false})
    // $downloadToken = this.actions$
    //     .ofType(DownloadRedwoodTokenAction.ACTION_TYPE)
    //     .switchMap(() => {
    //         return this.userService.downloadRedwoodToken();
    //     });
}
