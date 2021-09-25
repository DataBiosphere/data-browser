/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of project-related information.
 */

// App dependencies
import { CollaboratingOrganizationView } from "./collaborating-organization-view.model";
import { ContactView } from "./contact-view.model";
import { ContributorView } from "./contributor-view.model";
import { ProjectAnalysisPortal } from "../project-analysis-portal/project-analysis-portal.model";
import { KeyValuePair } from "../../shared/key-value-pair/key-value-pair.model";
import { Publication } from "../shared/publication.model";

export interface ProjectView {
    citationLink: string;
    contacts: ContactView[];
    collaboratingOrganizations: CollaboratingOrganizationView[];
    contributors: ContributorView[];
    dataCurators: string[];
    dataSummaries: KeyValuePair[];
    fileTypeCounts: KeyValuePair[];
    projectAccessionsSummaries: KeyValuePair[];
}
