import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/catch";

import { FilesDAO, FacetSortOrder } from "./files.dao";
import { FileSummary } from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { FileFacet } from "./file-facet.model";
import { ApiSource, ConfigService } from "../../shared/config.service";

@Injectable()
export class FilesService {

    constructor(private fileDAO: FilesDAO, private configService: ConfigService) {}

    /**
     * Download File Manifest
     *
     * @param query
     * @returns {any}
     */
    public downloadFileManifest(selectedFacets: FileFacet[]): Observable<any> {

        return this.fileDAO.downloadFileManifest(selectedFacets);
    }

    /**
     * Fet FileFacets Observable
     *
     * @param query
     * @returns {Observable<Action>}
     */
    public fetchFileFacets(selectedFacetsByName: Map<string, FileFacet>): Observable<FileFacet[]> {

        return this.fileDAO
            .fetchFileFacets(selectedFacetsByName);
    }


    /**
     * Fetch File Facets Init
     *
     * @param selectedFacetsByName
     * @returns {Observable<FileFacet[]>}
     */
    public initFileFacets(selectedFacetsByName: Map<string, FileFacet>): Observable<FileFacet[]> {

        const source: ApiSource = this.configService.getSource();
        const sortOrder$ = source === "UCSC_STAGE" ? this.fileDAO.fetchFacetOrdering(source) : null;

        if (!sortOrder$) {
            return this.fetchFileFacets(selectedFacetsByName);
        }

        return Observable.combineLatest(
            sortOrder$,
            this.fileDAO.fetchFileFacets(selectedFacetsByName),
            (sortOrder: FacetSortOrder[], fileFacets: FileFacet[]) => {
                // re-sort fileFacets. This will drop any that don't exist in the sort order list.
                return sortOrder.map((order: FacetSortOrder) => {
                    return _.find(fileFacets, { name: order.name });
                });
            });
    }


    /**
     * Fetch File Summary Observable
     *
     * @param query
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(selectedFacets: FileFacet[]): Observable<FileSummary> {
        return this.fileDAO
            .fetchFileSummary(selectedFacets);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param query
     * @returns {Observable<Action>}
     */
    public fetchFileManifestSummary(selectedFacets: FileFacet[]): Observable<Dictionary<FileManifestSummary>> {

        return this.fileDAO
            .fetchFileManifestSummary(selectedFacets);
    }

}
