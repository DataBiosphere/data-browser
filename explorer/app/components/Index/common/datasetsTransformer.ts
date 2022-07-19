// App dependencies
import { MetadataValue } from "./entities";
import {
  ActivityResponse,
  DatasetDonorResponse,
  DatasetLibraryResponse,
  DatasetResponse,
  DatasetsResponse,
} from "../../../models/responses";
import { filterDefinedValues } from "./utils";

/**
 * Maps data modality from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns a list of data modalities.
 */
export function getDataModality(
  datasetsResponse?: DatasetsResponse
): MetadataValue[] {
  const activityResponse = getActivityResponse(datasetsResponse);
  const dataModalities = filterDefinedValues(activityResponse?.data_modality);

  if (!dataModalities || dataModalities?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return dataModalities;
}

/**
 * Maps dataset ID from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns dataset ID.
 */
export function getDatasetId(
  datasetsResponse?: DatasetsResponse
): string | undefined {
  return datasetsResponse?.entryId; // TODO throw if no entryId? revisit on refactor to new pattern
}

/**
 * Maps dataset name from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns dataset name.
 */
export function getDatasetName(
  datasetsResponse?: DatasetsResponse
): string | undefined {
  const datasetResponse = getDatasetResponse(datasetsResponse);
  return datasetResponse?.title; // TODO throw if no dataset name? required for link. revisit on refactor to new pattern
}

/**
 * Maps library preparation from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns a list of library preparation.
 */
export function getLibraryPreparation(
  datasetsResponse?: DatasetsResponse
): MetadataValue[] {
  const libraryResponse = getLibraryResponse(datasetsResponse);
  const libraryPreparations = filterDefinedValues(
    libraryResponse?.prep_material_name
  ); // Library preparation material name response can return [null]

  if (!libraryPreparations || libraryPreparations?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return libraryPreparations;
}

/**
 * Maps organism type from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns a list of organism type.
 */
export function getOrganismType(
  datasetsResponse?: DatasetsResponse
): MetadataValue[] {
  const donorResponse = getDonorResponse(datasetsResponse);
  const organismTypes = filterDefinedValues(donorResponse?.organism_type); // Organism type response can return [null].

  if (!organismTypes || organismTypes?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return organismTypes;
}

/**
 * Maps phenotypic sex from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns a list of phenotypic sex.
 */
export function getPhenotypicSex(
  datasetsResponse?: DatasetsResponse
): MetadataValue[] {
  const donorResponse = getDonorResponse(datasetsResponse);
  const phenotypicSexes = filterDefinedValues(donorResponse?.phenotypic_sex); // Phenotypic sex response can return [null]

  if (!phenotypicSexes || phenotypicSexes?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return phenotypicSexes;
}

/**
 * Maps reported ethnicity from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns a list of reported ethnicity.
 */
export function getReportedEthnicity(
  datasetsResponse?: DatasetsResponse
): MetadataValue[] {
  const donorResponse = getDonorResponse(datasetsResponse);
  const reportedEthnicities = filterDefinedValues(
    donorResponse?.reported_ethnicity
  ); // Reported ethnicity response can return [null]

  if (!reportedEthnicities || reportedEthnicities?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return reportedEthnicities;
}

/**
 * Returns the activity value from the datasets API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns The core activity value from the API response.
 */
function getActivityResponse(
  datasetsResponse?: DatasetsResponse
): ActivityResponse | undefined {
  if (!datasetsResponse) {
    return;
  }
  return datasetsResponse.activities?.[0];
}

/**
 * Returns the dataset value from the datasets API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns The core dataset value from the API response.
 */
function getDatasetResponse(
  datasetsResponse?: DatasetsResponse
): DatasetResponse | undefined {
  if (!datasetsResponse) {
    return;
  }
  return datasetsResponse.datasets?.[0];
}

/**
 * Returns the donor value from the datasets API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns The core donor value from the API response.
 */
function getDonorResponse(
  datasetsResponse?: DatasetsResponse
): DatasetDonorResponse | undefined {
  if (!datasetsResponse) {
    return;
  }
  return datasetsResponse.donors?.[0];
}

/**
 * Returns the library value from the datasets API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns The core library value from the API response.
 */
function getLibraryResponse(
  datasetsResponse?: DatasetsResponse
): DatasetLibraryResponse | undefined {
  if (!datasetsResponse) {
    return;
  }
  return datasetsResponse.libraries?.[0];
}
