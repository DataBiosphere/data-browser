/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying bulk download species selection form.
 */

// Core dependencies
import { Component } from "@angular/core";
import { Router } from "@angular/router";

// App dependencies
import EntitySpec from "../../shared/entity-spec";

@Component({
    selector: "export-to-terra-species-form",
    templateUrl: "./export-to-terra-species-form.component.html",
    styleUrls: ["./export-to-terra-species-form.component.scss"],
})
export class ExportToTerraSpeciesFormComponent {
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
        this.router.navigate(["/export", "export-to-terra"], {
            queryParamsHandling: "preserve",
        });
    }
}
