/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying set of project matrix analysis portal links.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ProjectMatrixAnalysisPortal } from "../project-matrix/project-matrix-analysis-portal.model";

@Component({
    selector: "project-matrix-analysis-portals",
    templateUrl: "./project-matrix-analysis-portals.component.html",
    styleUrls: ["./project-matrix-analysis-portals.component.scss"]
})
export class ProjectMatrixAnalysisPortalsComponent {
    
    // Inputs
    @Input() analysisPortals: ProjectMatrixAnalysisPortal[];

    /**
     * Returns true if there are not analysis portals.
     * 
     * @returns {boolean}
     */
    public isEmpty(analysisPortals: ProjectMatrixAnalysisPortal[]): boolean {

        return !analysisPortals || !analysisPortals.length;
    }
}
