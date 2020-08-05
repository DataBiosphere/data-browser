/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Determines if route to projects is complete, in that it contains the current state.
 * 
 * This guard typically catches internal links to "/projects" that don't include the current set of selected search terms,
 * causing an additional pageview hit (by first loading "/projects" then writing the current search terms or catalog
 * value to the URL).
 * 
 * By catching this case here, we can redirect to the full URL (/projects?filter=x&catalog=y) rather than specifying the
 * full URL in every component that links to "/projects", to prevent the additional pageview hit.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/file.selectors";
import { selectSelectedSearchTermsBySearchKey } from "../_ngrx/search/search.selectors";
import { SearchTermUrlService } from "../search/url/search-term-url.service";

@Injectable()
export class ProjectsCanActivateGuard implements CanActivate {

    /**
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Store<AppState>} store
     * @param {Router} router
     */
    constructor(private searchTermUrlService: SearchTermUrlService,
                private store: Store<AppState>,
                private router: Router) {}

    /**
     * Returns true if projects path contains the current state of the app (eg the current set of selected search terms).
     * Otherwise it returns a URL tree containing the full state.
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        
        
        return combineLatest(
            this.store.pipe(select(selectCatalog), take(1)),
            this.store.pipe(select(selectSelectedSearchTermsBySearchKey), take(1))
        )
        .pipe(
            take(1),
            switchMap(([selectedCatalog, selectedSearchTermsByKey]) => {

                const queryParams = route.queryParams;
                const filterParam = queryParams.filter;
                const catalogParam = queryParams.catalog;

                // Proceed as is if:
                // - Filter param is specified, or, if there is no filter param and there are no selected search terms
                // - Catalog param is specified, or, if there is no catalog param and there is no selected catalog
                const filterApplied = (filterParam || !filterParam && selectedSearchTermsByKey.size === 0);
                const catalogApplied = (catalogParam || !catalogParam && !selectedCatalog);
                if ( filterApplied && catalogApplied ) {
                    return of(true);
                }

                // Otherwise, redirect to the full projects URL, including the current state (filter and catalog
                // params).
                const urlTree = this.router.createUrlTree(["projects"], {
                    queryParams: {
                        filter: selectedSearchTermsByKey.size ? this.searchTermUrlService.stringifySearchTerms(selectedSearchTermsByKey) : null,
                        catalog: selectedCatalog ? selectedCatalog : null
                    }
                });
                return of(urlTree);
            })
        );
    }
}
