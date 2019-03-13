/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Data Access Object for hitting keyword-related API end points.
 */

// Core dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

// App dependencies
import { ConfigService } from "../../config/config.service";
import { KeywordQueryResponse } from "./keyword-query-response.model";

@Injectable()
export class KeywordsDAO {

    /**
     * @param {ConfigService} configService
     * @param {HttpClient} httpClient
     */
    constructor(private configService: ConfigService, private httpClient: HttpClient) {}

    /**
     * Search Keywords
     *
     * @param {Object} query
     * @returns {Observable<KeywordQueryResponse>}
     */
    searchKeywords(query: Object): Observable<KeywordQueryResponse> {

        const url = this.buildApiUrl("/keywords");

        return this.httpClient.get<KeywordQueryResponse>(url, {
            params: {
                "q": query["q"],
                "from": query["from"],
                "size": query["size"],
                "type": query["type"]
            }
        });
    }

    /**
     * Build full API Url
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {
        const domain = this.configService.getAPIURL();
        return `${domain}${url}`;
    }
}
