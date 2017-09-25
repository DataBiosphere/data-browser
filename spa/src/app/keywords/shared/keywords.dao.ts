import { Injectable } from "@angular/core";
import { CCBaseDAO } from "../../cc-http/shared/cc-base.dao";
import { Http } from "@angular/http";
import { ConfigService } from "../../shared/config.service";
import { Observable } from "rxjs/Observable";
import { KeywordQueryResponse } from "./keyword-query-response.model";

@Injectable()
export class KeywordsDAO extends CCBaseDAO {


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
     * Build Full API Url
     *
     * @param url
     * @returns {string}
     */
    private buildApiUrl(url: string) {
        const domain = this.configService.getRootUrl();
        return `${domain}${url}`;
    }
}
