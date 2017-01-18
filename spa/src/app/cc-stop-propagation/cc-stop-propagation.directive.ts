// Core dependencies
import { Directive, ElementRef } from "@angular/core";

/**
 * Prevent click event from propagating.
 */

@Directive({
    selector: "[cc-stop-propagation]"
})
export class CCStopPropagationDirective {

    /**
     * Stop propagation of click events on element.
     *
     * @param el {ElementRef}
     */
    constructor(el: ElementRef) {
        el.nativeElement.addEventListener("click", (event: Event) => {
            event.stopPropagation();
        });
    }
}
