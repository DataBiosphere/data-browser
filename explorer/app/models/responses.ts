/**
 * Model of contributor value included in the response from index/projects API endpoint.
 */
export interface ContributorResponse {
  contactName: string;
  correspondingContributor?: boolean;
  email?: string;
  institution: string;
  laboratory?: string;
  projectRole?: string;
}

/**
 * Model of fileFormat value included in the response from index/summary API endpoint.
 */
export interface FileFormatResponse {
  count: number;
  format: string;
}

/**
 * Model of project value nested in response returned from index/projects API endpoint.
 */
export interface ProjectResponse {
  contributedAnalyses: object;
  contributors: ContributorResponse[];
  estimatedCellCount: number;
  projectDescription: string;
  projectId: string;
  projectShortname: string;
  projectTitle: string;
  publications: PublicationResponse[];
  supplementaryLinks: string[];
}

/**
 * Model of response returned from /index/projects API endpoint.
 */
export interface ProjectsResponse {
  cellSuspensions?: {
    totalCells: number;
  }[];
  donorOrganisms: {
    developmentStage: string[];
    disease: string[];
    donorCount: number;
    genusSpecies: string[];
  }[];
  entryId: string;
  fileTypeSummaries: {
    count: number;
    format: string;
  }[];
  projects: ProjectResponse[];
  protocols: {
    libraryConstructionApproach?: string[];
    nucleicAcidSource?: string[];
    pairedEnd?: boolean[];
    workflow?: string[];
  }[];
  samples: {
    disease: string[];
    organ: string[];
    organPart: string[];
    sampleEntityType: string[];
  }[];
}

/**
 * Model of publication value nested in project response returned from index/projects API endpoint.
 */
export interface PublicationResponse {
  doi: string | null;
  officialHcaPublication: boolean | null;
  publicationTitle: string;
  publicationUrl: string;
}

/**
 * Model of response returned from /index/samples API endpoint.
 */
export interface SamplesResponse {
  donorOrganisms: {
    disease: string[];
    genusSpecies: string[];
  }[];
  projects: {
    estimatedCellCount?: number;
    projectTitle: string[];
  }[];
  protocols: {
    libraryConstructionApproach: string[];
  }[];
  samples: {
    id: string;
    organ: string;
    sampleEntityType: string;
  }[];
}
