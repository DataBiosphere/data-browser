/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling get data requested url.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "copy-to-clipboard",
    templateUrl: "./copy-to-clipboard.component.html",
    styleUrls: ["./copy-to-clipboard.component.scss"]
})
export class CopyToClipboardComponent {

    // Inputs
    @Input() copyToClipboardLink: string;
    @Input() note: string;
    @Input() targetBlank: boolean;
}
