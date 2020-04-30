/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of contributor, included in JSON response returned from project API.
 */

export interface Contributor {
    contactName: string;
    correspondingContributor: boolean;
    email: string;
    institution: string;
    laboratory: string[];
    projectRole: string;
}
