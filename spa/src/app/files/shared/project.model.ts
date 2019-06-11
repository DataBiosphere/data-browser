/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of JSON response returned from project API.
 */

// App dependencies
import { Contributor } from "./contributor.model";
import { ProjectRow } from "../hca-table-projects/project-row.model";

export interface Project extends ProjectRow {
    arrayExpressAccessions: string[];
    contributors: Contributor[];
    geoSeriesAccessions: string[];
    insdcProjectAccessions: string[];
    insdcStudyAccessions: string[];
    projectDescription: string;
    publications: string[];
}
