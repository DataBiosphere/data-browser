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
import { Term } from "./term.model";

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

        return this.matrixDAO.getMatrixStatus(requestId);
    }

    /**
     * Request matrix export.
     *
     * @param {FileFacet[]} selectedFacets
     * @param {MatrixFormat} matrixFormat
     * @returns {MatrixResponse}
     */
    public requestMatrix(selectedFacets: FileFacet[], matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        // Build up the manifest URL - add file type "matrix" to selected facets if it isn't already selected
        const manifestUrl = this.buildManifestUrl(selectedFacets);

        // Kick off matrix request113
        return this.matrixDAO.requestMatrix(manifestUrl, matrixFormat);
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
     * Returns true if matrix request has failed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isMatrixRequestFailed(response: MatrixResponse): boolean {

        return response.status === MatrixStatus.FAILED;
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

    /**
     * Privates
     */

    /**
     * Build up term, representing the selected file type term "matrix".
     *
     * @returns {Term}
     */
    private buildSelectedMatrixTerm(): Term {

        return new Term("matrix", 0, true, "");
    }

    /**
     * Build up manifest URL to pass as bundle req URL to matrix service. Add file type "matrix" to selected facets if
     * it isn't already selected.
     *
     * @param {FileFacet[]} selectedFacets
     * @returns {string}
     */
    private buildManifestUrl(selectedFacets: FileFacet[]): string {

        // Create copy of selected facets as we may want to need to add the file type matrix term as selected, without
        // affecting the current set of selected facets.
        const selectedFacetsClone = [
            ...selectedFacets
        ];

        // Add matrix file type if it is not already selected
        const fileFormatFacet = selectedFacetsClone.find((selectedFacet: FileFacet) => {

            return selectedFacet.name === "fileFormat";
        });

        // There is at least one file type selected - check if its matrix and if not, add matrix
        if ( !!fileFormatFacet ) {

            const matrixSelected = fileFormatFacet.selectedTerms.some(term => {
                return term.name === "matrix";
            });
            if ( !matrixSelected ) {

                fileFormatFacet.selectedTerms.push(this.buildSelectedMatrixTerm());
            }
        }
        // There is no file type selected - add matrix
        else {

            const fileFacet =
                new FileFacet("fileFormat", 0, [this.buildSelectedMatrixTerm()], 0);
            selectedFacetsClone.push(fileFacet);
        }

        return this.filesService.buildManifestUrl(selectedFacetsClone, "tarball");
    }
}
