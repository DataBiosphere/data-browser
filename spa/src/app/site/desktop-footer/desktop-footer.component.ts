/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Footer displaying no downloads available for non-desktop devices.
 */

// Core dependencies
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "desktop-footer",
    templateUrl: "./desktop-footer.component.html",
    styleUrls: ["./desktop-footer.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopFooterComponent {}
