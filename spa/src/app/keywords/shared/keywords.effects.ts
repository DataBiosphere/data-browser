import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { KeywordsService } from "./keywords.service";
import { FetchKeywordsRequestAction, FetchKeywordsSuccessAction } from "../_ngrx/keyword.actions";


@Injectable()
export class KeywordsEffects {

    constructor(private actions$: Actions,
                private keywordsService: KeywordsService) { }

    @Effect()
    queryKeywords$: Observable<Action> = this.actions$
        .pipe(
            ofType(FetchKeywordsRequestAction.ACTION_TYPE),
            switchMap((action: FetchKeywordsRequestAction) =>
                this.keywordsService.searchKeywords(action.searchTerm, action.keywordType)),
            map((queryResults) => new FetchKeywordsSuccessAction(queryResults))
        );
}
