/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of a facet contained in the JSON response returned from files API. Contains array of terms as well as the total 
 * number of terms (for a given file facet).
 */

// App dependencies
import { TermResponse } from "./term-response.model";

export interface FacetTermsResponse {

    terms: TermResponse[];
    total: number
}
