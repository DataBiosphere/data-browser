/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * URL-related side effects.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { concatMap, filter, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { SelectCatalogAction } from "../catalog/select-catalog.action";
import { SelectEntityAction } from "../entity/select-entity.action";
import { AppState } from "../../../_ngrx/app.state";
import { ClearSelectedAgeRangeAction } from "../search/clear-selected-age-range.action";
import { ClearSelectedTermsAction } from "../search/clear-selected-terms.action";
import { SelectFacetAgeRangeAction } from "../search/select-facet-age-range.action";
import { SelectFileFacetTermAction } from "../search/select-file-facet-term.action";
import { SelectProjectIdAction } from "../search/select-project-id.action";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { selectUrlSpecState } from "./url.selectors";
import { UrlService } from "../../url/url.service";

@Injectable()
export class UrlEffects {

    /**
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {UrlService} urlService
     * @param {Store<AppState>} store
     * @param {Router} router
     * @param {Actions} actions$
     */
    constructor(private searchTermUrlService: SearchTermUrlService,
                private urlService: UrlService,
                private store: Store<AppState>,
                private router: Router,
                private actions$: Actions) {
    }

    /**
     * Update catalog query string param if catalog has been selected.
     */
    @Effect({dispatch: false})
    updateCatalogQueryParam$ = this.actions$.pipe(
        ofType(SelectCatalogAction.ACTION_TYPE),
        tap((action: SelectCatalogAction) => {
            
            // Update catalog query string parameter, retaining any existing query string parameters
            const catalog = action.catalog;
            this.router.navigate([], {
                queryParams: {
                    catalog: catalog ? catalog : null // Handle possible clear of catalog value
                },
                queryParamsHandling: "merge"
            });
        })
    );

    /**
     * Update filter query string param if selected entity or selected search terms has changed. 
     */
    @Effect({dispatch: false})
    updateFilterQueryParam$ = this.actions$.pipe(
        ofType(
            ClearSelectedTermsAction.ACTION_TYPE,
            ClearSelectedAgeRangeAction.ACTION_TYPE,
            SelectEntityAction.ACTION_TYPE,
            SelectFileFacetTermAction.ACTION_TYPE,
            SelectFacetAgeRangeAction.ACTION_TYPE,
            SelectProjectIdAction.ACTION_TYPE
        ),
        filter(() => {

            // We only want to update the location if user is currently viewing /projects, /samples or /files.
            return this.urlService.isViewingEntities();
        }),
        concatMap(action => of(action).pipe(
            withLatestFrom(this.store.pipe(select(selectUrlSpecState), take(1)))
        )),
        tap(([action, urlSpecState]) => {

            // Determine if we need to update the path - only required if there is a switch in selected entity
            const pathTokens = [];
            if ( action.type === SelectEntityAction.ACTION_TYPE ) {
                pathTokens.push((action as SelectEntityAction).entityKey);
            }

            const filterQueryString =
                this.searchTermUrlService.stringifySearchTerms(urlSpecState.selectedSearchTermsBySearchKey);

            // Update filter query string parameter, retaining any existing query string parameters
            this.router.navigate(pathTokens, {
                queryParams: {
                    filter: filterQueryString ? filterQueryString : null
                },
                queryParamsHandling: "merge"
            });
        })
    );
}
