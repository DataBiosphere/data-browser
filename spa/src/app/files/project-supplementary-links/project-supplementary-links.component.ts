/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying supplementary integrations for a specific project.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies

@Component({
    selector: "project-supplementary-links",
    templateUrl: "./project-supplementary-links.component.html",
    styleUrls: ["./project-supplementary-links.component.scss"]
})

export class ProjectSupplementaryLinksComponent {

    // Inputs
    @Input() supplementaryLinks: string[];

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
}
