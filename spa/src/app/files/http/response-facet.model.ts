/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a facet contained in the JSON response returned from files API. Contains array of terms as well as the total
 * number of terms (for a given file facet).
 */

// App dependencies
import { ResponseTerm } from "./response-term.model";

export interface ResponseFacet {
    terms: ResponseTerm[];
    total: number;
}
