/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Container for displaying content that is sticky, relative to the bottom of the viewport.
 */

// Core dependencies
import {
    Component,
    ChangeDetectionStrategy
} from "@angular/core";

@Component({
    selector: "sticky-footer",
    templateUrl: "./sticky-footer.component.html",
    styleUrls: ["./sticky-footer.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyFooterComponent {
}
