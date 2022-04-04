/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project analysis portal link.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { ProjectAnalysisPortal } from "./project-analysis-portal.model";
import { ProjectAnalysisPortalName } from "./project-analysis-portal-name.model";

@Component({
    selector: "project-analysis-portal",
    templateUrl: "./project-analysis-portal.component.html",
    styleUrls: ["./project-analysis-portal.component.scss"],
})
export class ProjectAnalysisPortalComponent {
    // Inputs
    @Input() analysisPortal: ProjectAnalysisPortal;

    /**
     * Returns the display name of the analysis portal.
     *
     * @param {string} analysisPortalName
     * @returns {string}
     */
    public getAnalysisPortalDisplay(analysisPortalName: string): string {
        return ProjectAnalysisPortalName[analysisPortalName];
    }

    /**
     * Returns the path to render the analysis portal's logo.
     *
     * @param {string} analysisPortalName
     * @returns {string}
     */
    public getAnalysisPortalLogoPath(analysisPortalName: string): string {
        const logoKey = analysisPortalName.toLowerCase().replace(/_/g, "-");
        return `assets/analysis-portals/logo-${logoKey}.png`;
    }
}
