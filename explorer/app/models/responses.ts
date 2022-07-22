/**
 * Model of biosample dataset value included in the response from the AnVIL-specific index/activities API endpoint.
 * TODO look for reuse with BiosampleDatasetResponse
 */
export interface ActivityDatasetResponse {
  dataset_id: string[];
  title: string[];
}

/**
 * Model of response returned from the AnVIL-specific /index/biosamples API endpoint.
 */
export interface ActivitiesResponse {
  activities: ActivityResponse[];
  biosamples: BiosampleResponse[]; // TODO double-check reuse here
  datasets: ActivityDatasetResponse[];
  entryId: string;
}

/**
 * Model of activity value included in the response from the AnVIL-specific index/activities API endpoint.
 */
export interface ActivityResponse {
  activity_id?: string;
  activity_type: string;
  data_modality: string[];
  document_id: string;
}

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
 * Model of biosample dataset value included in the response from the AnVIL-specific index/biosamples API endpoint.
 * TODO look for reuse with ActitivyDatasetResponse
 */
export interface BiosampleDatasetResponse {
  dataset_id: string[];
  title: string[];
}

/**
 * Model of biosample donor value included in the response from the AnVIL-specific index/biosamples API endpoint.
 */
export interface BiosampleDonorResponse {
  organism_type: string[];
  phenotypic_sex: string[];
  reported_ethnicity: string[];
}

/**
 * Model of biosample value included in the response from the AnVIL-specific index/biosamples API endpoint.
 */
export interface BiosampleResponse {
  anatomical_site: string | null;
  biosample_id: string;
  biosample_type: string | null;
}

/**
 * Model of response returned from the AnVIL-specific /index/biosamples API endpoint.
 */
export interface BiosamplesResponse {
  biosamples: BiosampleResponse[];
  entryId: string;
  datasets: BiosampleDatasetResponse[];
  donors: BiosampleDonorResponse[];
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

export interface DatasetDonorResponse {
  organism_type: string[];
  phenotypic_sex: string[];
  reported_ethnicity: string[];
}

export interface DatasetLibraryResponse {
  prep_material_name: string[];
}

export interface DatasetResponse {
  title: string;
}

export interface DatasetsResponse {
  activities: ActivityResponse[];
  datasets: DatasetResponse[];
  donors: DatasetDonorResponse[];
  entryId: string;
  libraries: DatasetLibraryResponse[];
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
 * Model of index response type, such as projects (index/projects), samples (index/samples) and files (index/files).
 * TODO(cc) possibly standardize ListX naming convention to IndexX?
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this type can't be determined beforehand
export interface ListResponseType<T = any> extends PaginatedResponse {
  hits: T[];
}

/**
 * Base index response interface, implemented by specific index responses.
 */
interface PaginatedResponse {
  pagination: {
    count: number;
    total: number;
    size: number;
    next?: string;
    previous?: string;
    pages: number;
    sort?: string;
    order?: "asc" | "desc";
  };
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
 * Model of response returned from /index/summary API endpoint.
 */
export interface SummaryResponse {
  cellCountSummaries: {
    countOfDocsWithOrganType: number;
    organType: string[];
    totalCellCountByOrgan: number;
  }[];
  donorCount: number;
  fileCount: number;
  fileFormats?: FileFormatResponse[]; // TODO revisit AnVIL specific.
  fileTypeSummaries: {
    count: number;
    format: string;
    matrixCellCount: number;
    totalSize: number;
  }[];
  labCount: number;
  organTypes: string[];
  projectCount: number;
  projects: {
    cellSuspensions?: {
      totalCells?: number;
    };
    projects: {
      estimatedCellCount: number;
    };
  }[];
  speciesCount: number;
  specimenCount: number;
  totalFileSize: number;
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
