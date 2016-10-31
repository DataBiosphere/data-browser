import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { CCBaseDAO } from "./../../cc-http";

import { FileSummary } from "../file-summary";
import { FileFacet } from "../file-facets";


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


    private buildApiUrl(url: string) {
        return `${this.DOMAIN}${url}`;
    }
}
