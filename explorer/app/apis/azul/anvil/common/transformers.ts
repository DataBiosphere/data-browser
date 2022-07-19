// App dependencies
import {
  DonorEntityResponse,
  DonorsResponse,
  LibrariesResponse,
  LibraryEntityResponse,
} from "./entities";
import { processAggregatedValue } from "../../common/utils";

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
 * Returns the singleton donor entity value from the index/donors API response.
 * @param donorResponse - Response model return from donors API endpoint.
 * @returns The core donor value from the API response.
 */
function getDonorEntityResponse(
  donorResponse?: DonorsResponse
): DonorEntityResponse | undefined {
  if (!donorResponse) {
    return;
  }

  // Can assume singleton array here as donors is the core entity returned from the index/donors response.
  return donorResponse.donors?.[0];
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
