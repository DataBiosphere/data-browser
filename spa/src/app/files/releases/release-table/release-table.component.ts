/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Release component for displaying release table.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ReleaseOrganView } from "../release-organ-view.model";

@Component({
    selector: "release-table",
    templateUrl: "./release-table.component.html",
    styleUrls: ["./release-table.component.scss"]
})
export class ReleaseTableComponent {

    // Inputs
    @Input() releaseOrganViews: ReleaseOrganView[];

    // Locals
    public columnsToDisplay = ["projectTitle", "developmentalStage", "technology", "releaseFiles", "annotatedExpressionMatrix", "visualize"];

    /**
     * Returns the technology, based off libraryConstructionApproach. Any libraryConstructionApproach ending with
     * "sequencing" shall have this removed to provide a shortened name for the technology column.
     *
     * @param {string} libraryConstructionApproach
     * @returns {string}
     */
    public renderTechnologyShortName(libraryConstructionApproach: string): string {

        let techShortName = libraryConstructionApproach;

        let techShortNames = techShortName.split(",");

        if ( techShortNames.length > 0 ) {

            techShortName = techShortNames.map(shortName => {

                return shortName.replace("sequencing", "").trim();
            }).join(", ");
        }

        return techShortName;
    }
}
