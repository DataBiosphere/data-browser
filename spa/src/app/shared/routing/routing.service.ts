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

    /**
     * Returns true if the specified path, ignoring query string parameters, is either the active path or a parent
     * of the active path.
     *
     * @param {string[]} commands
     * @returns {boolean}
     */
    public isPathOrParentPathActive(commands: string[]): boolean {

        // If there is only a single segment in the specified commands, use exact matching on path.
        if ( commands.length === 1 ) {
            return this.isPathActive(commands);
        }

        const urlTree = this.router.createUrlTree(commands, {
            queryParamsHandling: "merge"
        });
        return this.router.isActive(urlTree, false);
    }
}

