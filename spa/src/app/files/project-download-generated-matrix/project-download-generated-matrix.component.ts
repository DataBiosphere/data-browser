/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project contributor and DCP-generated matrices downloads for v2 environments.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { Project } from "../shared/project.model";

@Component({
    selector: "project-download-generated-matrix",
    templateUrl: "./project-download-generated-matrix.component.html",
    styleUrls: ["./project-download-generated-matrix.component.scss"]
})
export class ProjectDownloadGeneratedMatrixComponent {
    
    @Input() project: Project;

    /**
     * Return the display text depending on whether the project has generated matrices.
     * 
     * TODO update with DB 1315
     * 
     * @param {Project} project
     * @returns {string}
     */
    getDCPGeneratedMatricesText(project): string {
        
        if ( project.matrices.length ) {
            return "Coming soon!";
        }
        
        return "There are no DCP generated matrices for this project.";
    }

    /**
     * Return the display text depending on whether the project has contributor matrices.
     *
     * TODO update with DB 1315
     *
     * @param {Project} project
     * @returns {string}
     */
    getContributorMatricesText(project): string {

        if ( project.contributorMatrices.length ) {
            return "Coming soon!";
        }

        return "There are no contributor generated matrices for this project.";
    }
}
