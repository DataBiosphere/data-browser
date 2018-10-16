/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

// App dependencies
import { FileFacet } from "./file-facet.model";
import { FilesService } from "./files.service";
import { MatrixDAO } from "./matrix.dao";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixStatus } from "./matrix-status.model";

@Injectable()
export class MatrixService {

    /**
     * @param {FilesService} filesService
     * @param {MatrixDAO} matrixDAO
     */
    constructor(private filesService: FilesService, private matrixDAO: MatrixDAO) {
    }

    /**
     * Query matrix request status.
     *
     * @param {string} requestId
     * @returns {MatrixResponse}
     */
    public getMatrixStatus(requestId: string): Observable<MatrixResponse> {

        // return this.matrixDAO.getMatrixStatus(requestId);
        const num = Math.floor(Math.random() * Math.floor(2));
        console.log(num);

        return Observable.of({
            eta: "10 seconds",
            key: "123",
            links: ["http://www.google.com"],
            message: "message goes here",
            requestId: "request id",
            status: num === 1 ? MatrixStatus.COMPLETE : MatrixStatus.IN_PROGRESS
        });
    }

    /**
     * Request matrix export.
     *
     * @param {FileFacet[]} selectedFacets
     * @param {MatrixFormat} matrixFormat
     * @returns {MatrixResponse}
     */
    public requestMatrix(selectedFacets: FileFacet[], matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        // Build up the manifest URL
        const manifestUrl = this.filesService.buildManifestUrl(selectedFacets);
        // return this.matrixDAO.requestMatrix(manifestUrl, matrixFormat);

        return Observable.of({
            eta: "10 seconds",
            key: "123",
            links: ["http://www.google.com"],
            message: "message goes here",
            requestId: "request id",
            status: MatrixStatus.IN_PROGRESS
        });
    }

    /**
     * Returns true if matrix request is completed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixRequestCompleted(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.COMPLETE;
    }

    /**
     * Returns true if matrix request is in progress.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixRequestInProgress(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.IN_PROGRESS;
    }
}
