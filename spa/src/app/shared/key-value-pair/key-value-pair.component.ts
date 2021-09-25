/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component for displaying key value pair.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { KeyValuePair } from "./key-value-pair.model";

@Component({
    selector: "key-value-pair",
    templateUrl: "./key-value-pair.component.html"
})
export class KeyValuePairComponent {

    // Inputs/Outputs
    @Input() keyValuePair: KeyValuePair;
    @Output() valueClicked = new EventEmitter<KeyValuePair>();

    /**
     * Returns true if value is an array.
     *
     * @param value
     * @returns {boolean}
     */
    public isMultiValue(value: string | string[]): boolean {

        return Array.isArray(value);
    }

    /**
     * Let parent components know value has been clicked.
     * 
     * @param {KeyValuePair} pair
     */
    public onValueClicked(pair: KeyValuePair) {

        this.valueClicked.emit(pair);
    }
}
