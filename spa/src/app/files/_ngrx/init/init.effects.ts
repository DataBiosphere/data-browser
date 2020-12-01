/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects on init of app.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Actions, Effect } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map, take, tap } from "rxjs/operators";

// App dependencies
import { Catalog } from "../../catalog/catalog.model";
import { DefaultFilterInitAction } from "./default-filter-init.action";
import { SetViewStateAction } from "../facet/set-view-state.action";
import { AppState } from "../../../_ngrx/app.state";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { GACategory } from "../../../shared/analytics/ga-category.model";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { EntityName } from "../../shared/entity-name.model";

@Injectable()
export class InitEffects {

    /**
     * @param {GTMService} gtmService
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    constructor(private gtmService: GTMService,
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
        tap(() => {
            this.gtmService.trackEvent({
                category: GACategory.DB_PAGEVIEW
            });
        })
    );

    /**
     * Set up default table state:
     * - Set selected entity
     * - Set default search terms if user has arrived at site with no previous search terms selected, and user is
     * currently viewing the projects tab.
     *
     * The dispatched SetViewStateAction triggers the following:
     * - Sets the selected entity in the store
     * - Sets search terms in the store
     * - Sets the selected term facets in the store
     * - Updates the filter query string parameter, if a filter is specified
     */
    @Effect()
    initSearchState$: Observable<Action> = this.router.events.pipe(
        filter(evt => evt instanceof NavigationEnd),
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
            let filter = this.searchTermUrlService.parseQueryStringSearchTerms(params);

            // Set catalog to none if not specified in params
            const catalog = params.catalog ? params.catalog : Catalog.NONE;

            return new SetViewStateAction(catalog, selectedEntity, filter);
        })
    );

    /**
     * After initial router has completed, trigger action to update state indicating default filter has been applied.
     */
    @Effect()
    updateDefaultFilterInit$ = this.router.events.pipe(
        filter(evt => evt instanceof NavigationEnd),
        take(1),
        map(() => {
            return new DefaultFilterInitAction();
        })
    );
}
