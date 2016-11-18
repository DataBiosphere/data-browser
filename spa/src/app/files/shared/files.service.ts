import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { ACTIONS } from "./../../shared";
import { FilesDAO } from "./files.dao";
import { ICGCQuery } from "../file-filters/icgc-query";
import {FileFacet} from "../file-facets/file-facets";
import {FileSummary} from "../file-summary/file-summary";
import { Dictionary } from "../../shared/dictionary";
import {FileManifestSummary} from "../file-manifest-summary/file-manifest-summary";

@Injectable()
export class FilesService {

    constructor(private fileDAO: FilesDAO) {

        //do not remove this line...
      //  console.log(ACTIONS.RECEIVE_FILE_SUMMARY);


    }


    /**
     * Download File Manifest
     *
     * @param query
     * @returns {any}
     */
    public downloadFileManifest(query: ICGCQuery): Observable<any> {

        query.format = "tarball";

        return this.fileDAO.downloadFileManifest(query);

    }

    /**
     * Fet FileFacets Observable
     *
     * @param filter
     * @returns {Observable<Action>}
     */
    public fetchFileFacets(filter = {}):Observable<FileFacet> {
        return this.fileDAO
            .fetchFileFacets(filter);
    }

    /**
     * Fetch File Summary Observable
     *
     * @param filter
     * @returns {Observable<Action>}
     */
    public fetchFileSummary(filter = {}): Observable<FileSummary> {
        return this.fileDAO
            .fetchFileSummary(filter);
    }

    /**
     * Fetch File Manifest Summary Observable
     *
     * @param query
     * @returns {Observable<Action>}
     */
    public fetchFileManifestSummary(query: ICGCQuery): Observable<Dictionary<FileManifestSummary>> {

        const filters = JSON.parse(query.filters);
        let repoNames = []; // TODO empty array default throws an error. There needs to be something in the repoNames

        if (filters.file && filters.file.repoName) {
            repoNames = filters.file.repoName.is;
        }

        // convert query from string back to object for post
        const form = Object.assign({}, {
            query: {
                filters: JSON.parse(query.filters)
            },
            repoNames: repoNames
        });

        return this.fileDAO
            .fetchFileManifestSummary(form);

    }
}
