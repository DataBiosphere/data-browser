/**
 * Model of accession value in the response from index/projects API endpoints.
 */
export interface AccessionResponse {
  accession: string;
  namespace: string;
}

/**
 * Model of contributor value in the response from index/projects API endpoint.
 */
export interface ContributorResponse {
  contactName: string;
  correspondingContributor?: boolean;
  email: string | null;
  institution: string;
  laboratory?: string | null;
  projectRole?: string | null;
}

/**
 * Model of files in the response from /index/files API endpoint.
 */
export interface FilesEntityResponse {
  files: FileResponse[];
}

/**
 * Model of file value in the response from /index/files API endpoint.
 */
export interface FileResponse {
  accessible: boolean;
  contentDescription: (string | null)[];
  drs_uri: string;
  fileSource: string | null;
  format: string;
  isIntermediate: boolean | null;
  matrixCellCount: number | null;
  name: string;
  sha256: string;
  size: number;
  url: string | null; // TODO confirm null is possible.
  uuid: string;
  version: string;
}

/**
 * Model of file "leaf" values in matrix tree response from Azul.
 */
export interface ProjectMatrixFileResponse {
  contentDescription: string[];
  matrixCellCount?: number;
  name: string;
  size: number;
  url: string;
  uuid: string;
  version: string;
}

/**
 * Model of project value in the response from index/projects API endpoint.
 */
export interface ProjectResponse {
  accessible: boolean;
  accessions: AccessionResponse[];
  contributedAnalyses: ProjectResponseContributedAnalyses;
  contributors: ContributorResponse[];
  estimatedCellCount: number | null;
  laboratory: (string | null)[];
  matrices: ProjectResponseMatrices;
  projectDescription: string;
  projectId: string;
  projectShortname: string;
  projectTitle: string;
  publications: PublicationResponse[];
  supplementaryLinks: (string | null)[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO - revisit nested Azul structure.
export type ProjectResponseContributedAnalyses = { [key: string]: unknown };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO - revisit nested Azul structure.
export type ProjectResponseMatrices = { [key: string]: unknown };

/**
 * Model of projects in the response from /index/projects API endpoint.
 */
export interface ProjectsEntityResponse {
  projects: ProjectResponse[];
}

/**
 * Model of publication value in the response from index/projects API endpoint.
 */
export interface PublicationResponse {
  doi: string | null;
  officialHcaPublication: boolean | null;
  publicationTitle: string;
  publicationUrl: string;
}

/**
 * Model of sample value in the response from index/samples API endpoint.
 */
export interface SampleResponse {
  accessible: boolean;
  cellLineType?: string;
  disease?: (string | null)[];
  effectiveOrgan: string | null;
  id: string;
  modelOrgan?: string | null;
  modelOrganPart?: string | null;
  organ?: string;
  organPart?: (string | null)[];
  preservationMethod?: string | null;
  sampleEntityType: string;
  source?: string;
}

/**
 * Model of samples in the response from /index/samples API endpoint.
 */
export interface SamplesEntityResponse {
  samples: SampleResponse[];
}
