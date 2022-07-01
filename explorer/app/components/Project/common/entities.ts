/**
 * Configuration model of contributor response returned from projects index API.
 */
export interface ContributorResponse {
  contactName: string;
  correspondingContributor?: boolean;
  email?: string;
  institution: string;
  laboratory?: string;
  projectRole?: string;
}

export interface Project {
  contributedAnalyses: object;
  contributors: ContributorResponse[];
  estimatedCellCount: number;
  projectDescription: string;
  projectId: string;
  projectShortname: string;
  projectTitle: string;
  supplementaryLinks: string[];
}
