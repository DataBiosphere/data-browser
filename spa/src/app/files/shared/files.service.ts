import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { FilesDAO } from "./files.dao";
import { FileSummary } from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileFacet } from "./file-facet.model";
import { TableModel } from "../table/table.model";
import { TableParamsModel } from "../table/table-params.model";
import { ICGCQuery } from "./icgc-query";
import { URLSearchParams } from "@angular/http";

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
     * Fetch File Facets
     *
     * @param selectedFacetsByName
     * @returns {Observable<FileFacet[]>}
     */
    public fetchOrderedFileFacets(selectedFacetsByName: Map<string, FileFacet>, tab: string): Observable<FileFacet[]> {

        return this.fileDAO.fetchOrderedFileFacets(selectedFacetsByName, tab);
    }

    /**
     * Fetch the table data
     *
     * @param {Map<string, FileFacet>} selectedFacetsByName
     * @param {TableParamsModel} tableParams
     * @returns {Observable<TableModel>}
     */
    public fetchEntityTableData(selectedFacetsByName: Map<string, FileFacet>, tableParams: TableParamsModel, selectedEntity: string): Observable<TableModel> {

        return this.fileDAO.fetchEntityTableData(selectedFacetsByName, tableParams, selectedEntity);
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
     * Fetch File Manifest Summary Observable
     *
     * @param selectedFacets
     * @returns {Observable<Action>}
     */
    public fetchFileManifestSummary(selectedFacets: FileFacet[]): Observable<Dictionary<FileManifestSummary>> {

        return this.fileDAO
            .fetchFileManifestSummary(selectedFacets);
    }

}
