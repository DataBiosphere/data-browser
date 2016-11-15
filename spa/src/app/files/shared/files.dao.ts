import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CCBaseDAO } from "./../../cc-http";
import "rxjs/add/observable/of";

import { FileSummary } from "../file-summary";
import { FileFacet } from "../file-facets";
import { FileManifestSummary } from "../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "../../shared/dictionary";

@Injectable()
export class FilesDAO extends CCBaseDAO {

    private DOMAIN = "https://dcc.icgc.org/api/v1";

    constructor(http: Http) {
        super(http);
    }

    /**
     * Fet FileSummary
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param [filters]
     * @returns {Observable<FileSummary>}
     */
    fetchFileSummary(filters: Object): Observable<FileSummary> {

        const url = this.buildApiUrl(`/repository/files/summary`);
        const filterParams = Object.assign({}, filters);
        return this.get<FileSummary>(url, filterParams);
    }

    /**
     * Fetch FileFacets
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/findAll
     *
     * @param filters
     * @returns {Observable<FileFacet>}
     */
    fetchFileFacets(filters: Object): Observable<FileFacet> {

        const url = this.buildApiUrl(`/repository/files`);
        const filterParams = Object.assign({ include: "facets" }, filters);
        return this.get<FileFacet>(url, filterParams);
    }

    /**
     * Fetch Manifest Summary
     *
     * @param form
     * @returns {Observable<FileManifestSummary>}
     */
    fetchFileManifestSummary(form: Object): Observable<Dictionary<FileManifestSummary>> {

        const url = this.buildApiUrl("/repository/files/summary/manifest");
        return this.post<Dictionary<FileManifestSummary>>(url, form);
    }

    /**
     * Download Manifest
     *
     * @param query
     * @returns {any}
     */
    downloadFileManifest(query: Object): Observable<any> {

        let params = new URLSearchParams();
        Object.keys(query).forEach((paramName) => {
            params.append(paramName, query[paramName]);
        });
        window.location.href = this.buildApiUrl(`/manifests?${params.toString()}`);
        return Observable.of(true); // TODO error handling? I'm not sure setting the href causes any errors
    }

    /**
     * Build Full API Url
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {
        return `${this.DOMAIN}${url}`;
    }
}
