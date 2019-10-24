/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying the matrix URL request form.
 */

// Core dependencies
import { Component, EventEmitter, Input, Output } from "@angular/core";

// App dependencies
import { MatrixFormat } from "../../shared/matrix-format.model";

@Component({
    selector: "matrix-url-request-form",
    templateUrl: "./matrix-url-request-form.component.html",
    styleUrls: ["./matrix-url-request-form.component.scss"]
})
export class MatrixUrlRequestFormComponent {

    // Template variables
    public fileFormat = MatrixFormat.loom;

    // Input/output
    @Input() fileFormats: string[];
    @Input() matrixPartialQueryMatch: boolean;
    @Input() matrixPartialQueryMatchCompleted: boolean;
    @Output() matrixUrlRequested = new EventEmitter<string>();

    /**
     * Let parent components know matrix URL has been requested, with the selected format.
     *
     * @param {MatrixFormat} fileFormat
     */
    public onMatrixUrlRequested(fileFormat: MatrixFormat) {
        this.matrixUrlRequested.emit(fileFormat);
    }
}
