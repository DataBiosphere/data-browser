/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for listing project downloads and exports on project overview page.
 */

// Core dependencies
import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "project-downloads-and-exports",
    templateUrl: "./project-downloads-and-exports.component.html",
    styleUrls: ["./project-downloads-and-exports.component.scss"],
})
export class ProjectDownloadsAndExportsComponent {
    /**
     * @param {ActivatedRoute} activatedRoute
     * @param {Router} router
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    /**
     * Navigate to project bulk download page.
     */
    public onProjectCurlClicked(): void {
        this.router.navigate(["get-curl-command"], {
            queryParamsHandling: "preserve",
            relativeTo: this.activatedRoute,
        });
    }

    /**
     * Navigate to project analyze in Terra page.
     */
    public onProjectTerraWorkspaceClicked(): void {
        this.router.navigate(["export-to-terra"], {
            queryParamsHandling: "preserve",
            relativeTo: this.activatedRoute,
        });
    }
}
