/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Handles "snap" (ie fixed position of element) by listening to wheel event on the host element. Listener must be
 * setup on this component due to its overflow-y spec (and it therefore can listen to the scroll event, and also
 * determine the scroll Y).
 */

// Core dependencies
import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";

@Component({
    selector: "cc-snapper",
    templateUrl: "cc-snapper.component.html",
    styleUrls: ["cc-snapper.component.scss"]
})
export class CCSnapperComponent implements AfterViewInit {

    // Locals
    private elementRef: ElementRef;

    /**
     * @param elementRef {ElementRef}
     */
    constructor(elementRef: ElementRef) {

        this.elementRef = elementRef;
    }

    /**
     * Set up snap of results summary element
     */
    public ngAfterViewInit() {

        let nativeElement = this.elementRef.nativeElement;
        fromEvent(nativeElement, "wheel")
            .subscribe(() => {

                let snapped = nativeElement.classList.contains("snap");
                if (nativeElement.scrollTop > 0 && !snapped) {
                    nativeElement.classList.add("snap");
                }

                if (nativeElement.scrollTop < 3 && snapped) {
                    nativeElement.classList.remove("snap");
                }
            });
    }
}
