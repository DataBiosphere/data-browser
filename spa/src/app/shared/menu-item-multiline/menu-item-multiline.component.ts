/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying multi-line item inside of Material menu.
 */

// Core dependencies
import { Component } from "@angular/core";

@Component({
    selector: "menu-item-multiline",
    template: "<ng-content></ng-content>",
    styleUrls: ["menu-item-multiline.component.scss"]
})

export class MenuItemMultilineComponent {
}
