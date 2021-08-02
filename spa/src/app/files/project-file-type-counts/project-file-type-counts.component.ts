/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project file type counts.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";

@Component({
    selector: "project-file-type-counts",
    templateUrl: "./project-file-type-counts.component.html",
    styleUrls: ["./project-file-type-counts.component.scss"]
})
export class ProjectFileTypeCountsComponent {

    // Inputs
    @Input() keyValuePairs: KeyValuePair[];
}
