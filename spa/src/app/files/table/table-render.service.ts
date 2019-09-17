/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Functionality related to rendering of data tables.
 */

// Core dependencies
import { ElementRef, Injectable } from "@angular/core";

@Injectable()
export class TableRenderService {

    /**
     * Returns true if the table is narrower than its container, and horizontal scroll is therefore not required.
     *
     * @param {ElementRef} containerElementRef
     * @param {ElementRef} tableElementRef
     * @returns {boolean}
     */
    public isHorizontalScrollDisabled(containerElementRef: ElementRef, tableElementRef: ElementRef): boolean {

        // Confirm both container and table have been initialized
        if ( !containerElementRef || !tableElementRef ) {
            return false;
        }

        return tableElementRef.nativeElement.getBoundingClientRect().width <
            containerElementRef.nativeElement.getBoundingClientRect().width;

    }
}
