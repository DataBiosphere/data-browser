/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service for coordinating file-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { Dictionary } from "../../dictionary";
import { EntitySearchResults } from "./entity-search-results.model";
import { FileFacetName } from "./file-facet-name.model";
import { FilesDAO } from "./files.dao";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileSummary } from "../file-summary/file-summary";
import { ManifestResponse } from "./manifest-response.model";
import { SearchTerm } from "../search/search-term.model";
import { TableParamsModel } from "../table/table-params.model";

@Injectable()
export class FilesService {

    /**
     * @param {FilesDAO} fileDAO
     */
    constructor(private fileDAO: FilesDAO) {
    }

    /**
     * Build the manifest download URL - required for both downloading the manifest, as well as requesting a Matrix
     * export.
     *
     * @param {SearchTerm[]} searchTerms
     * @param {string} format
     * @returns {string}
     */
    public buildMatrixManifestUrl(searchTerms: SearchTerm[], format?: string): string {

        return this.fileDAO.buildMatrixManifestUrl(searchTerms, format);
    }

    /**
     * Download file manifest. Removes "matrix" search term, if selected.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<ManifestResponse>}
     */
    public downloadFileManifest(searchTerms: SearchTerm[]): Observable<ManifestResponse> {

        const filteredSearchTerms = searchTerms.reduce((accum, searchTerm) => {

            if ( searchTerm.facetName !== FileFacetName.FILE_FORMAT && searchTerm.name !== "matrix" ) {
                accum.push(searchTerm);
            }
            return accum;
        }, []);

        return this.fileDAO.downloadFileManifest(filteredSearchTerms);
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg specimens, files), as
     * well as facet terms and their corresponding counts. See fetchProjectSearchResults for projects tab.
     *
     * @param {Map<string, Set<SearchTerm>>} searchTermsByFacetName
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(searchTermsByFacetName: Map<string, Set<SearchTerm>>,
                                    tableParams: TableParamsModel,
                                    selectedEntity: string,
                                    filterableByProject = true): Observable<EntitySearchResults> {

        return this.fileDAO.fetchEntitySearchResults(
            searchTermsByFacetName, tableParams, selectedEntity, filterableByProject);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileManifestSummary(searchTerms: SearchTerm[]): Observable<Dictionary<FileManifestSummary>> {

        return this.fileDAO.fetchFileManifestSummary(searchTerms);
    }

    /**
     * Fetch file summary, passing in the current set of search terms.
     *
     * {SearchTerm[]} searchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        return this.fileDAO.fetchFileSummary(searchTerms).pipe(
            map(this.bindFileSummaryResponse)
        );
    }

    /**
     * Fetch file summary for displaying the manifest modal, passing in the current set of selected facets except any
     * selected file types.
     *
     * @param {SearchTerm[]} searchTerms
     * @returns {Observable<Action>}
     */
    public fetchFileManifestFileSummary(searchTerms: SearchTerm[]): Observable<FileSummary> {

        const searchTermsExceptFileTypes = searchTerms.filter((fileFacet) => {
            return fileFacet.facetName !== FileFacetName.FILE_FORMAT;
        });
        return this.fetchFileSummary(searchTermsExceptFileTypes);
    }

    /**
     * Create a new file summary object (to trigger change detecting) from the file summary response, and fix erroneous
     * total file size count if applicable.
     *
     * @param {FileSummary} fileSummary
     * @returns {FileSummary}
     */
    private bindFileSummaryResponse(fileSummary: FileSummary): FileSummary {

        const totalFileSize = (typeof fileSummary.totalFileSize === "string") ? 0 : fileSummary.totalFileSize;
        return Object.assign({}, fileSummary, {totalFileSize});
    }
}
