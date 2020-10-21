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

export interface ProjectView {
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
