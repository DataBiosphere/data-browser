import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import { CCBaseDAO } from "./../../cc-http";
import { RepositorySummary } from "../repository-summary/repository-summary";
import { RepositoryFiles } from "../repository-files/repository-files";


@Injectable()
export class RepositoryDAO extends CCBaseDAO {

    private DOMAIN = "https://dcc.icgc.org/api/v1";

    constructor(http: Http) {
        super(http);
    }

    /**
     * Fet RepositorySummary
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/getSummary
     *
     * @param [filters]
     * @returns {Observable<RepositorySummary>}
     */
    fetchRepositorySummary(filters: Object): Observable<RepositorySummary> {

        const url = this.buildApiUrl(`/repository/files/summary`);
        const filterParams = Object.assign({}, filters);
        return this.get<RepositorySummary>(url, filterParams);
    }

    /**
     * Fetch RepositoryFiles
     *
     * http://docs.icgc.org/portal/api-endpoints/#!/repository/findAll
     *
     * @param filters
     * @returns {Observable<RepositoryFiles>}
     */
    fetchRepositoryFiles(filters: Object): Observable<RepositoryFiles> {

        const url = this.buildApiUrl(`/repository/files`);
        const filterParams = Object.assign({ include: "facets" }, filters);
        return this.get<RepositoryFiles>(url, filterParams);
    }


    private buildApiUrl(url: string) {
        return `${this.DOMAIN}${url}`;
    }
}
