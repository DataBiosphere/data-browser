/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of project-related information.
 */

// App dependencies
import { ContactView } from "./contact-view.model";
import { ContributorView } from "./contributor-view.model";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";
import { Publication } from "../shared/publication.model";
import { CollaboratingOrganizationView } from "./collaborating-organization-view.model";
import { ProjectAnalysisPortal } from "../project-analysis-portal/project-analysis-portal.model";

export interface ProjectView {
    analysisPortals: ProjectAnalysisPortal[],
    citationLink: string;
    contacts: ContactView[];
    collaboratingOrganizations: CollaboratingOrganizationView[];
    contributors: ContributorView[];
    dataCurators: string[];
    dataSummaries: KeyValuePair[];
    fileCountSummaries: KeyValuePair[];
    projectAccessionsSummaries: KeyValuePair[];
    projectDescription: string;
    publications: Publication[];
}
