/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Survey-related effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

// App dependencies
import { TakeSurveyAction } from "./_ngrx/take-survey.action";
import { GTMService } from "../shared/analytics/gtm.service";

@Injectable()
export class SurveyEffects {
    /**
     * @param {GTMService} gtmService
     * @param {Actions} actions$
     */
    constructor(private gtmService: GTMService, private actions$: Actions) {}

    /**
     * Track click on survey launch button.
     */

    trackTakeSurvey$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(TakeSurveyAction.ACTION_TYPE),
                tap((action) => {
                    this.gtmService.trackEvent(
                        (action as TakeSurveyAction).asEvent()
                    );
                })
            ),
        { dispatch: false }
    );
}
