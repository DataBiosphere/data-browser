/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Service for coordinating file-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { EntitySearchResults } from "./entity-search-results.model";
import { FilesDAO } from "./files.dao";
import { FileFacet } from "./file-facet.model";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileSummary } from "../file-summary/file-summary";
import { FileFacetListState } from "../_ngrx/file-facet-list/file-facet-list.state";
import { ManifestResponse } from "./manifest-response.model";
import { Dictionary } from "../../dictionary";
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
     * @param {FileFacet[]} selectedFacets
     * @param {string} format
     * @returns {string}
     */
    public buildMatrixManifestUrl(selectedFacets: FileFacet[], format?: string): string {

        return this.fileDAO.buildMatrixManifestUrl(selectedFacets, format);
    }

    /**
     * Download file manifest - removes all instances of fileFormat term "matrix" as this format is not downloadable.
     *
     * @param {FileFacetListState} ffls
     * @returns {Observable<ManifestResponse>}
     */
    public downloadFileManifest(ffls: FileFacetListState): Observable<ManifestResponse> {

        let selectedFacets = ffls.selectedFileFacets || [];
        let allFacets = ffls.fileFacets || [];

        // If the facet "fileFacet" is missing i.e. no fileFacet terms have been selected, then add the facet to the selectedFacets
        if ( !selectedFacets.some(facet => facet.name === "fileFormat") ) {

            let fileFacet = allFacets.find(facet => facet.name === "fileFormat");

            // Make a shallow copy of selectedFacets to modify fileFormat's selectedTerms
            const copyOfFacet = {...fileFacet};

            // Filter out matrix
            copyOfFacet.selectedTerms = copyOfFacet.terms.filter(term => term.name !== "matrix");
            selectedFacets.push(copyOfFacet as FileFacet);
        }

        // Remove the term "matrix" from selectedTerms
        selectedFacets = selectedFacets.map(selectedFacet => {

            if ( selectedFacet.name === "fileFormat" ) {

                // Make a shallow copy of selectedFacets to modify fileFormat's selectedTerms
                const copyOfFacet = {...selectedFacet};

                // Filter out matrix
                copyOfFacet.selectedTerms = copyOfFacet.selectedTerms.filter(term => term.name !== "matrix");
                return copyOfFacet as FileFacet;
            }

            return selectedFacet;
        });

        return this.fileDAO.downloadFileManifest(selectedFacets);
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg specimens, files), as
     * well as facet terms and their corresponding counts. See fetchProjectSearchResults for projects tab.
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @param {boolean} filterableByProject
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(selectedFacetsByName: Map<string, FileFacet>,
                                    tableParams: TableParamsModel,
                                    selectedEntity: string,
                                    filterableByProject = true): Observable<EntitySearchResults> {

        return this.fileDAO.fetchEntitySearchResults(
            selectedFacetsByName, tableParams, selectedEntity, filterableByProject);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchFileManifestSummary(selectedFacets: FileFacet[]): Observable<Dictionary<FileManifestSummary>> {

        return this.fileDAO
            .fetchFileManifestSummary(selectedFacets);
    }

    /**
     * Fetch file summary, passing in the current set of selected facets.
     *
     * @param {FileFacet[]} selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(selectedFacets: FileFacet[]): Observable<FileSummary> {

        return this.fileDAO.fetchFileSummary(selectedFacets).pipe(
            map(this.bindFileSummaryResponse)
        );
    }

    /**
     * Fetch file summary for displaying the manifest modal, passing in the current set of selected facets except any
     * selected file types.
     *
     * @param {FileFacet[]} selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchManifestDownloadFileSummary(selectedFacets: FileFacet[]): Observable<FileSummary> {

        const selectedFacetsExceptFileTypes = selectedFacets.filter((fileFacet) => {
            return fileFacet.name !== "fileFormat";
        });
        return this.fetchFileSummary(selectedFacetsExceptFileTypes);
    }

    /**
     * Fetch File Facets
     *
     * @param selectedFacetsByName
     * @returns {Observable<FileFacet[]>}
     */
    public fetchOrderedFileFacets(selectedFacetsByName: Map<string, FileFacet>, tab: string): Observable<FileFacet[]> {

        return this.fileDAO.fetchOrderedFileFacets(selectedFacetsByName, tab);
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
