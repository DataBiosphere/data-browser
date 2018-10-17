/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Model of JSON response returned from project API.
 */

// App dependencies
import { Contributor } from "./contributor.model";

export interface Project {
    contributors: Contributor[];
    entryId: string;
    projectDescription: string;
    projectTitle: string;
    species: string[];
}
