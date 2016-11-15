import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/mergeMap";

import { ACTIONS } from "../../shared/boardwalk.actions";
import { KeywordsService } from "./keywords.service";

@Injectable()
export class KeywordsEffects {

    constructor(private actions$: Actions,
                private keywordsService: KeywordsService) { }

    @Effect()
    queryKeywords$: Observable<Action> = this.actions$
        .ofType(ACTIONS.REQUEST_KEYWORDS_QUERY)
        .mergeMap((action) => {
            return this.keywordsService.searchKeywords(action.payload);
        });
}
