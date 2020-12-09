/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for positioning a sectioning bar in relation to the specified content.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { SectionBarPosition } from "./section-bar-position.model";

@Component({
    selector: "section-bar",
    templateUrl: "./section-bar.component.html",
    styleUrls: ["./section-bar.component.scss"]
})
export class SectionBarComponent {

    @Input() position: SectionBarPosition;

    /**
     * Returns true if section is positioned left.
     * 
     * @param {SectionBarPosition} positionToCheck
     * @returns {boolean}
     */
    public isPositionLeft(positionToCheck: SectionBarPosition): boolean {
        
        return positionToCheck === SectionBarPosition.LEFT
    }

    /**
     * Returns true if section is positioned top.
     *
     * @param {SectionBarPosition} positionToCheck
     * @returns {boolean}
     */
    public isPositionTop(positionToCheck: SectionBarPosition): boolean {

        return positionToCheck === SectionBarPosition.TOP
    }
}
