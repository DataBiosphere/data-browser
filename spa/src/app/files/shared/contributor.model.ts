/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of contributor, included in JSON response returned from project API.
 */

export interface Contributor {
    contactName: string;
    correspondingContributor: string;
    email: string;
    institution: string;
    laboratory: string[];
}
