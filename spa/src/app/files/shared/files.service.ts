import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { FilesDAO } from "./files.dao";
import {FileSummary} from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import {FileManifestSummary} from "../file-manifest-summary/file-manifest-summary";
import { FileFacet } from "./file-facet.model";

@Injectable()
export class FilesService {

    constructor(private fileDAO: FilesDAO) {}

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
    public fetchFileFacets(selectedFacetsByName: Map<string,FileFacet>):Observable<FileFacet[]> {

        return this.fileDAO
            .fetchFileFacets(selectedFacetsByName);
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
