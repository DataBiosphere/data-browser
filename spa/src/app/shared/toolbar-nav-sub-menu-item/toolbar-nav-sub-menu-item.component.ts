/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying nav sub menu item, used in conjunction with toolbar-nav.
 */

// Dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "toolbar-nav-sub-menu-item",
    templateUrl: "toolbar-nav-sub-menu-item.component.html",
    styleUrls: ["toolbar-nav-sub-menu-item.component.scss"],
})

export class ToolbarNavSubMenuItemComponent {

    // Inputs
    @Input() link: string;
}
