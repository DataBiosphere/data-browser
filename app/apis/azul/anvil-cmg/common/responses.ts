import { AzulHit, ResponseStatus } from "../../common/entities";
import {
  AggregatedActivityResponse,
  AggregatedBioSampleResponse,
  AggregatedDatasetResponse,
  AggregatedDiagnosisResponse,
  AggregatedDonorResponse,
  AggregatedFileResponse,
  AggregatedLibraryResponse,
} from "./aggregatedEntities";
import {
  ActivityEntityResponse,
  ActivityType,
  BioSampleEntityResponse,
  DatasetEntityResponse,
  DonorEntityResponse,
  DonorSpecies,
  FileEntityResponse,
  FileFormat,
  LibraryEntityResponse,
} from "./entities";

/**
 * Model of response returned from the /index/activities API endpoint.
 */
export type ActivitiesResponse = AzulHit &
  ActivityEntityResponse &
  AggregatedBioSampleResponse &
  AggregatedDatasetResponse &
  AggregatedDonorResponse &
  AggregatedFileResponse &
  AggregatedLibraryResponse;

/**
 * Model of response returned from the /index/biosamples API endpoint.
 */
export type BioSamplesResponse = AzulHit &
  BioSampleEntityResponse &
  AggregatedActivityResponse &
  AggregatedDatasetResponse &
  AggregatedDonorResponse &
  AggregatedFileResponse &
  AggregatedLibraryResponse;

/**
 * Model of response returned from the /index/datasets API endpoint.
 */
export type DatasetsResponse = AzulHit &
  DatasetEntityResponse &
  AggregatedActivityResponse &
  AggregatedBioSampleResponse &
  AggregatedDonorResponse &
  AggregatedFileResponse &
  AggregatedLibraryResponse &
  AggregatedDiagnosisResponse &
  ResponseStatus;

/**
 * Model of response returned from the /index/donors API endpoint.
 */
export type DonorsResponse = AzulHit &
  DonorEntityResponse &
  AggregatedActivityResponse &
  AggregatedBioSampleResponse &
  AggregatedDatasetResponse &
  AggregatedFileResponse &
  AggregatedLibraryResponse;

/**
 * Model of response returned from the /index/files API endpoint.
 */
export type FilesResponse = AzulHit &
  FileEntityResponse &
  AggregatedActivityResponse &
  AggregatedBioSampleResponse &
  AggregatedDatasetResponse &
  AggregatedDonorResponse &
  AggregatedLibraryResponse;

/**
 * Model of response returned from the /index/libraries API endpoint.
 */
export type LibrariesResponse = AzulHit &
  LibraryEntityResponse &
  AggregatedActivityResponse &
  AggregatedBioSampleResponse &
  AggregatedDatasetResponse &
  AggregatedDonorResponse &
  AggregatedFileResponse;

/**
 * Model of response returned from /index/summary API endpoint.
 */
export type SummaryResponse = {
  activityCount: number;
  activityTypes: ActivityType[];
  biosampleCount: number;
  datasetCount: number;
  donorCount: number;
  donorDiagnosisDiseases: unknown[]; // TODO - when type is known.
  donorDiagnosisPhenotypes: unknown[]; // TODO - when type is known.
  donorSpecies: DonorSpecies[];
  fileCount: number;
  fileFormats: FileFormat[];
};
