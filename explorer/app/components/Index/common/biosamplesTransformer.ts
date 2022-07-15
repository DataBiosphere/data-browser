// App dependencies
import { MetadataValue } from "./entities";
import {
  BiosampleDatasetResponse,
  BiosampleDonorResponse,
  BiosampleResponse,
  BiosamplesResponse,
} from "../../../models/responses";
import { filterDefinedValues } from "./utils";

/**
 * Maps anatomical site from API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns anatomical site.
 */
export function getAnatomicalSite(
  biosamplesResponse?: BiosamplesResponse
): string | undefined {
  const biosampleResponse = getBiosampleResponse(biosamplesResponse);
  return biosampleResponse?.anatomical_site ?? undefined; // anatomical site response can return null
}

/**
 * Maps biosample id from API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns biosample id.
 */
export function getBiosampleId(
  biosamplesResponse?: BiosamplesResponse
): string | undefined {
  const biosampleResponse = getBiosampleResponse(biosamplesResponse);
  return biosampleResponse?.biosample_id;
}

/**
 * Maps biosample type from API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns biosample type.
 */
export function getBiosampleType(
  biosamplesResponse?: BiosamplesResponse
): string | undefined {
  const biosampleResponse = getBiosampleResponse(biosamplesResponse);
  return biosampleResponse?.biosample_type ?? undefined; // biosample type response can return null
}

/**
 * Maps dataset name from API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns a list of dataset name.
 */
export function getDatasetName(
  biosamplesResponse?: BiosamplesResponse
): MetadataValue[] {
  const datasetResponse = getDatasetResponse(biosamplesResponse);
  const datasetNames = filterDefinedValues(datasetResponse?.title); // dataset names response can return [null]

  if (!datasetNames || datasetNames?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return datasetNames;
}

/**
 * Maps organism type from API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns a list of organism type.
 */
export function getOrganismType(
  biosamplesResponse?: BiosamplesResponse
): MetadataValue[] {
  const donorResponse = getDonorResponse(biosamplesResponse);
  const organismTypes = filterDefinedValues(donorResponse?.organism_type); // Organism type response can return [null].

  if (!organismTypes || organismTypes?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return organismTypes;
}

/**
 * Maps phenotypic sex from API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns a list of phenotypic sex.
 */
export function getPhenotypicSex(
  biosamplesResponse?: BiosamplesResponse
): MetadataValue[] {
  const donorResponse = getDonorResponse(biosamplesResponse);
  const phenotypicSexes = filterDefinedValues(donorResponse?.phenotypic_sex); // Phenotypic sex response can return [null]

  if (!phenotypicSexes || phenotypicSexes?.length === 0) {
    return ["Unspecified"]; // Caller is expecting "Unspecified", not an empty array.
  }

  return phenotypicSexes;
}

/**
 * Returns the biosample value from the biosamples API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns The core biosample value from the API response.
 */
function getBiosampleResponse(
  biosamplesResponse?: BiosamplesResponse
): BiosampleResponse | undefined {
  if (!biosamplesResponse) {
    return;
  }
  return biosamplesResponse.biosamples?.[0];
}

/**
 * Returns the dataset value from the biosamples API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns The core dataset value from the API response.
 */
function getDatasetResponse(
  biosamplesResponse?: BiosamplesResponse
): BiosampleDatasetResponse | undefined {
  if (!biosamplesResponse) {
    return;
  }
  return biosamplesResponse.datasets?.[0];
}

/**
 * Returns the donor value from the biosamples API response.
 * @param biosamplesResponse - Response model return from biosamples API.
 * @returns The core donor value from the API response.
 */
function getDonorResponse(
  biosamplesResponse?: BiosamplesResponse
): BiosampleDonorResponse | undefined {
  if (!biosamplesResponse) {
    return;
  }
  return biosamplesResponse.donors?.[0];
}
