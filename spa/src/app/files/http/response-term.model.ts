/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a term contained in the JSON response returned from files API. Contains term name and the total count, and
 * in the case of the "project" facet, an array of project IDs that share the same term name.
 */

export interface ResponseTerm {
    count: number;
    projectId?: string[];
    term: string;
}
