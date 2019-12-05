/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of project view, included in JSON response returned from project API.
 */

// App dependencies
import { CollaboratingOrganizationView } from "../project-view/collaborating-organization-view.model";
import { ContactView } from "../project-view/contact-view.model";
import { ContributorView } from "../project-view/contributor-view.model";
import { Project } from "../shared/project.model";

export interface ProjectView {
    contacts: ContactView[];
    collaboratingOrganizations: CollaboratingOrganizationView[];
    contributors: ContributorView[];
    dataCurators: string[];
    project: Project;
}
