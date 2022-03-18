/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Coordination of side effects of catalog-related actions.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, concatMap, filter, map, switchMap, take, tap, withLatestFrom } from "rxjs/operators";

// App dependencies
import { Atlas } from "../../atlas/atlas.model";
import { selectCatalog, selectDefaultCatalog } from "./catalog.selectors";
import { CatalogService } from "../../catalog/catalog.service";
import { FetchCatalogsErrorAction } from "./fetch-catalogs-error.action";
import { FetchCatalogsRequestAction } from "./fetch-catalogs-request.action";
import { FetchCatalogsSuccessAction } from "./fetch-catalogs-success.action";
import { ErrorAction } from "../../../http/_ngrx/error.action";
import { AppState } from "../../../_ngrx/app.state";
import { SetCatalogUpdatedSinceLastVisitAction } from "./set-catalog-updated-since-last-visit.action";
import { GTMService } from "../../../shared/analytics/gtm.service";
import { ViewCatalogAction } from "./view-catalog.action";

@Injectable()
export class CatalogEffects {

    /**
     * @param {CatalogService} catalogService
     * @param {GTMService} gtmService
     * @param {Router} router
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     */
    constructor(private catalogService: CatalogService,
                private gtmService: GTMService,
                private router: Router,
                private store: Store<AppState>,
                private actions$: Actions) {}

    /**
     * Fetch catalogs on app init.
     */
    
    fetchCatalogs$ = createEffect(() => this.actions$.pipe(
        ofType(FetchCatalogsRequestAction.ACTION_TYPE),
        switchMap(() => 
            this.catalogService.fetchCatalogs().pipe(
                map((atlas: Atlas) => new FetchCatalogsSuccessAction(atlas)),
                catchError((errorMessage) => of(new FetchCatalogsErrorAction(), new ErrorAction(errorMessage)))
            )
        )
    ));

    /**
     * Track view of catalog from announcement.
     */
    
    viewCatalog$ = createEffect(() => this.actions$.pipe(
        ofType(ViewCatalogAction.ACTION_TYPE),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectCatalog), take(1))
            )
        )),
        tap(([action, catalog]) => {
            this.gtmService.trackEvent((action as ViewCatalogAction).asEvent({catalog}));
        })
    ), {dispatch: false});

    /**
     * Determine on load if there is a new catalog since the user's last visit, if any.
     */
    
    initCatalogUpdatedSinceLastVisit$: Observable<Action> = createEffect(() => this.router.events.pipe(
        // Exit init if routing to error or not found pages, or if Terra registration is required.
        filter((evt) => {
            return evt instanceof NavigationEnd;
        }),
        take(1),
        concatMap(action => of(action).pipe(
            withLatestFrom(
                this.store.pipe(select(selectDefaultCatalog), take(1))
            )
        )),
        map(([,catalog]) => {

            const updatedSinceLastVisit = this.catalogService.isCatalogUpdatedSinceLastVisit(catalog);
            return new SetCatalogUpdatedSinceLastVisitAction(updatedSinceLastVisit);
        })
    ));
}
