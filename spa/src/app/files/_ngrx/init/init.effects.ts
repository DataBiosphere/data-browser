/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects on init of app.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { concatMap, filter, map, take, takeUntil, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { selectCatalog } from "../catalog/catalog.selectors";
import { ConfigService } from "../../../config/config.service";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { ErrorAction } from "../../../http/_ngrx/error.action";
import { AppState } from "../../../_ngrx/app.state";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { EntityName } from "../../shared/entity-name.model";
import { GADimension } from "../../../shared/analytics/ga-dimension.model";
import { SystemStatusRequestAction } from "../../../system/_ngrx/system-status-request.action";

@Injectable()
export class InitEffects {

    /**
     * @param {ConfigService} configService
     * @param {GTMService} gtmService
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    constructor(private configService: ConfigService,
                private gtmService: GTMService,
                private searchTermUrlService: SearchTermUrlService,
                private store: Store<AppState>,
                private actions$: Actions,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    /**
     * Trigger GA/GTM pageview event on navigation.
     */
    @Effect({dispatch: false})
    initPageview$ = this.router.events.pipe(
        filter(evt => evt instanceof NavigationEnd),
        // Filter any "intermediate" paths that are always redirected to another route
        filter((evt: NavigationEnd) => evt.url !== "/" && evt.url !== "/explore"),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1))
            )
        )),
        tap(([action, catalog]) => {
            this.gtmService.trackEvent({
                category: GACategory.DB_PAGEVIEW,
                dimensions: {
                    [GADimension.CATALOG]: catalog
                }
            });
        })
    );

    /**
     * Set up default table state:
     * - Set selected entity
     * - Set default search terms if user has arrived at site with no previous search terms selected, and user is
     * currently viewing the projects tab.
     * - Set selected catalog
     *
     * The dispatched SetViewStateAction triggers the following:
     * - Sets the selected entity in the store
     * - Sets search terms in the store
     * - Sets the selected term facets in the store
     * - Updates the filter query string parameter, if a filter is specified
     * - Sets the selected catalog
     */
    @Effect()
    initSearchState$: Observable<Action> = this.router.events.pipe(
        takeUntil(this.actions$.pipe(ofType(ErrorAction.ACTION_TYPE))),
        filter(evt => evt instanceof NavigationEnd && evt.url !== "/error" && evt.url !== "/not-found"), // Exit init if routing to error or not found pages
        take(1),
        map(() => {
            
            // Determine the current selected entity
            let selectedEntity;
            if ( this.router.isActive(EntityName.FILES, false) ) {
                selectedEntity = EntityName.FILES;
            }
            else if ( this.router.isActive(EntityName.SAMPLES, false) ) {
                selectedEntity = EntityName.SAMPLES;
            }
            else {
                selectedEntity = EntityName.PROJECTS;
            }

            // Parse the current filter from the URL, if any.
            const params = this.activatedRoute.snapshot.queryParams;
            let filter;
            try {
                filter = this.searchTermUrlService.parseQueryStringSearchTerms(params);
            }
            catch(e) {
                return new ErrorAction(e.message);
            }

            // If no catalog is specified in the query string, use the default catalog
            const catalog = params.catalog || this.configService.getDefaultCatalog();

            return new SetViewStateAction(catalog, selectedEntity, filter);
        })
    );

    /**
     * Fetch system status. 
     * 
     * TODO Must be declared after initSearchState as the selected catalog is required on the system status fetch. See #1599.
     */
    @Effect()
    fetchSystemStatus$: Observable<Action> = this.router.events.pipe(
        filter(evt => evt instanceof NavigationEnd),
        take(1),
        map(() => {
            return new SystemStatusRequestAction();
        })
    );
}
