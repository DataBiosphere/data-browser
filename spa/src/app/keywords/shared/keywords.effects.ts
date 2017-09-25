import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

import { KeywordsService } from "./keywords.service";
import { FetchKeywordsRequestAction, FetchKeywordsSuccessAction } from "../_ngrx/keyword.actions";


@Injectable()
export class KeywordsEffects {

    constructor(private actions$: Actions,
                private keywordsService: KeywordsService) { }

    @Effect()
    queryKeywords$: Observable<Action> = this.actions$
        .ofType(FetchKeywordsRequestAction.ACTION_TYPE)
        .switchMap((action: FetchKeywordsRequestAction) => {
            return this.keywordsService.searchKeywords(action.searchTerm, action.keywordType);
        })
        .map((queryResults) => {
            return new FetchKeywordsSuccessAction(queryResults);
        });
}
