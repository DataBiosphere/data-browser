/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of contributor view, included in JSON response returned from project API.
 */

export interface ContributorView {
    citation: number;
    name: string;
    role: string;
}
