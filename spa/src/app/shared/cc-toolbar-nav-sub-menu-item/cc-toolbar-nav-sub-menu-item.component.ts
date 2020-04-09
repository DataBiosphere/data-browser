// Dependencies
import { Component, Input } from "@angular/core";

/**
 * Component for displaying nav sub menu item, used in conjunction with cc-toolbar-nav.
 */

@Component({
    selector: "cc-toolbar-nav-sub-menu-item",
    templateUrl: "cc-toolbar-nav-sub-menu-item.component.html",
    styleUrls: ["cc-toolbar-nav-sub-menu-item.component.scss"],
})

export class CCToolbarNavSubMenuItemComponent {

    // Inputs
    @Input() link: string;
}
