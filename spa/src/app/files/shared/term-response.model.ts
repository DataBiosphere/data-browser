/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of a term contained in the JSON response returned from files API. Contains term name and the total count.
 */

export interface TermResponse {

    term: string;
    count: number;
}
