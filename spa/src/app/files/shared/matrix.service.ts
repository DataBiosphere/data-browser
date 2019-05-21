/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating Matrix-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// App dependencies
import { MatrixDAO } from "./matrix.dao";
import { MatrixFormat } from "./matrix-format.model";
import { MatrixResponse } from "./matrix-response.model";
import { MatrixStatus } from "./matrix-status.model";
import { SearchTerm } from "../search/search-term.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";

@Injectable()
export class MatrixService {

    /**
     * @param {MatrixDAO} matrixDAO
     */
    constructor(private matrixDAO: MatrixDAO) {
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

        // Add matrix file format, if not yet specified
        const matrixSearchTerms = this.isMatrixFileFormatSelected(searchTerms) ?
            searchTerms :
            this.addMatrixFileFormatToSearchTerms(searchTerms);

        // Kick off matrix request
        return this.matrixDAO.requestMatrix(matrixSearchTerms, matrixFormat);
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
     * Add matrix file format to the set of search terms.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {SearchTerm[]}
     */
    private addMatrixFileFormatToSearchTerms(searchTerms: SearchTerm[]): SearchTerm[] {

        return [
            ...searchTerms,
            new SearchFileFacetTerm(FileFacetName.FILE_FORMAT, FileFormat.MATRIX)
        ];
    }

    /**
     * Returns true if there matrix file format is in the current set of selected search terms.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {boolean}
     */
    private isMatrixFileFormatSelected(searchTerms: SearchTerm[]): boolean {

        return searchTerms.some((searchTerm) =>
            searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT &&
            searchTerm.getSearchValue() === FileFormat.MATRIX);
    }
}
