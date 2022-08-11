import { AzulHit } from "../../common/entities";
import { FilesEntityResponse, SamplesEntityResponse } from "./entities";
import {
  AggregatedDonorOrganismsResponse,
  AggregatedProjectsResponse,
  AggregatedProtocolsResponse,
} from "./aggregatedEntities";

/**
 * Model of response returned from /index/files API endpoint.
 */
export type FilesResponse = AzulHit &
  FilesEntityResponse &
  AggregatedProjectsResponse;

/**
 * Model of response returned from /index/samples API endpoint.
 */
export type SamplesResponse = AzulHit &
  SamplesEntityResponse &
  AggregatedDonorOrganismsResponse &
  AggregatedProjectsResponse &
  AggregatedProtocolsResponse;
