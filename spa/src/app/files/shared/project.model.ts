/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of JSON response returned from project API.
 */

// App dependencies
import { Contributor } from "./contributor.model";

export interface Project {
    arrayExpressAccessions: string[];
    contributors: Contributor[];
    entryId: string;
    cellCount: number;
    disease: string[];
    donorCount: number;
    fileType: string[];
    geoSeriesAccessions: string[];
    insdcProjectAccessions: string[];
    insdcStudyAccessions: string[];
    libraryConstructionApproach: string[];
    organ: string[];
    organPart: string[];
    projectDescription: string;
    projectShortname: string;
    projectTitle: string;
    publications: string[];
    species: string[];
}
