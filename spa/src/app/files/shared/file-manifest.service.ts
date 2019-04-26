/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file manifest-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// App dependencies
import { Dictionary } from "../../dictionary";
import { FileFacet } from "./file-facet.model";
import { FileFacetName } from "./file-facet-name.model";
import { FileFormat } from "./file-format.model";
import { FileManifestDAO } from "./file-manifest.dao";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileSummary } from "../file-summary/file-summary";
import { FilesService } from "./files.service";
import { ManifestResponse } from "./manifest-response.model";
import { SearchTerm } from "../search/search-term.model";
import { SearchFileFacetTerm } from "../search/search-file-facet-term.model";

@Injectable()
export class FileManifestService {

    /**
     * @param {FilesService} filesService
     * @param {FileManifestDAO} fileManifestDAO
     */
    constructor(private filesService: FilesService, private fileManifestDAO: FileManifestDAO) {
    }

    /**
     * Build up set of search terms for manifest-related requests. If not file format is currently selected in the set
     * of search terms, add all file types. Always remove file type of "matrix".
     * 
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormat
     * @returns {SearchTerm[]}
     */
    public buildManifestSearchTerms(searchTerms: SearchTerm[], fileFormat: FileFacet): SearchTerm[] {

        // If there are currently no selected file format, add all file formats.
        const searchTermsWithFileFormats = this.isAnyFileFormatSelected(searchTerms) ?
            searchTerms :
            this.addAllFileFormatsToSearchTerms(searchTerms, fileFormat);

        // Remove matrix file format
        return this.removeMatrixFileFormat(searchTermsWithFileFormats);
    }

    /**
     * Download file manifest. Removes "matrix" search term, if selected.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormats
     * @returns {Observable<ManifestResponse>}
     */
    public downloadFileManifest(searchTerms: SearchTerm[], fileFormats: FileFacet): Observable<ManifestResponse> {

        const manifestSearchTerms = this.buildManifestSearchTerms(searchTerms, fileFormats);
        return this.fileManifestDAO.downloadFileManifest(manifestSearchTerms);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<Dictionary<FileManifestSummary>>}
     */
    public fetchFileManifestSummary(searchTerms: SearchTerm[]): Observable<Dictionary<FileManifestSummary>> {

        return this.fileManifestDAO.fetchFileManifestSummary(searchTerms);
    }

    /**
     * Fetch file summary for displaying the manifest modal, passing in the current set of selected facets except any
     * selected file types.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<FileSummary>}
     */
    public fetchFileManifestFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        const searchTermsExceptFileTypes = searchTerms.filter((searchTerm) => {
            return searchTerm.getSearchKey() !== FileFacetName.FILE_FORMAT;
        });
        return this.filesService.fetchFileSummary(searchTermsExceptFileTypes);
    }

    /**
     * Add all file formats to the set of search terms. When no file formats are currently selected in the set of 
     * search terms, we must convert this to all file formats.
     * 
     * @param {SearchTerm[]} searchTerms
     * @param {FileFacet} fileFormat
     * @returns {SearchTerm[]}
     */
    private addAllFileFormatsToSearchTerms(searchTerms: SearchTerm[], fileFormat: FileFacet): SearchTerm[] {

        const searchTermsClone = [...searchTerms];
        fileFormat.terms.forEach((term) =>
            searchTermsClone.push(new SearchFileFacetTerm(fileFormat.name, term.name)));
        return searchTermsClone;
    }

    /**
     * Returns true if there if any file format is in the current set of selected search terms, excluding "matrix", as
     * this is not a valid file format when requesting a manifest.
     * 
     * @param {SearchTerm[]} searchTerms
     * @returns {boolean}
     */
    private isAnyFileFormatSelected(searchTerms: SearchTerm[]): boolean {

        return searchTerms.some((searchTerm) =>
            searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT &&
            searchTerm.getSearchValue() !== FileFormat.MATRIX);
    }

    /**
     * Remove matrix file format from the set of file formats, if specified.
     * 
     * @param {SearchTerm[]} searchTerms
     * @returns {SearchTerm[]}
     */
    private removeMatrixFileFormat(searchTerms: SearchTerm[]): SearchTerm[] {

        return searchTerms.reduce((accum, searchTerm) => {

            if ( !(searchTerm.getSearchKey() === FileFacetName.FILE_FORMAT &&
                searchTerm.getSearchValue() === FileFormat.MATRIX) ) {
                accum.push(searchTerm);
            }
            return accum;
        }, []);
    }
}
