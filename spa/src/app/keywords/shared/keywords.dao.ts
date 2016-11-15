import { Injectable } from "@angular/core";
import { CCBaseDAO } from "../../cc-http/shared/cc-base.dao";
import { Http } from "@angular/http";

@Injectable()
export class KeywordsDAO extends CCBaseDAO {

    private DOMAIN = "https://dcc.icgc.org/api/v1";

    constructor(http: Http) {
        super(http);
    }

    searchKeywords(query: Object) {
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
        return `${this.DOMAIN}${url}`;
    }
}
