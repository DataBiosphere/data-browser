import { FileFormatResponse } from "../../../models/responses";
import {
  ActivitiesResponse,
  BioSamplesResponse,
  DatasetsResponse,
  DonorsResponse,
  LibrariesResponse,
} from "../anvil/common/responses";
import { FileEntityResponse } from "../anvil/common/entities";

/**
 * Base model of an entry in the "hits" value returned from an Azul entities response.
 */
export interface AzulHit {
  entryId: string;
}

/**
 * Set of all entities responses returned from Azul.
 */
export type AzulEntitiesResponses =
  | ActivitiesResponse
  | BioSamplesResponse
  | DatasetsResponse
  | DonorsResponse
  | FileEntityResponse
  | LibrariesResponse;

/**
 * Model of index (list) responses from Azul, such as projects (index/projects), samples (index/samples) and
 * files (index/files).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this type can't be determined beforehand
export interface AzulEntitiesResponse<T = any> {
  hits: T[];
  pagination: AzulPaginationResponse;
  termFacets: AzulTermFacets;
}

/**
 * Model of statically-built response from hitting Azul index endpoint e.g. /index/projects. That is, the model
 * is built at build-time.
 */
export interface AzulEntitiesStaticResponse {
  data?: AzulEntitiesResponse;
}

/**
 * Model of statically-built response from hitting Azul detail endpoint e.g. /index/projects/uuid. That is, the model
 * is built at build-time.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this data type can't be determined beforehand
export interface AzulEntityStaticResponse<T = any> {
  data?: T;
}

/**
 * Base index response interface, implemented by specific index responses (e.g. projects, samples, files).
 */
interface AzulPaginationResponse {
  count: number;
  next?: string;
  order?: "asc" | "desc";
  pages: number;
  previous?: string;
  size: number;
  sort?: string;
  total: number;
}

/**
 * Model of response returned from /index/summary API endpoint.
 */
export interface AzulSummaryResponse {
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
 * Model of term returned from Azul entity endpoint (e.g. index/files).
 */
export interface AzulTerm {
  count: number;
  term: string;
}

/**
 * Set of possible term types retured from Azul.
 */
enum AZUL_TERM_TYPE {
  "TERMS" = "terms",
}

/**
 * Model of term facet returned from Azul entity endpoint (e.g. index/files).
 */
export interface AzulTermFacet {
  terms: AzulTerm[];
  total: number;
  type: AZUL_TERM_TYPE;
}

/**
 * Model of term facets returned from Azul entity endpoint (e.g. index/files).
 */
export interface AzulTermFacets {
  [k: string]: AzulTermFacet;
}

/**
 * Set of labels that values returned from Azul can be santitized to.
 */
export enum LABEL {
  "ERROR" = "Error",
  "NONE" = "None",
  "UNSPECIFIED" = "Unspecified",
}
