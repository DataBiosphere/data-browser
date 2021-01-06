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
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { Catalog } from "./catalog.model";

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
        const currentQueryParams = activatedRouteSnapshot.queryParams;
        return this.getCanActive(nextUrl, currentQueryParams);
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
     * @param {Params} currentQueryParams - the current set of query string params
     * @returns {boolean | Observable<boolean | UrlTree>}
     */
    private getCanActive(nextUrl: string, currentQueryParams: Params): boolean | Observable<boolean | UrlTree> {

        // Catalog is only applicable to v2 environments
        const v2 = this.configService.isV2();
        if ( !v2 ) {
            return true;
        }

        return this.store.pipe(
            select(selectCatalog),
            take(1),
            switchMap((selectedCatalog) => {

                // If there's no catalog param specified in the query string add it and return a new URL tree (which
                // cancels the current navigation and initiates a new navigation event to the updated URL).
                const catalogParam = currentQueryParams.catalog;
                if ( !catalogParam ) {

                    // Add the catalog param - if there's a selected catalog in the state, use the selected catalog. If
                    // not, default to catalog for the current environment.
                    const urlTree = this.router.parseUrl(nextUrl);
                    urlTree.queryParams["catalog"] =
                        selectedCatalog ? selectedCatalog : this.configService.getDefaultCatalog();
                    return of(urlTree);
                }
                
                // Otherwise there is currently a catalog query string param, continue navigation as is. 
                return of(true);
            })
        );
    }
}
