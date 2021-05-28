/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of JSON response returned from project API.
 */

// App dependencies
import { Contributor } from "./contributor.model";
import { ProjectRow } from "../projects/project-row.model";
import { ProjectAnalysisPortal } from "../project-analysis-portal/project-analysis-portal.model";
import { Publication } from "./publication.model";

export interface Project extends ProjectRow {
    analysisPortals?: ProjectAnalysisPortal[]; // Populated from project edits JSON
    arrayExpressAccessions: string[];
    deprecated: boolean, // Specified in project-edits.json
    contributors: Contributor[];
    geoSeriesAccessions: string[];
    insdcProjectAccessions: string[];
    insdcStudyAccessions: string[];
    projectDescription: string;
    publications: Publication[];
    redirectUrl: string; // Redirect URL is only specified if project has been withdrawn
    supplementaryLinks: string[];
    supersededBy: string; // Specified only if project has been deprecated
    withdrawn: boolean; // Specified in project-edits.json
}
