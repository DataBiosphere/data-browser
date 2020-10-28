/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component displaying form-wide or field-specific errors on the Zendesk support request form.
 */

// Core dependencies
import { Component, Input, OnInit } from "@angular/core";

// App dependencies
import { DropError } from "../../dropzone/drop-error.model";
import { DropErrorCode } from "../../dropzone/drop-error-code.model";

@Component({
    selector: "attachment-error",
    templateUrl: "attachment-error.component.html",
    styleUrls: ["attachment-error.component.scss"]
})
export class AttachmentErrorComponent implements OnInit {
    
    // Template variables
    public errorMessage = "";

    // Inputs
    @Input() rejection: DropError;

    /**
     * Determine error message from input rejections.
     */
    ngOnInit() {

        const fileSizeError = this.rejection?.code === DropErrorCode.FILE_TOO_LARGE;
        this.errorMessage = !!fileSizeError ? "File must be less than 20 MB." : "Unable to upload file.";
    }
}
