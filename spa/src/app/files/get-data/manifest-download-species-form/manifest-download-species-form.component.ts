/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying manifest download species selection form.
 */

// Core dependencies
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// App dependencies
import EntitySpec from "../../shared/entity-spec";

@Component({
    selector: "manifest-download-species-form",
    templateUrl: "./manifest-download-species-form.component.html",
    styleUrls: ["./manifest-download-species-form.component.scss"],
})
export class ManifestDownloadSpeciesFormComponent {
    /**
     * @param {Router} router
     */
    constructor(private router: Router) {}

    /**
     * Return user to export options.
     */
    public getBackButtonTab(): EntitySpec[] {
        const key = "Export Data";
        return [
            {
                key,
                displayName: key,
            },
        ];
    }

    /**
     * Handle click on back button.
     */
    public onTabSelected(): void {
        this.router.navigate(["/export"], {
            queryParamsHandling: "preserve",
        });
    }

    /**
     * Species has been selected, navigate to export.
     */
    public onSpeciesSelected(): void {
        this.router.navigate(["/export", "download-manifest"], {
            queryParamsHandling: "preserve",
        });
    }
}
