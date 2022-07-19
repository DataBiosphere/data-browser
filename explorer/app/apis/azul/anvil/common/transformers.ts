// App dependencies
import {
  DatasetEntityResponse,
  DatasetsResponse,
  DonorEntityResponse,
  DonorsResponse,
  LibrariesResponse,
  LibraryEntityResponse,
} from "./entities";
import { processAggregatedValue } from "../../common/utils";
import { Description } from "../../../../components/Project/common/entities";
import {
  Key,
  KeyValues,
  Value,
} from "../../../../components/common/KeyValuePairs/keyValuePairs";

/**
 * Maps biosample type from an aggregated biosamples value returned from endpoints other than index/biosamples.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns Set of aggregated biosample types.
 */
export function getBioSampleTypes(
  librariesResponse?: LibrariesResponse
): string[] {
  return processAggregatedValue(
    librariesResponse?.biosamples ?? [],
    "biosample_type"
  );
}

/**
 * Maps dataset description from API response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns string representation of dataset description.
 */
export function getDatasetDescription(
  datasetsResponse?: DatasetsResponse
): Description | undefined {
  const datasetEntityResponse = getDatasetEntityResponse(datasetsResponse);
  return datasetEntityResponse?.description ?? "None"; // TODO constant for none
}

/**
 * Maps dataset-related information, included formatted display text from API response. TODO revisit
 * @param datasetsResponse - Response model return from datasets API.
 * @returns data summaries key-value pairs of data summary label and corresponding value.
 */
export function getDatasetDetails(
  datasetsResponse?: DatasetsResponse
): KeyValues | undefined {
  const datasetEntityResponse = getDatasetEntityResponse(datasetsResponse);
  if (!datasetEntityResponse) {
    return;
  }
  const details = new Map<Key, Value>();
  details.set("Dataset ID", datasetEntityResponse.dataset_id);
  return details;
}

/**
 * Maps dataset name from the core dataset entity returned from the index/datasets endpoint.
 * @param datasetsResponse - Response model return from index/datasets API endpoint.
 * @returns Set of aggregated dataset names.
 */
export function getDatasetName(datasetsResponse?: DatasetsResponse): string {
  const datasetEntityResponse = getDatasetEntityResponse(datasetsResponse);
  return datasetEntityResponse?.title ?? ""; // TODO throw on no title?
}

/**
 * Maps dataset name from an aggregated datasets value returned from endpoints other than index/datasets.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns Set of aggregated dataset names.
 */
export function getDatasetNames(
  librariesResponse?: LibrariesResponse
): string[] {
  return processAggregatedValue(librariesResponse?.datasets ?? [], "title");
}

/**
 * Maps donor ID from the core library value returned from the /index/donors API response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns Donor ID.
 */
export function getDonorId(
  donorsResponse?: DonorsResponse
): string | undefined {
  const donorEntityResponse = getDonorEntityResponse(donorsResponse);
  return donorEntityResponse?.donor_id ?? "";
}

/**
 * Maps library ID from the core library value returned from the /index/libraries API response.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns Library ID.
 */
export function getLibraryId(
  librariesResponse?: LibrariesResponse
): string | undefined {
  const libraryEntityResponse = getLibraryEntityResponse(librariesResponse);
  return libraryEntityResponse?.library_id ?? "";
}

/**
 * Maps organism type from the core library value returned from the /index/donors API response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns Organism type.
 */
export function getOrganismType(
  donorsResponse?: DonorsResponse
): string | undefined {
  const donorEntityResponse = getDonorEntityResponse(donorsResponse);
  return donorEntityResponse?.organism_type ?? "";
}

/**
 * Maps prep material name from the core library value returned from the /index/libraries API response.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns Prep material name.
 */
export function getPrepMaterialName(
  librariesResponse?: LibrariesResponse
): string | undefined {
  const libraryEntityResponse = getLibraryEntityResponse(librariesResponse);
  return libraryEntityResponse?.prep_material_name ?? "";
}

/**
 * Maps phenotypic sex from the core library value returned from the /index/donors API response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns Phenotypic sex.
 */
export function getPhenotypicSex(
  donorsResponse?: DonorsResponse
): string | undefined {
  const donorEntityResponse = getDonorEntityResponse(donorsResponse);
  return donorEntityResponse?.phenotypic_sex ?? "";
}

/**
 * Maps reported ethnicities from the core donors value returned from the index/donors endpoint.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns Set of aggregated dataset names.
 */
export function getReportedEthnicities(
  donorsResponse?: DonorsResponse
): string[] {
  return processAggregatedValue(
    donorsResponse?.donors ?? [],
    "reported_ethnicity"
  );
}

/**
 * Returns the singleton donor entity value from the index/datasets API response. TODO generalize getXEntityResponse
 * @param datasetsResponse - Response model return from datasets API endpoint.
 * @returns The core dataset value from the API response.
 */
function getDatasetEntityResponse(
  datasetsResponse?: DatasetsResponse
): DatasetEntityResponse | undefined {
  if (!datasetsResponse) {
    return;
  }

  // Can assume singleton array here as datasets is the core entity returned from the index/datasets response.
  return datasetsResponse.datasets?.[0];
}

/**
 * Returns the singleton donor entity value from the index/donors API response.
 * @param donorsResponse - Response model return from donors API endpoint.
 * @returns The core donor value from the API response.
 */
function getDonorEntityResponse(
  donorsResponse?: DonorsResponse
): DonorEntityResponse | undefined {
  if (!donorsResponse) {
    return;
  }

  // Can assume singleton array here as donors is the core entity returned from the index/donors response.
  return donorsResponse.donors?.[0];
}

/**
 * Returns the singleton library entity value from the index/libraries API response.
 * @param librariesResponse - Response model return from libraries API endpoint.
 * @returns The core library value from the API response.
 */
function getLibraryEntityResponse(
  librariesResponse?: LibrariesResponse
): LibraryEntityResponse | undefined {
  if (!librariesResponse) {
    return;
  }

  // Can assume singleton array here as libraries is the core entity returned from the index/libraries response.
  return librariesResponse.libraries?.[0];
}
