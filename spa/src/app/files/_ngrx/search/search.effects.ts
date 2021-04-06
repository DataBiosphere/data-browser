/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Search-related side effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { concatMap, take, tap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { TrackingAction } from "../analytics/tracking.action";
import { ClearSelectedAgeRangeAction } from "./clear-selected-age-range.action";
import { ClearSelectedTermsAction } from "./clear-selected-terms.action";
import { SelectFacetAgeRangeAction } from "./select-facet-age-range.action";
import { SelectFileFacetTermAction } from "./select-file-facet-term.action";
import { selectPreviousQuery } from "./search.selectors";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { selectSelectedEntitySpec } from "../files.selectors";
import { GAIndex } from "../../../shared/analytics/ga-index.model";

@Injectable()
export class SearchEffects {

    /**
     * @param {GTMService} gtmService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private gtmService: GTMService,
                private store: Store<AppState>,
                private actions$: Actions) {}

    /**
     * Track any update to selected search terms.
     */
    @Effect({dispatch: false})
    updateSelectedSearchTerms$ = this.actions$.pipe(
        ofType(
            ClearSelectedTermsAction.ACTION_TYPE, // Clear all selected terms
            ClearSelectedAgeRangeAction.ACTION_TYPE, // Clear age range
            SelectFileFacetTermAction.ACTION_TYPE, // Selecting facet term eg file type "bam"
            SelectFacetAgeRangeAction.ACTION_TYPE // Setting age range
        ),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectSelectedEntitySpec), take(1)),
                this.store.pipe(select(selectPreviousQuery), take(1))
            )
        )),
        tap(([action, selectedEntitySpec, queryWhenActionTriggered]) => {

            const entityKey = selectedEntitySpec.key;
            const index = GAIndex[entityKey.toUpperCase()];
            this.gtmService.trackEvent((action as TrackingAction).asEvent({
                index, 
                currentQuery: queryWhenActionTriggered
            }));
        })
    );
}
