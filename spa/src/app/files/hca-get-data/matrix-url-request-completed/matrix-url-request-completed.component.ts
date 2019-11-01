/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying instructions for downloading the Matrix URL.
 */

// Core dependencies
import { Component, Input } from "@angular/core";

// App dependencies
import { MatrixService } from "../../shared/matrix.service";
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";

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
     * @param {MatrixUrlRequest} request
     * @returns {string}
     */
    public getMatrixDownloadFileName(request: MatrixUrlRequest): string {

        const tokens = request.matrixUrl.split("/");
        return tokens[tokens.length - 1];
    }

    /**
     * Return the link to download the matrix.
     *
     * @param {MatrixUrlRequest} request
     * @returns {string}
     */
    public getMatrixLink(request: MatrixUrlRequest): string {

        return request.matrixUrl;
    }

    /**
     * Returns true if data has been generated for this Matrix request. That is, there is a corresponding Matrix URL
     * for this request.
     * 
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isDataGeneratedForRequest(request: MatrixUrlRequest): boolean {

        return !!request.matrixUrl;
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
     * Returns true if matrix has been requested and request is failed.
     *
     * @param {MatrixUrlRequest} request
     * @returns {boolean}
     */
    public isMatrixUrlRequestFailed(request: MatrixUrlRequest): boolean {

        return this.matrixService.isMatrixUrlRequestFailed(request);
    }
}
