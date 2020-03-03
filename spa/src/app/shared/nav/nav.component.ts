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

    @Input() navItems: NavItem[];

    /**
     * Returns true if router link is specified.
     *
     * @param {string[]} routerLink
     * @returns {boolean}
     */
    public isRouterLink(routerLink: string[]): boolean {

        return !!routerLink
    }
}
