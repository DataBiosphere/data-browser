// App dependencies
import { LibrariesResponse, LibraryEntityResponse } from "./entities";
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
 * Returns the singleton library entity value from the index/libraries API response.
 * @param librariesResponse - Response model return from libraries API endpoint.
 * @returns The core activity value from the API response.
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
