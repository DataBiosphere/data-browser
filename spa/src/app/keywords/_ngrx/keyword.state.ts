import { FetchKeywordsRequestAction, FetchKeywordsSuccessAction } from "./keyword.actions";

export class KeywordState {

    searchTerm: string;
    type: string;
    hits: any[];
    pagination: any;

    constructor(searchTerm = "",
                type = "",
                hits: any[] = [],
                pagination: any = {}) {
        this.searchTerm = searchTerm;
        this.type = type;
        this.hits = hits;
        this.pagination = pagination;
    }

    requestKeywordQuery(action: FetchKeywordsRequestAction) {
        return new KeywordState(action.searchTerm, action.keywordType);
    }

    receiveKeywordQuery(action: FetchKeywordsSuccessAction) {
        return new KeywordState(this.searchTerm, this.type, action.response.hits, action.response.pagination);
    }

    public static getDefaultState() {
        return new KeywordState();
    }
}
