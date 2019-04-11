/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// App dependencies
import { FilesService } from "./files.service";
import { MatrixDAO } from "./matrix.dao";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixStatus } from "./matrix-status.model";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "./file-facet-name.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";
import { FileFormat } from "./file-format.model";

@Injectable()
export class MatrixService {

    /**
     * @param {FilesService} filesService
     * @param {MatrixDAO} matrixDAO
     */
    constructor(private filesService: FilesService, private matrixDAO: MatrixDAO) {
    }

    /**
     * Request the set of possible matrix file formats.
     *
     * @returns {Observable<string[]>}
     */
    public fetchFileFormats(): Observable<string[]> {

        return this.matrixDAO.fetchFileFormats();
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
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} matrixFormat
     * @returns {MatrixResponse}
     */
    public requestMatrix(searchTerms: SearchTerm[], matrixFormat: MatrixFormat): Observable<MatrixResponse> {

        // Build up the manifest URL - add file type "matrix" to selected facets if it isn't already selected
        const manifestUrl = this.buildManifestUrl(searchTerms);

        // Kick off matrix request
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
     * Build up manifest URL to pass as bundle req URL to matrix service. Add file type "matrix" to selected search terms
     * if it isn't already selected.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {string}
     */
    private buildManifestUrl(searchTerms: SearchTerm[]): string {

        // Create copy of selected search terms as we may want to need to add the file type matrix term as selected,
        // without affecting the current set of selected search terms.
        const searchTermsClone = [
            ...searchTerms
        ];

        const matrixFileType = searchTermsClone.find((searchTerm: SearchTerm) => {

            return searchTerm.facetName === FileFacetName.FILE_FORMAT &&
                searchTerm.name === FileFormat.MATRIX;
        });
        if ( !matrixFileType ) {

            searchTermsClone.push(new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX));
        }

        return this.filesService.buildMatrixManifestUrl(searchTermsClone, "tarball");
    }
}
