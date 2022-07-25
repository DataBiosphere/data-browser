import { FileFormatResponse } from "../../../models/responses";

/**
 * Model of index response type, such as projects (index/projects), samples (index/samples) and files (index/files).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- this type can't be determined beforehand
export interface AzulEntitiesResponse<T = any> extends AzulPaginationResponse {
  hits: T[];
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
