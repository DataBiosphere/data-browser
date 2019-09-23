/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Module responsible for displaying data policy footer, and the corresponding cookie functionality for permanently
 * hiding the footer.
 */

// Core dependencies
import { Component, OnInit } from "@angular/core";

// App dependencies
import { LocalStorageService } from "../../storage/local-storage.service";

@Component({
    selector: "data-policy-footer",
    templateUrl: "data-policy-footer.component.html",
    styleUrls: ["data-policy-footer.component.scss"]
})
export class DataPolicyFooterComponent implements OnInit {

    private STORAGE_KEY_DATA_POLICY_ACCEPTED = "DATA_POLICY_ACCEPTED";

    // Template variables
    public policyAccepted: boolean;

    /**
     * @param {LocalStorageService} localStorageService
     */
    constructor(private localStorageService: LocalStorageService) {}

    /**
     * Update local storage to indicate privacy has been accepted, and policy footer should not be displayed.
     */
    onPolicyAccepted() {

        this.localStorageService.set(this.STORAGE_KEY_DATA_POLICY_ACCEPTED, true.toString());
        this.policyAccepted = true;
    }

    /**
     * Check local storage to determine if policy footer is visible.
     */
    ngOnInit() {

        const storedPolicyAccepted = this.localStorageService.get(this.STORAGE_KEY_DATA_POLICY_ACCEPTED);
        this.policyAccepted = storedPolicyAccepted && storedPolicyAccepted === "true";
    }
}
