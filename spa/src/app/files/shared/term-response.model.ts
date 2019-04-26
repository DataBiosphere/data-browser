/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of a term contained in the JSON response returned from files API. Contains term name and the total count, and
 * in the case of the "project" facet, an array of project IDs that share the same term name. 
 */

export interface TermResponse {

    count: number;
    projectId?: string[];
    term: string;
}
