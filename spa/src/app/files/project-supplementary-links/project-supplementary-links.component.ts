/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying supplementary links for a specific project.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "project-supplementary-links",
    templateUrl: "./project-supplementary-links.component.html",
    styleUrls: ["./project-supplementary-links.component.scss"]
})

export class ProjectSupplementaryLinksComponent {

    // Inputs/Outputs
    @Input() supplementaryLinks: string[];
    @Output() supplementaryLinkClicked = new EventEmitter<string>();

    /**
     * Returns true if project has at least on supplementary link associated with it.
     *
     * @param {string[]} supplementaryLinks
     * @returns {boolean}
     */
    public isAnySupplementaryLinkAssociated(supplementaryLinks: string[]): boolean {

        if ( !supplementaryLinks ) {
            return false;
        }
        
        // Handle [null] case returned from Azul.
        return supplementaryLinks.filter(link => !!link).length > 0;
    }

    /**
     * Returns true if the link is a valid url.
     *
     * @param {string} link
     * @returns {boolean}
     */
    public isValidUrl(link: string): boolean {

        try {
            new URL(link);
            return true;
        }
        catch (_) {
            return false;
        }
    }

    /**
     * Let parent components know supplementary link has been clicked.
     *
     * @param {string} supplementaryLink
     */
    onSupplementaryLinkClicked(supplementaryLink: string) {

        this.supplementaryLinkClicked.emit(supplementaryLink);
    }
}
