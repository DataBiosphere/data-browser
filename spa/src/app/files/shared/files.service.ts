import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { FilesDAO } from "./files.dao";
import { FileSummary } from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileFacet } from "./file-facet.model";
import { TableParamsModel } from "../table/table-params.model";
import { EntitySearchResults } from "./entity-search-results.model";

@Injectable()
export class FilesService {

    /**
     * @param {FilesDAO} fileDAO
     */
    constructor(private fileDAO: FilesDAO) {}

    /**
     * Build the manifest download URL - required for both downloading the manifest, as well as requesting a Matrix
     * export.
     *
     * @param {FileFacet[]} selectedFacets
     * @param {string} format
     * @returns {string}
     */
    public buildManifestUrl(selectedFacets: FileFacet[], format?: string): string {

        return this.fileDAO.buildManifestUrl(selectedFacets, format);
    }

    /**
     * Download File Manifest
     *
     * @param selectedFacets
     * @returns {any}
     */
    public downloadFileManifest(selectedFacets: FileFacet[]): Observable<any> {

        return this.fileDAO.downloadFileManifest(selectedFacets);
    }

    /**
     * Fetch data to populate rows in table, depending on the current selected tab (eg projects, specimens, files), as
     * well as facet terms and their corresponding counts.
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {TableParamsModel} tableParams
     * @param {string} selectedEntity
     * @returns {Observable<EntitySearchResults>}
     */
    public fetchEntitySearchResults(
        selectedFacetsByName: Map<string, FileFacet>,
        tableParams: TableParamsModel,
        selectedEntity: string): Observable<EntitySearchResults> {

        return this.fileDAO.fetchEntitySearchResults(selectedFacetsByName, tableParams, selectedEntity);
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
     * Fetch file summary, optionally passing in the current set of selected facets.
     *
     * @param {FileFacet[]} selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(selectedFacets: FileFacet[] = []): Observable<FileSummary> {

        return this.fileDAO.fetchFileSummary(selectedFacets);
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
     * Fetch the complete set of file facets for the files tab.
     *
     * @returns {Observable<FileFacet[]>}
     */
    public fetchUnfacetedFileFileFacets(): Observable<FileFacet[]> {

        return this.fileDAO.fetchUnfacetedFileFileFacets();
    }
}
