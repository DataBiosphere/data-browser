/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Guard responsible for redirecting outdated project UUIDs to the corresponding newer version.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs/index";


@Injectable()
export class CanActivateProject implements CanActivate {

    private PROJECT_IDS_BY_DEPRECATED_ID = new Map<string, string>([
        ["29f53b7e-071b-44b5-998a-0ae70d0229a4", "091cf39b-01bc-42e5-9437-f419a66c8a45"] // https://app.zenhub.com/workspaces/orange-5d680d7e3eeb5f1bbdf5668f/issues/humancellatlas/data-browser/865
    ]);

    /**
     * @param {Router} router
     */
    constructor(private router: Router) {
    }

    /**
     * If user is attempting to view a deprecated project UUID, redirect to the corresponding updated project ID for the
     * project.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const projectId = route.params.id;
        if ( this.PROJECT_IDS_BY_DEPRECATED_ID.has(projectId) ) {
            this.router.navigate(["/projects", this.PROJECT_IDS_BY_DEPRECATED_ID.get(projectId)]);
            return false;
        }

        return true;
    }
}
