 /**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Determines if current route is complete, in that the catalog query string parameter is correct for the atlas and
  * default catalog. If catalog param is corrected, cancel current navigation event and return new URL tree to trigger
  * navigation to correct URL. Otherwise let navigation continue as is.
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
 import { Catalog } from "./catalog.model";
 import { ConfigService } from "../../config/config.service";
 import { DCPCatalog } from "./dcp-catalog.model";
 import { ErrorAction } from "../../http/_ngrx/error.action";
 import { AppState } from "../../_ngrx/app.state";
 import { selectCatalogs, selectDefaultCatalog } from "../_ngrx/catalog/catalog.selectors";

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
     * Ensure catalog param is either removed or maintained, depending on atlas and default catalog, in query string.
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
     * Ensure catalog param is either removed or maintained, depending on atlas and default catalog, in query string.
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
     * Determine if catalog param needs to be removed or maintained in query string.
     * 
     * @param {string} nextUrl - the URL the user is attempting to navigate to
     * @param {UrlSegment[]} urlSegments
     * @param {Params} currentQueryParams - the current set of query string params
     * @returns {boolean | Observable<boolean | UrlTree>}
     */
    private getCanActive(nextUrl: string, urlSegments: UrlSegment[], currentQueryParams: Params): boolean | Observable<boolean | UrlTree> {

        return combineLatest(
            this.store.pipe(select(selectCatalogs)),
            this.store.pipe(select(selectDefaultCatalog))
        )
        .pipe(
            take(1),
            switchMap(([catalogs, defaultCatalog]) => {

                const catalogParam = currentQueryParams.catalog;

                // If there is no catalog param specified, continue as is.
                if ( !catalogParam ) {
                    return of(true);
                }

                // Confirm the catalog param is valid. If it's not valid, dispatch error action to trigger redirect
                // to error page.
                if ( this.isCatalogValid(catalogs, catalogParam) ) {
                    this.store.dispatch(new ErrorAction(`Catalog ${catalogParam} is invalid.`));
                    return of(false);
                }

                // Catalog param is not required - remove from URL. This is true for catalog param "dcp2".
                if ( this.isRemoveCatalogParam(defaultCatalog, catalogParam) ) {
                    return of(this.buildRedirectUrlTree(nextUrl));
                }

                // Allow all other catalogs to remain in URL.
                return of(true);
            })
        );
    }

    /**
     * Build a URL tree from the current URL, removing the catalog param.
     * 
     * @param {string} nextUrl
     */
    private buildRedirectUrlTree(nextUrl: string): UrlTree {

        const urlTree = this.router.parseUrl(nextUrl);
        const queryParams = Object.assign({}, urlTree.queryParams);
        delete queryParams["catalog"];
        urlTree.queryParams = queryParams;
        return urlTree;
    }

    /**
     * Returns true if the catalog param is specified in the set of catalogs for this atlas.
     * 
     * @param {Catalog[]} catalogs
     * @param {string} catalogParam
     */
    private isCatalogValid(catalogs: Catalog[], catalogParam: string): boolean {

        return catalogs.indexOf(catalogParam) === -1;
    }

    /**
     * Returns true if catalog param is to be removed from the query string. True if the catalog param is dcp2, or
     * the catalog param is the same as the default catalog.
     *
     * @param {string} defaultCatalog
     * @param {string} catalogParam
     * @returns {string}
     */
    private isRemoveCatalogParam(defaultCatalog: Catalog, catalogParam: string): boolean {

        return catalogParam === DCPCatalog.DCP2 ||
            catalogParam === defaultCatalog;
    }
}
