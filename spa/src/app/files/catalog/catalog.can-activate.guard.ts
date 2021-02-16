 /**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Determines if current route is complete, in that it contains a catalog param for v2 environments. If catalog param is
 * missing, cancel navigation and return new URL containing catalog param. Otherwise let navigation continue as is.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild, Params,
    Router,
    RouterStateSnapshot, UrlSegment,
    UrlTree
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";

// App dependencies
 import { AtlasName } from "../atlas/atlas-name.model";
 import { Catalog } from "./catalog.model";
 import { ConfigService } from "../../config/config.service";
 import { DCPCatalog } from "./dcp-catalog.model";
 import { ErrorAction } from "../../http/_ngrx/error.action";
 import { AppState } from "../../_ngrx/app.state";
 import { selectCatalog, selectCatalogs } from "../_ngrx/catalog/catalog.selectors";

@Injectable()
export class CatalogCanActivateGuard implements CanActivate, CanActivateChild {

    /**
     * @param {ConfigService} configService
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    constructor(private configService: ConfigService,
                private router: Router,
                private store: Store<AppState>) {}

    /**
     * For v2 environments, ensure catalog param is specified in query string.
     *
     * @param {ActivatedRouteSnapshot} activatedRouteSnapshot
     * @param {RouterStateSnapshot} routerStateSnapshot
     * @returns {boolean | Observable<boolean | UrlTree>}
     */
    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
                routerStateSnapshot: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {

        const nextUrl = routerStateSnapshot.url;
        const urlSegments = activatedRouteSnapshot.url;
        const currentQueryParams = activatedRouteSnapshot.queryParams;
        return this.getCanActive(nextUrl, urlSegments, currentQueryParams);
    }

    /**
     * For v2 environments, ensure catalog param is specified in query string.
     * 
     * @param {ActivatedRouteSnapshot} activatedRouteSnapshot
     * @param {RouterStateSnapshot} routerStateSnapshot
     * @returns {boolean | Observable<boolean | UrlTree>}
     */
    canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot,
                     routerStateSnapshot: RouterStateSnapshot): boolean | Observable<boolean | UrlTree> {

        return this.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    }

    /**
     * Adds catalog param to query string.
     * 
     * @param {string} nextUrl - the URL the user is attempting to navigate to
     * @param {UrlSegment[]} urlSegments
     * @param {Params} currentQueryParams - the current set of query string params
     * @returns {boolean | Observable<boolean | UrlTree>}
     */
    private getCanActive(nextUrl: string, urlSegments: UrlSegment[], currentQueryParams: Params): boolean | Observable<boolean | UrlTree> {

        // Catalog is only applicable to v2 environments
        const v2 = this.configService.isV2();
        if ( !v2 ) {
            return true;
        }

        return combineLatest(
            this.store.pipe(select(selectCatalogs)),
            this.store.pipe(select(selectCatalog))
        )
            .pipe(
                take(1),
                switchMap(([catalogs, selectedCatalog]) => {

                    // If there's no catalog param specified in the query string add it and return a new URL tree (which
                    // cancels the current navigation and initiates a new navigation event to the updated URL).
                    const catalogParam = currentQueryParams.catalog;
                    if ( !catalogParam ) {

                        // Determine which catalog to use going forward
                        const redirectToCatalogParam = this.getRedirectToCatalogParam(catalogs, selectedCatalog);

                        // If there's no selected catalog in the store, a catalog-related error has occurred. Allow
                        // navigation to continue as is through to error page.
                        const path = urlSegments[0]?.path;
                        if ( !redirectToCatalogParam && path === "error" ) {
                            return of(true);
                        }

                        // Add catalog to query string and restart navigation 
                        const urlTree = this.router.parseUrl(nextUrl);
                        urlTree.queryParams["catalog"] = redirectToCatalogParam;
                        return of(urlTree);
                    }
                    
                    // Confirm the catalog param is valid. If it's not valid, dispatch error action to trigger redirect
                    // to error page.
                    if ( catalogs.indexOf(catalogParam) === -1 ) {
                        this.store.dispatch(new ErrorAction(`Catalog ${catalogParam} is invalid.`));
                        return of(false);
                    }

                    // Otherwise there is currently a catalog query string param, continue navigation as is. 
                    return of(true);
                })
            );
    }

    /**
     * Returns the catalog to use if catalog is not specified in query string. If the atlas for the current environment
     * is "hca" and DCP1 is in the set of possible catalogs for the current environment, default to DCP1. Otherwise
     * return the selected catalog (which is the Azul-specified default catalog on load) for this environment.
     * 
     * @param {Catalog[]} catalogs
     * @param {Catalog} selectedCatalog
     * @returns {string}
     */
    private getRedirectToCatalogParam(catalogs: Catalog[], selectedCatalog: Catalog): string {

        if ( this.configService.getAtlas() === AtlasName.HCA && catalogs.indexOf(DCPCatalog.DCP1) >= 0 ) {
            return DCPCatalog.DCP1;
        }
        
        return selectedCatalog;
    }
}
