/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of publication, included in JSON response returned from project API.
 */

export interface Publication {
    officialHcaPublication: boolean;
    publicationTitle: string;
    publicationUrl: string;
}
