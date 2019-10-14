/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling get data requested url.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
    selector: "copy-to-clipboard",
    templateUrl: "./copy-to-clipboard.component.html",
    styleUrls: ["./copy-to-clipboard.component.scss"],
    animations: [
        trigger('showHide', [
            state('hideCopied', style({
                opacity: 0
            })),
            state('hideCopy', style({
                opacity: 0
            })),
            state('show', style({
                opacity: 1
            })),
            transition('show => hideCopy', [
                animate('0.3s ease-in')
            ]),
            transition('hideCopied => show', [
                animate('0.3s 0.2s ease-in', null),
            ]),
            transition('show => hideCopied', [
                animate('0.3s 1.5s ease-in')
            ]),
            transition('hideCopy => show', [
                animate('0.3s 1.5s ease-in')
            ])
        ]),
    ]
})
export class CopyToClipboardComponent {

    // Template variables
    copied = false;

    // Inputs
    @Input() copyToClipboardLink: string;
    @Input() note: string;
    @Input() targetBlank: boolean;

    /**
     * Sets the copied value to true, when the copy value is false.
     * Triggers a series of animations.
     */
    onCopied() {

        if ( !this.copied ) {
            this.copied = true;
        }
    }

    /**
     * Sets the copied value back to false, when the animation event "show" is complete.
     * Allows the user interface to respond to any repeated copy to clipboard actions.
     *
     * @param event
     */
    onAnimationEvent(event) {

        if (event.phaseName === "done" && event.toState === "show") {
            this.copied = false;
        }
    }

}
