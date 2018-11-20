/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component displaying banner when user is on mobile or tablet.
 */

// Core dependencies
import {
    Component,
    Input,
    ChangeDetectionStrategy
} from "@angular/core";

@Component({
    selector: "hca-desktop-banner",
    templateUrl: "./hca-desktop-banner.component.html",
    styleUrls: ["./hca-desktop-banner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HCADesktopBannerComponent {

    constructor() {
    }
}
