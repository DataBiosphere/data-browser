import { AzulHit, ResponseStatus } from "../../common/entities";
import {
  AggregatedCellSuspensionsResponse,
  AggregatedDatesResponse,
  AggregatedDonorOrganismsResponse,
  AggregatedFileTypeSummariesResponse,
  AggregatedProjectsResponse,
  AggregatedProtocolsResponse,
  AggregatedSamplesResponse,
  AggregatedSpecimensResponse,
} from "./aggregatedEntities";
import {
  CellCountSummary,
  FilesEntityResponse,
  FileTypeSummary,
  ProjectsEntityResponse,
  ProjectSummary,
  SamplesEntityResponse,
} from "./entities";

/**
 * Model of response returned from /index/files or /index/samples or index/projects API endpoint.
 */
export type EntityResponse = FilesResponse | SamplesResponse | ProjectsResponse;

/**
 * Model of response returned from /index/files API endpoint.
 */
export type FilesResponse = AzulHit &
  FilesEntityResponse &
  AggregatedCellSuspensionsResponse &
  AggregatedDonorOrganismsResponse &
  AggregatedProjectsResponse &
  AggregatedProtocolsResponse &
  AggregatedSamplesResponse &
  AggregatedSpecimensResponse;

/**
 * Model of response returned from /index/projects API endpoint.
 */
export type ProjectsResponse = AzulHit &
  ProjectsEntityResponse &
  AggregatedCellSuspensionsResponse &
  AggregatedDatesResponse &
  AggregatedDonorOrganismsResponse &
  AggregatedFileTypeSummariesResponse &
  AggregatedProtocolsResponse &
  AggregatedSamplesResponse &
  AggregatedSpecimensResponse &
  ResponseStatus;

/**
 * Model of response returned from /index/samples API endpoint.
 */
export type SamplesResponse = AzulHit &
  SamplesEntityResponse &
  AggregatedCellSuspensionsResponse &
  AggregatedDonorOrganismsResponse &
  AggregatedFileTypeSummariesResponse &
  AggregatedProjectsResponse &
  AggregatedProtocolsResponse &
  AggregatedSpecimensResponse;

/**
 * Model of response returned from /index/summary API endpoint.
 */
export type SummaryResponse = {
  cellCountSummaries: CellCountSummary[];
  donorCount: number;
  fileCount: number;
  fileTypeSummaries: FileTypeSummary[];
  labCount: number;
  organTypes: string[];
  projectCount: number;
  projects: ProjectSummary[];
  speciesCount: number;
  specimenCount: number;
  totalFileSize: number | string;
};
