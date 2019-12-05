/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying key value pair.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { KeyValuePair } from "./key-value-pair.model";

@Component({
    selector: "key-value-pair",
    templateUrl: "./key-value-pair.component.html",
    styleUrls: ["./key-value-pair.component.scss"]
})
export class KeyValuePairComponent {

    // Inputs
    @Input() keyValuePairs: KeyValuePair[];
    @Input() title: string;

    public constructor() {}
}
