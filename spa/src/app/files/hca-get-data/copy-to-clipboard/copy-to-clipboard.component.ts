/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling get data requested url.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { BehaviorSubject, interval } from "rxjs";
import { take } from "rxjs/internal/operators";

@Component({
    selector: "copy-to-clipboard",
    templateUrl: "./copy-to-clipboard.component.html",
    styleUrls: ["./copy-to-clipboard.component.scss"]
})
export class CopyToClipboardComponent {

    // Template variables
    public copied = new BehaviorSubject(false);

    // Inputs
    @Input() copyToClipboardLink: string;
    @Input() note: string;
    @Input() targetBlank: boolean;

    /**
     * Returns true, when copy to clipboard is successful.
     *
     * @param {boolean} copied
     * @returns {boolean}
     */
    public isCopied(copied: boolean): boolean {

        return copied;
    }

    /**
     * Sets the copied value to true, when copy to clipboard is successful.
     *
     */
    public onCopy() {

        this.copied.next(true);
        this.resetCopied();
    }

    /**
     * Resets the copied value to false, when copy to clipboard is successful, and after a timed delay.
     *
     */
    private resetCopied() {

        interval(2000)
            .pipe(
                take(1)
            )
            .subscribe(() => this.copied.next(false));
    }
}
