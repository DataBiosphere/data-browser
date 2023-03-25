import { AzulHit } from "../../common/entities";
import {
  AggregatedCellSuspensionsResponse,
  AggregatedDonorOrganismsResponse,
  AggregatedFileTypeSummariesResponse,
  AggregatedProjectsResponse,
  AggregatedProtocolsResponse,
  AggregatedSamplesResponse,
  AggregatedSpecimensResponse,
} from "./aggregatedEntities";
import {
  FilesEntityResponse,
  ProjectsEntityResponse,
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
  AggregatedDonorOrganismsResponse &
  AggregatedFileTypeSummariesResponse &
  AggregatedProtocolsResponse &
  AggregatedSamplesResponse &
  AggregatedSpecimensResponse;

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
