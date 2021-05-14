/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project matrix analysis portal link.
 */

// Core dependencies
import { Component, Inject, Input } from "@angular/core";

// App dependencies
import { ProjectMatrixAnalysisPortal } from "../project-matrix/project-matrix-analysis-portal.model";
import { ProjectMatrixAnalysisPortalName } from "../project-matrix/project-matrix-analysis-portal-name.model";

@Component({
    selector: "project-matrix-analysis-portal",
    templateUrl: "./project-matrix-analysis-portal.component.html",
    styleUrls: ["./project-matrix-analysis-portal.component.scss"]
})
export class ProjectMatrixAnalysisPortalComponent {
    
    // Inputs
    @Input() analysisPortal: ProjectMatrixAnalysisPortal;

    /**
     * @param {Window} window
     */
    constructor(@Inject("Window") private window: Window) {}

    /**
     * Returns the display name of the analysis portal.
     * 
     * @param {string} analysisPortalName
     * @returns {string}
     */
    public getAnalysisPortalDisplay(analysisPortalName: string): string {

        return ProjectMatrixAnalysisPortalName[analysisPortalName];
    }

    /**
     * Returns the path to render the analysis portal's logo.
     * 
     * @param {string} analysisPortalName
     * @returns {string}
     */
    public getAnalysisPortalLogoPath(analysisPortalName: string): string {

        const logoKey = analysisPortalName.toLowerCase();
        return `assets/analysis-portals/logo-${logoKey}.png`;
    }
}
