/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying set of project matrix analysis portal links.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ProjectAnalysisPortal } from "../project-analysis-portal/project-analysis-portal.model";

@Component({
    selector: "project-analysis-portals",
    templateUrl: "./project-analysis-portals.component.html",
    styleUrls: ["./project-analysis-portals.component.scss"],
})
export class ProjectAnalysisPortalsComponent {
    // Inputs
    @Input() analysisPortals: ProjectAnalysisPortal[];

    /**
     * Returns true if there are not analysis portals.
     *
     * @returns {boolean}
     */
    public isEmpty(analysisPortals: ProjectAnalysisPortal[]): boolean {
        return !analysisPortals || !analysisPortals.length;
    }
}
