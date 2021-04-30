/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying content in a styled warning box.
 */

// Core dependencies
import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: "warning",
    templateUrl: "./warning.component.html",
    styleUrls: ["./warning.component.scss"]
})
export class WarningComponent {

    // Color of warning box, defaults to blue
    @HostBinding("class") @Input() color: "orange";
}
