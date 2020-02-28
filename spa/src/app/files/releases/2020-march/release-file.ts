/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of a downloadable data file of a study, included in a project.
 */

export interface ReleaseFile {

    extension: string;
    type: string;
    url: string;
}
