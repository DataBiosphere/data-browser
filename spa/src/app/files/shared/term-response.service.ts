/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling term response-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { TermResponse } from "./term-response.model";

@Injectable()
export class TermResponseService {

    /**
     * Update term name returned from response, if null. Otherwise, return term name as is.
     *
     * @param {TermResponse} termResponse
     * @returns {name}
     */
    public bindTermName(termResponse: TermResponse): string {

        return termResponse.term === null ? "Unspecified" : termResponse.term
    }
}

