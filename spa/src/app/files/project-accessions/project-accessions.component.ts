/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying project accessions.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";

@Component({
    selector: "project-accessions",
    templateUrl: "./project-accessions.component.html",
    styleUrls: ["./project-accessions.component.scss"],
})
export class ProjectAccessionsComponent {
    // Inputs/Outputs
    @Input() keyValuePairs: KeyValuePair[];
    @Output() accessionClicked = new EventEmitter<KeyValuePair>();

    /**
     * Let parent components know value has been clicked.
     *
     * @param {KeyValuePair} pair
     */
    public onValueClicked(pair: KeyValuePair) {
        this.accessionClicked.emit(pair);
    }
}
