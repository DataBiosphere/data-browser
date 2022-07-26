/**
 * Model of response returned from the AnVIL-specific /index/files API endpoint.
 */
export interface AnvilFilesResponse {
  activities: {
    activity_type: string[];
    data_modality: string[];
  }[];
  bundles: {
    bundleUuid: string;
    bundleVersion: string;
  }[];
  datasets: {
    title: string;
  }[];
  entryId: string;
  files: {
    accessible: boolean;
    data_modality: string[];
    date_created: string;
    document_id: string;
    file_format: string;
    file_id: string;
    file_type: string;
  }[];
  sources: {
    sourceId: string;
    sourceSpec: string;
  }[];
}

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
 * Model of response returned from /index/files API endpoint.
 */
export interface FilesResponse {
  files: {
    contentDescription: string[];
    format: string;
    name: string;
    size: number;
    uuid: string;
  }[];
  projects: {
    estimatedCellCount?: number;
    projectTitle: string[];
  }[];
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

/**
 * Model to represent anvil's TSV file
 */
export interface AnvilSourceItem {
  bucketName: string;
  bucketSize: number;
  COL: string;
  consentLongName: string;
  consentTitle: string;
  consortium: string;
  discoveryCount: number;
  diseaseText?: string;
  DS: string;
  familyCount: number;
  GRU: string;
  GSO: string;
  HMB: string;
  IRB: string;
  "library:datatype": string;
  "library:dataUseRestriction": string;
  "library:indication": string;
  "library:studyDesign": string;
  MDS: string;
  name: string;
  NPU: string;
  NRES: string;
  participantCount: number;
  phsId: string;
  PUB: string;
  requestorPays: boolean;
  sampleCount: number;
  status: string;
  subjectCount: number;
}

/**
 * Model to represent anvil's catalog TSV file
 */
export interface AnvilCatalogSourceItem {
  Access: string;
  "Consent Code": string;
  Consortium: string;
  "Data Type": string;
  "dbGap Id": string;
  Disease: string;
  Participants: number;
  Samples: number;
  "Size (TB)": number;
  Study: string;
  "Study Accession": string;
  "Study Design": string;
  "Terra Workspace Name": string;
}

/**
 * Model to represent NCPI's catalog TSV file
 */
export interface NPCICatalogSourceItem {
  "Consent Code": string;
  "Data Type": string;
  "dbGap Id": string;
  "Focus / Disease": string;
  Participants: number;
  Platform: string;
  Study: string;
  "Study Accession": string;
  "Study Design": string;
}
