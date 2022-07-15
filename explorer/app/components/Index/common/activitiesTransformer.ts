// App dependencies
import { MetadataValue } from "./entities";
import {
  ActivitiesResponse,
  ActivityDatasetResponse,
  ActivityResponse,
  BiosampleResponse,
} from "../../../models/responses";
import { filterDefinedValues } from "./utils";

/**
 * Maps activity type from API response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns Activity type.
 */
export function getActivityType(
  activitiesResponse?: ActivitiesResponse
): string | undefined {
  const activityResponse = getActivityResponse(activitiesResponse);
  return activityResponse?.activity_type ?? "";
}

/**
 * Returns the activity value from the activities API response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns The core activity value from the API response.
 */
function getActivityResponse(
  activitiesResponse?: ActivitiesResponse
): ActivityResponse | undefined {
  if (!activitiesResponse) {
    return;
  }
  return activitiesResponse.activities?.[0];
}

/**
 * Returns the biosample value from the activities API response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns The core biosample value from the API response.
 */
function getBiosampleResponse(
  activitiesResponse?: ActivitiesResponse
): BiosampleResponse | undefined {
  if (!activitiesResponse) {
    return;
  }
  return activitiesResponse.biosamples?.[0];
}

/**
 * Maps biosample ID from API response. TODO revisit reuse with biosamples transformer.
 * @param activitiesResponse - Response model return from activities API.
 * @returns biosample ID.
 */
export function getBiosampleId(
  activitiesResponse?: ActivitiesResponse
): string | undefined {
  const biosampleResponse = getBiosampleResponse(activitiesResponse);
  return biosampleResponse?.biosample_id;
}

/**
 * Maps biosample type from API response. TODO revisit reuse with biosamples transformer.
 * @param activitiesResponse - Response model return from activities API.
 * @returns biosample type.
 */
export function getBiosampleType(
  activitiesResponse?: ActivitiesResponse
): string | undefined {
  const biosampleResponse = getBiosampleResponse(activitiesResponse);
  return biosampleResponse?.biosample_type ?? undefined; // biosample type response can return null
}

/**
 * Maps data modality from API response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns a list of data modalities.
 */
export function getDataModality(
  activitiesResponse?: ActivitiesResponse
): MetadataValue[] {
  const activityResponse = getActivityResponse(activitiesResponse);
  const dataModalities = filterDefinedValues(activityResponse?.data_modality); // Protect against [null] values

  if (!dataModalities || dataModalities?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return dataModalities;
}

/**
 * Returns the dataset value from the activities API response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns The core dataset value from the API response.
 */
function getDatasetResponse(
  activitiesResponse?: ActivitiesResponse
): ActivityDatasetResponse | undefined {
  if (!activitiesResponse) {
    return;
  }
  return activitiesResponse.datasets?.[0];
}

/**
 * Maps dataset name from API response. TODO revisit reuse with biosamples transformer.
 * @param activitiesResponse - Response model return from activities API.
 * @returns a list of dataset name.
 */
export function getDatasetName(
  activitiesResponse?: ActivitiesResponse
): MetadataValue[] {
  const datasetResponse = getDatasetResponse(activitiesResponse);
  const datasetNames = filterDefinedValues(datasetResponse?.title); // dataset names response can return [null]

  if (!datasetNames || datasetNames?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return datasetNames;
}

/**
 * Maps activity ID from API response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns Activity ID.
 */
export function getDocumentId(
  activitiesResponse?: ActivitiesResponse
): string | undefined {
  const activityResponse = getActivityResponse(activitiesResponse);
  return activityResponse?.document_id ?? "";
}
