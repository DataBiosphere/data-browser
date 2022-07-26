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
  projects: {
    projectTitle: string[];
    estimatedCellCount?: number;
  }[];
  files: {
    name: string;
    uuid: string;
    format: string;
    size: number;
    contentDescription: string[];
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
  entryId: string;
  protocols: {
    workflow?: string[];
    libraryConstructionApproach?: string[];
    nucleicAcidSource?: string[];
    pairedEnd?: boolean[];
  }[];
  fileTypeSummaries: {
    format: string;
    count: number;
  }[];
  donorOrganisms: {
    genusSpecies: string[];
    disease: string[];
    developmentStage: string[];
    donorCount: number;
  }[];
  samples: {
    sampleEntityType: string[];
    organ: string[];
    organPart: string[];
    disease: string[];
  }[];
  cellSuspensions?: {
    totalCells: number;
  }[];
  projects: ProjectResponse[];
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
  protocols: {
    libraryConstructionApproach: string[];
  }[];
  projects: {
    projectTitle: string[];
    estimatedCellCount?: number;
  }[];
  donorOrganisms: {
    genusSpecies: string[];
    disease: string[];
  }[];
  samples: {
    id: string;
    sampleEntityType: string;
    organ: string;
  }[];
}

/**
 * Model to represent anvil's TSV file
 */
export interface AnvilSourceItem {
  name: string;
  status: string;
  bucketName: string;
  bucketSize: number;
  COL: string;
  consentLongName: string;
  consentTitle: string;
  consortium: string;
  "library:datatype": string;
  "library:dataUseRestriction": string;
  discoveryCount: number;
  diseaseText?: string;
  DS: string;
  familyCount: number;
  GRU: string;
  GSO: string;
  HMB: string;
  "library:indication": string;
  IRB: string;
  MDS: string;
  NPU: string;
  NRES: string;
  participantCount: number;
  phsId: string;
  PUB: string;
  requestorPays: boolean;
  sampleCount: number;
  "library:studyDesign": string;
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
