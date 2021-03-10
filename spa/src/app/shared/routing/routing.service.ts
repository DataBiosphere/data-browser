/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Light convenience wrapper around Angular router functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class RoutingService {

    /**
     * @param {Router} router
     */
    constructor(private router: Router) {}

    /**
     * Returns true if the specified path, ignoring query string parameters, is the current path.
     * 
     * @param {string[]} commands
     * @returns {boolean}
     */
    public isPathActive(commands: string[]): boolean {

        const urlTree = this.router.createUrlTree(commands, {
            queryParamsHandling: "merge"
        });
        return this.router.isActive(urlTree, true);
    }
}

