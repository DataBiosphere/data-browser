/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying form-wide or field-specific errors on the Zendesk support request form.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

@Component({
    selector: "support-request-error",
    templateUrl: "support-request-error.component.html",
    styleUrls: ["support-request-error.component.scss"],
})
export class SupportRequestErrorComponent {
    // Inputs
    @Input() field: boolean;
}
