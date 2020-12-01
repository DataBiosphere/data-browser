/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Determines if route to projects is complete, in that it contains the current state.
 * 
 * This guard typically catches internal links to "/projects" that don't include the current set of selected search terms,
 * causing an additional pageview hit (by first loading "/projects" then writing the current search terms or catalog
 * value to the URL). By catching this case here, we can redirect to the full URL (/projects?filter=x&catalog=y) rather
 * than specifying the full URL in every component that links to "/projects", to prevent the additional pageview hit.
 * 
 * This guard can also catch redirects to "/projects" on load of the app and add the default filter, if necessary. This
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
import { ConfigService } from "../../config/config.service";
import { AppState } from "../../_ngrx/app.state";
import { selectCatalog } from "../_ngrx/catalog/catalog.selectors";
import { DefaultFilterInitAction } from "../_ngrx/init/default-filter-init.action";
import { selectDefaultFilterInit } from "../_ngrx/init/init.selectors";
import { selectSelectedSearchTermsBySearchKey } from "../_ngrx/search/search.selectors";
import { SearchTermUrlService } from "../search/url/search-term-url.service";
import { FileFacetName } from "../facet/file-facet/file-facet-name.model";
import { SearchFacetTerm } from "../search/search-facet-term.model";
import { GenusSpecies } from "../shared/genus-species.model";
import { Catalog } from "../catalog/catalog.model";

@Injectable()
export class ProjectsCanActivateGuard implements CanActivate {

    /**
     * @param {ConfigService} configService
     * @param {SearchTermUrlService} searchTermUrlService
     * @param {Router} router
     * @param {Store<AppState>} store
     */
    constructor(private configService: ConfigService,
                private searchTermUrlService: SearchTermUrlService,
                private router: Router,
                private store: Store<AppState>) {}

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
        
        const v2 = this.configService.isV2();
        
        return combineLatest(
            this.store.pipe(select(selectCatalog), take(1)),
            this.store.pipe(select(selectSelectedSearchTermsBySearchKey), take(1)),
            this.store.pipe(select(selectDefaultFilterInit), take(1)),
        )
        .pipe(
            take(1),
            switchMap(([selectedCatalog, selectedSearchTermsByKey, defaultFilterInit]) => {

                const queryParams = route.queryParams;
                const catalogParam = queryParams.catalog;
                const filterParam = queryParams.filter;

                // If the default filter, or default catalog for v2 environments, has not yet been added to the app URL,
                // add them and redirect.
                if ( !defaultFilterInit ) {
                    
                    this.store.dispatch(new DefaultFilterInitAction());
                    if ( !filterParam || (v2 && !catalogParam) ) {
                        
                        return of(this.createDefaultTree(v2, filterParam, catalogParam));
                    }
                }

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
                return of(this.createTreeFromState(selectedSearchTermsByKey, selectedCatalog));
            })
        );
    }

    /**
     * Build up URL tree to projects, including default filter and if v2, default catalog.
     * 
     * @param {boolean} v2
     * @param {string} filterParam
     * @param {string} catalogParam
     * @returns {UrlTree}
     */
    private createDefaultTree(v2: boolean, filterParam: string, catalogParam: string): UrlTree {

        // Grab the catalog param if specified in the query string. 
        let catalog;
        if ( !!catalogParam ) {
            catalog = catalogParam;
        }
        // Otherwise default catalog param to DCP1 for v2 environments if it's not currently specified in the query
        // string. For v1 environments, set to null to prevent addition to query string params.
        else {
            catalog = v2 ? Catalog.DCP1 : null;
        }

        // Always default filter to homo sapiens if filter is not currently specified in query string
        let filter;
        if ( !!filterParam ) {
            filter = filterParam;
        }
        else {
            filter = this.searchTermUrlService.stringifySearchTerms(
                new Map([
                    [FileFacetName.GENUS_SPECIES, new Set([new SearchFacetTerm(FileFacetName.GENUS_SPECIES, GenusSpecies.HOMO_SAPIENS)])]
                ])
            );
        }

        return this.router.createUrlTree(["projects"], {
            queryParams: {
                filter,
                catalog
            }
        });
    }

    /**
     * Build up URL tree from current state.
     *
     * @param {Map<string, Set<SearchTerm>} selectedSearchTermsByKey
     * @param {string} selectedCatalog
     * @returns {UrlTree}
     */
    private createTreeFromState(selectedSearchTermsByKey, selectedCatalog): UrlTree {

        return  this.router.createUrlTree(["projects"], {
            queryParams: {
                filter: selectedSearchTermsByKey.size ? this.searchTermUrlService.stringifySearchTerms(selectedSearchTermsByKey) : null,
                catalog: selectedCatalog ? selectedCatalog : null
            }
        });
    }
}
