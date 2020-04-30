/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Service handling term response-related functionality.
 */

// Core dependencies
import { Injectable } from "@angular/core";

// App dependencies
import { ResponseTerm } from "./response-term.model";

@Injectable()
export class ResponseTermService {

    /**
     * Update term name returned from response, if null. Otherwise, return term name as is.
     *
     * @param {ResponseTerm} termResponse
     * @returns {name}
     */
    public bindTermName(termResponse: ResponseTerm): string {

        return termResponse.term === null ? "Unspecified" : termResponse.term
    }
}

