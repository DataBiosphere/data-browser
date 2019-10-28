/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying instructions for downloading the Matrix URL.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";
import { MatrixService } from "../../shared/matrix.service";

@Component({
    selector: "matrix-url-request-completed",
    templateUrl: "./matrix-url-request-completed.component.html",
    styleUrls: ["./matrix-url-request-completed.component.scss"]
})
export class MatrixUrlRequestCompletedComponent {

    // Input/output
    @Input() matrixUrlRequest: MatrixUrlRequest;

    /**
     * @param {MatrixService} matrixService
     */
    constructor(private matrixService: MatrixService) {}

    /**
     * Return the file name of the download
     *
     * @returns {string}
     */
    public getMatrixDownloadFileName(response: MatrixUrlRequest): string {

        const tokens = response.matrixUrl.split("/");
        return tokens[tokens.length - 1];
    }

    /**
     * Return the link to download the matrix.
     *
     * @returns {string}
     */
    public getMatrixLink(response: MatrixUrlRequest): string {

        return response.matrixUrl;
    }

    /**
     * Returns true if matrix has been requested and request is completed.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestCompleted(request: MatrixUrlRequest): boolean {

        return this.matrixService.isMatrixUrlRequestCompleted(request);
    }

    /**
     * Returns true if matrix has been requested and request is completed.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestFailed(request: MatrixUrlRequest): boolean {

        return this.matrixService.isMatrixUrlRequestFailed(request);
    }
}
