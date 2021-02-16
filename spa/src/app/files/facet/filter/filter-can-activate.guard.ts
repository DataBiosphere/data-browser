/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Determines if route is complete, in that it contains the current filter state.
 * 
 * This guard typically catches internal links that don't include the current set of selected search terms,
 * causing an additional pageview hit (by first loading the triggered route then writing the current search terms value
 * to the URL). By catching this case here, we can prevent the additional pageview hit.
 * 
 * This guard can also catches redirects on load of the app and adds the default filter, if necessary. This
 * also prevents an additional pageview, if we were to navigate to the default filter at a later point during
 * initialization.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, of } from "rxjs";
import { switchMap, take } from "rxjs/operators";

// App dependencies
import { AppState } from "../../../_ngrx/app.state";
import { DefaultFilterInitAction } from "../../_ngrx/init/default-filter-init.action";
import { selectDefaultFilterInit } from "../../_ngrx/init/init.selectors";
import { selectSelectedSearchTermsBySearchKey } from "../../_ngrx/search/search.selectors";
import { SearchTermUrlService } from "../../search/url/search-term-url.service";
import { FileFacetName } from "../file-facet/file-facet-name.model";
import { SearchFacetTerm } from "../../search/search-facet-term.model";
import { SearchTerm } from "../../search/search-term.model";
import { GenusSpecies } from "../../shared/genus-species.model";

@Injectable()
export class FilterCanActivateGuard implements CanActivate {

    /**
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    constructor(private searchTermUrlService: SearchTermUrlService,
                private router: Router,
                private store: Store<AppState>) {}

    /**
     * Returns true if path contains the current state of the app (eg the current set of selected search terms).
     * Otherwise it returns a URL tree containing the full state.
     *
     * @param {ActivatedRouteSnapshot} activatedRouteSnapshot
     * @param {RouterStateSnapshot} routerStateSnapshot
     * @returns {Observable<boolean | UrlTree>}
     */
    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
                routerStateSnapshot: RouterStateSnapshot): Observable<boolean | UrlTree> {
        
        return this.getCanActivate(activatedRouteSnapshot, routerStateSnapshot);
    }

    /**
     * Returns true if path contains the current state of the app (eg the current set of selected search terms).
     * Otherwise it returns a URL tree containing the full state.
     *
     * @param {ActivatedRouteSnapshot} activatedRouteSnapshot
     * @param {RouterStateSnapshot} routerStateSnapshot
     * @returns {Observable<boolean | UrlTree>}
     */
    canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot,
                     routerStateSnapshot: RouterStateSnapshot): Observable<boolean | UrlTree> {

        return this.canActivate(activatedRouteSnapshot, routerStateSnapshot);
    }

    /**
     * Build up URL tree, including default filter.
     * 
     * @param {string} url
     * @param {string} filterParam
     * @returns {UrlTree}
     */
    private createDefaultTree(url: string, filterParam: string): UrlTree {
        
        // Create default filter
        const defaultFilter = this.searchTermUrlService.stringifySearchTerms(
            new Map([
                [FileFacetName.GENUS_SPECIES, new Set([new SearchFacetTerm(FileFacetName.GENUS_SPECIES, GenusSpecies.HOMO_SAPIENS)])]
            ])
        );

        // Return url tree container default filter
        const urlTree = this.router.parseUrl(url);
        urlTree.queryParams["filter"] = defaultFilter;
        return urlTree;
    }

    /**
     * Build up URL tree, including filter from current selected search state.
     *
     * @param {string} url
     * @param {Map<string, Set<SearchTerm>>} selectedSearchTermsByKey
     * @returns {UrlTree}
     */
    private createTreeFromState(url: string, selectedSearchTermsByKey: Map<string, Set<SearchTerm>>): UrlTree {
        
        const filterFromState = selectedSearchTermsByKey.size ?
            this.searchTermUrlService.stringifySearchTerms(selectedSearchTermsByKey) :
            null;

        // Return url tree container default filter
        const urlTree = this.router.parseUrl(url);
        urlTree.queryParams["filter"] = filterFromState;
        return urlTree;
    }

    /**
     * @param {ActivatedRouteSnapshot} activatedRouteSnapshot
     * @param {RouterStateSnapshot} routerStateSnapshot
     * @returns {Observable<boolean | UrlTree>}
     */
    private getCanActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
                           routerStateSnapshot: RouterStateSnapshot): Observable<boolean | UrlTree> {

        return combineLatest(
            this.store.pipe(select(selectSelectedSearchTermsBySearchKey), take(1)),
            this.store.pipe(select(selectDefaultFilterInit), take(1)),
        )
            .pipe(
                take(1),
                switchMap(([ selectedSearchTermsByKey, defaultFilterInit]) => {

                    const queryParams = activatedRouteSnapshot.queryParams;
                    const filterParam = queryParams.filter;

                    // If the default filter has not yet been added to the app URL check if it needs to be added and if so,
                    // cancel current navigation and start new navigation with updated query string.
                    if ( !defaultFilterInit ) {

                        // Update store to indicate init has been completed
                        this.store.dispatch(new DefaultFilterInitAction());

                        if ( !filterParam ) {
                            return of(this.createDefaultTree(routerStateSnapshot.url, filterParam));
                        }
                    }

                    // Default filter has previous been applied. Proceed as is if filter param is specified, or if there is
                    // no filter param and there are no selected search terms
                    const filterApplied = (filterParam || !filterParam && selectedSearchTermsByKey.size === 0);
                    if ( filterApplied ) {
                        return of(true);
                    }

                    // Otherwise, there are selected search terms that are not reflected in the query string. Cancel current
                    // navigation and start new navigation to which includes the filter query string parameter built from
                    // the current set of selected search terms.
                    return of(this.createTreeFromState(routerStateSnapshot.url, selectedSearchTermsByKey));
                })
            );
    }
}
