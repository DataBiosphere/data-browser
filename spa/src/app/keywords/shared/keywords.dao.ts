/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data Access Object for hitting keyword-related API end points.
 */

// Core dependencies
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

// App dependencies
import { CCBaseDAO } from "../../cc-http/shared/cc-base.dao";
import { ConfigService } from "../../config/config.service";
import { KeywordQueryResponse } from "./keyword-query-response.model";

@Injectable()
export class KeywordsDAO extends CCBaseDAO {

    /**
     * @param {Http} http
     * @param {ConfigService} configService
     */
    constructor(http: Http, private configService: ConfigService) {
        super(http);
    }

    /**
     * Search Keywords
     *
     * @param {Object} query
     * @returns {Observable<KeywordQueryResponse>}
     */
    searchKeywords(query: Object): Observable<KeywordQueryResponse> {
        const url = this.buildApiUrl("/keywords");
        return this.get(url, query);
    }

    /**
     * Build full API Url
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {
        const domain = this.configService.getApiUrl();
        return `${domain}${url}`;
    }
}
