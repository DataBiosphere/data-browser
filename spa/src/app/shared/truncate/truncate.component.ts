/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component controlling clipping of text at the element's bounds and adding an ellipsis.
 */

// Core dependencies
import { Component } from "@angular/core";

@Component({
    selector: "truncate",
    template: "<ng-content></ng-content>",
    styleUrls: ["truncate.component.scss"]
})

export class TruncateComponent {
}
