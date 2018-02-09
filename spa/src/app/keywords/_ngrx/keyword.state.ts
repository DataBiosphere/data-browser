/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of file or donor search state.
 */

// App dependencies
import { FetchKeywordsRequestAction, FetchKeywordsSuccessAction } from "./keyword.actions";

export class KeywordState {

    searchTerm: string;
    type: string;
    hits: any[];
    pagination: any;

    /**
     * @param {string} searchTerm
     * @param {string} type
     * @param {any[]} hits
     * @param pagination
     */
    constructor(searchTerm = "",
                type = "",
                hits: any[] = [],
                pagination: any = {}) {
        this.searchTerm = searchTerm;
        this.type = type;
        this.hits = hits;
        this.pagination = pagination;
    }

    public requestKeywordQuery(action: FetchKeywordsRequestAction) {
        return new KeywordState(action.searchTerm, action.keywordType);
    }

    public receiveKeywordQuery(action: FetchKeywordsSuccessAction) {
        return new KeywordState(this.searchTerm, this.type, action.response.hits, action.response.pagination);
    }

    /**
     * Return the default keyword state.
     * @returns {KeywordState}
     */
    public static getDefaultState() {
        return new KeywordState();
    }
}
