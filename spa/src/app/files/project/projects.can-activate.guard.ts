/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Determines if route to projects is complete, in that it contains the current state.
 * 
 * This guard typically catches internal links to "/projects" that don't include the current set of selected search terms,
 * causing an additional pageview hit (by first loading "/projects" then writing the current search terms to the URL).
 * 
 * By catching this case here, we can redirect to the full URL (/projects?filter=x) rather than specifying the full
 * URL in every component that links to "/projects", to prevent the additional pageview hit.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../_ngrx/app.state";
import { selectSelectedSearchTermsBySearchKey } from "../_ngrx/search/search.selectors";
import { SearchTerm } from "../search/search-term.model";
import { SearchTermUrlService } from "../search/url/search-term-url.service";
import { UtilService } from "../../shared/util/util.service";

@Injectable()
export class ProjectsCanActivateGuard implements CanActivate {

    /**
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Store<AppState>} store
     * @param {UtilService} utilService
     * @param {Router} router
     */
    constructor(private searchTermUrlService: SearchTermUrlService,
                private store: Store<AppState>,
                private utilService: UtilService,
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

        return this.store.pipe(
            select(selectSelectedSearchTermsBySearchKey),
            take(1),
            switchMap((selectedSearchTermsByKey: Map<string, Set<SearchTerm>>) => {

                const noFilter = this.utilService.isEmpty(route.queryParams);
                
                // If there is a filter, or, if there is no filter and there are no selected search terms, proceed as is
                if ( !noFilter ||
                    (noFilter && selectedSearchTermsByKey.size === 0) ) {
                    return of(true);
                }

                // Otherwise, redirect to the full projects URL, including the current state (filter param)
                const urlTree = this.router.createUrlTree(["projects"], {
                    queryParams: {
                        filter: this.searchTermUrlService.stringifySearchTerms(selectedSearchTermsByKey)
                    }
                });
                return of(urlTree);
            })
        );
    }
}
