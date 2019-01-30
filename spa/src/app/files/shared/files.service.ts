import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { EntitySearchResults } from "./entity-search-results.model";
import { FilesDAO } from "./files.dao";
import { FileSummary } from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileFacet } from "./file-facet.model";
import { TableParamsModel } from "../table/table-params.model";
import { ManifestResponse } from "./manifest-response.model";
import { FileFacetListState } from "../_ngrx/file-facet-list/file-facet-list.state";

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
     * Download File Manifest
     * Removes all instances of fileFormat term "matrix".
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

        return this.fileDAO.fetchFileSummary(selectedFacets);
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
}
