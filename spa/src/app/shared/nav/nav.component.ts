/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying nav. 
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { NavItem } from "./nav-item.model";

@Component({
    selector: "nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"]
})
export class NavComponent {

    // Inputs
    @Input() navItems: NavItem[];

    /**
     * Returns the tooltip content.
     *
     * @param {NavItem} navItem
     * @returns {string}
     */
    public getTooltipContent(navItem: NavItem): string {

        if ( navItem && navItem.tooltip ) {

            return navItem.tooltip;
        }
        return "";
    }

    /**
     * Returns true if router link is specified.
     *
     * @param {string[]} routerLink
     * @returns {boolean}
     */
    public isRouterLink(routerLink: string[]): boolean {

        return !!routerLink
    }

    /**
     * Returns false if the nav item is disabled and tooltip content exists.
     *
     * @param {NavItem} navItem
     * @returns {boolean}
     */
    public isTooltipDisabled(navItem: NavItem): boolean {

        return !(navItem.disabled && !!navItem.tooltip);
    }
}
