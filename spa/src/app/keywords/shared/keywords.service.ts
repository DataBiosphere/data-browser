import { Injectable } from "@angular/core";
import { KeywordsDAO } from "./keywords.dao";
import { ACTIONS } from "../../shared/boardwalk.actions";

@Injectable()
export class KeywordsService {

    constructor(private keywordsDAO: KeywordsDAO) { }

    /**
     * Search Files
     *
     * @param payload
     * @returns {Observable<T>}
     */
    searchKeywords(payload: {searchTerm: string, type: string}) {

        const query = {
            q: payload.searchTerm,
            from: 1,
            size: 5,
            type: payload.type
        };
        return this.keywordsDAO
            .searchKeywords(query)
            .map((response) => {
                return {
                    type: ACTIONS.RECEIVE_KEYWORDS_QUERY,
                    payload: response
                };
            });
    }
}
