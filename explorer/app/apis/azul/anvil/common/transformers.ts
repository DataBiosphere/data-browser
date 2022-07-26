// App dependencies
import {
  ActivityEntity,
  ActivityEntityResponse,
  BioSampleEntity,
  BioSampleEntityResponse,
  DatasetEntity,
  DatasetEntityResponse,
  DonorEntity,
  DonorEntityResponse,
  LibraryEntity,
  LibraryEntityResponse,
} from "./entities";
import { processAggregatedValue } from "../../common/utils";
import { Description } from "../../../../components/Project/common/entities";
import {
  Key,
  KeyValues,
  Value,
} from "../../../../components/common/KeyValuePairs/keyValuePairs";
import { Breadcrumb } from "../../../../components/common/Breadcrumbs/breadcrumbs";
import {
  AggregatedBioSampleResponse,
  AggregatedDatasetResponse,
  AggregatedDonorResponse,
  AggregatedLibraryResponse,
} from "./aggregatedEntities";
import { MetadataValue } from "../../../../components/Index/common/entities";
import { DatasetsResponse } from "./responses";

/**
 * Maps activity type from index/activites API response.
 * @param response - Response model return from index/activities API.
 * @returns Activity type.
 */
export function getActivityType(response?: ActivityEntityResponse): string {
  const activityEntityResponse = getActivityEntityResponse(response);
  return activityEntityResponse?.activity_type ?? "";
}

/**
 * Maps anatomical site from index/biosamples API response.
 * @param response - Response model return from index/biosamples API.
 * @returns Activity type.
 */
export function getAnatomicalSite(response?: BioSampleEntityResponse): string {
  const bioSampleEntityResponse = getBioSampleEntityResponse(response);
  return bioSampleEntityResponse?.anatomical_site ?? "";
}

/**
 * Maps biosample ID from index/biosamples API response.
 * @param response - Response model return from biosamples API.
 * @returns Biosample ID.
 */
export function getBioSampleId(response?: BioSampleEntityResponse): string {
  const bioSampleEntityResponse = getBioSampleEntityResponse(response);
  return bioSampleEntityResponse?.biosample_id ?? "";
}

/**
 * Maps biosample type from index/biosamples API response.
 * @param response - Response model return from biosamples API.
 * @returns Biosample type.
 */
export function getBioSampleType(response?: BioSampleEntityResponse): string {
  const biosampleResponse = getBioSampleEntityResponse(response);
  return biosampleResponse?.biosample_type ?? "";
}

/**
 * Maps biosample type from an aggregated biosamples value returned from endpoints other than index/biosamples.
 * @param response - Response model return from Azul that includes aggregated biosamples.
 * @returns Set of aggregated biosample types.
 */
export function getBioSampleTypes(
  response: AggregatedBioSampleResponse
): string[] {
  return processAggregatedValue(response.biosamples ?? [], "biosample_type");
}

/**
 * Returns dataset related breadcrumbs.
 * TODO revisit location
 * @param firstCrumb - First breadcrumb.
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns dataset breadcrumbs.
 */
export function getDatasetBreadcrumbs(
  firstCrumb: Breadcrumb,
  response?: DatasetEntityResponse
): Breadcrumb[] {
  const datasetName = getDatasetName(response);
  const breadcrumbs = [firstCrumb];
  if (datasetName) {
    breadcrumbs.push({ path: "", text: datasetName });
  }
  return breadcrumbs;
}

/**
 * Maps dataset description from API response.
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns string representation of dataset description.
 */
export function getDatasetDescription(
  response?: DatasetEntityResponse
): Description {
  const datasetEntityResponse = getDatasetEntityResponse(response);
  return datasetEntityResponse?.description ?? "None"; // TODO constant for none
}

/**
 * Maps dataset-related information, included formatted display text from API response. // TODO revisit
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns data summaries key-value pairs of data summary label and corresponding value.
 */
export function getDatasetDetails(
  response?: DatasetEntityResponse
): KeyValues | undefined {
  const datasetEntityResponse = getDatasetEntityResponse(response);
  if (!datasetEntityResponse) {
    return;
  }
  const details = new Map<Key, Value>();
  details.set("Dataset ID", datasetEntityResponse.dataset_id);
  return details;
}

/**
 * Maps data modality from index/activities API response.
 * @param response - Response model return from index/activities API.
 * @returns a list of data modalities.
 */
export function getDataModality(
  response?: ActivityEntityResponse
): MetadataValue[] {
  return processAggregatedValue(response?.activities ?? [], "data_modality");
}

/**
 * Maps dataset Id from the core dataset entity returned from the index/datasets endpoint.
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns Dataset ID.
 */
export function getDatasetEntryId(response?: DatasetsResponse): string {
  return response?.entryId ?? ""; // TODO throw on no ID?
}

/**
 * Maps dataset name from the core dataset entity returned from the index/datasets endpoint.
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns Dataset name.
 */
export function getDatasetName(response?: DatasetEntityResponse): string {
  const datasetEntityResponse = getDatasetEntityResponse(response);
  return datasetEntityResponse?.title ?? ""; // TODO throw on no title?
}

/**
 * Maps dataset name from an aggregated datasets value returned from endpoints other than index/datasets.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns Set of aggregated dataset names.
 */
export function getDatasetNames(response: AggregatedDatasetResponse): string[] {
  return processAggregatedValue(response.datasets ?? [], "title");
}

/**
 * Maps donor ID from the core library value returned from the /index/donors API response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Donor ID.
 */
export function getDonorId(response?: DonorEntityResponse): string {
  // TODO revisit optional param (here and in transformer, for each entity)
  const donorEntityResponse = getDonorEntityResponse(response);
  return donorEntityResponse?.donor_id ?? "";
}

/**
 * Maps document ID from /index/activities API response.
 * @param response - Response model return from index/activities API.
 * @returns Document ID.
 */
export function getDocumentId(response?: ActivityEntityResponse): string {
  const activityEntityResponse = getActivityEntityResponse(response);
  return activityEntityResponse?.document_id ?? "";
}

/**
 * Maps library ID from the core library value returned from the /index/libraries API response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns Library ID.
 */
export function getLibraryId(response?: LibraryEntityResponse): string {
  const libraryEntityResponse = getLibraryEntityResponse(response);
  return libraryEntityResponse?.library_id ?? "";
}

/**
 * Maps organism type from the core library value returned from the /index/donors API response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Organism type.
 */
export function getOrganismType(response?: DonorEntityResponse): string {
  const donorEntityResponse = getDonorEntityResponse(response);
  return donorEntityResponse?.organism_type ?? "";
}

/**
 * Maps organism types from aggregated donors values returned from endpoints other than index/donors.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns Organism types.
 */
export function getOrganismTypes(response?: AggregatedDonorResponse): string[] {
  return processAggregatedValue(response?.donors ?? [], "organism_type");
}

/**
 * Maps prep material name from the core library value returned from the /index/libraries API response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns Prep material name.
 */
export function getPrepMaterialName(response?: LibraryEntityResponse): string {
  const libraryEntityResponse = getLibraryEntityResponse(response);
  return libraryEntityResponse?.prep_material_name ?? "";
}

/**
 * Maps prep material names from aggregated librart values returned from endpoints other than index/libraries.
 * @param response - Response model return from Azul that includes aggregated libraries.
 * @returns Prep material names.
 */
export function getPrepMaterialNames(
  response?: AggregatedLibraryResponse
): string[] {
  return processAggregatedValue(
    response?.libraries ?? [],
    "prep_material_name"
  );
}

/**
 * Maps phenotypic sex from the core library value returned from the /index/donors API response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Phenotypic sex.
 */
export function getPhenotypicSex(response?: DonorEntityResponse): string {
  const donorEntityResponse = getDonorEntityResponse(response);
  return donorEntityResponse?.phenotypic_sex ?? "";
}

/**
 * Maps phenotypic sexes from aggregated donors values returned from endpoints other than index/donors.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns Phenotypic sexes.
 */
export function getPhenotypicSexes(
  response?: AggregatedDonorResponse
): string[] {
  return processAggregatedValue(response?.donors ?? [], "phenotypic_sex");
}

/**
 * Maps reported ethnicities from the core donors value returned from the index/donors endpoint.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Set of aggregated dataset names.
 */
export function getReportedEthnicity(response?: DonorEntityResponse): string[] {
  return processAggregatedValue(response?.donors ?? [], "reported_ethnicity");
}

/**
 * Maps reported ethnicities from aggregated donors values returned from endpoints other than index/donors.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns Set of aggregated dataset names.
 */
export function getReportedEthnicities(
  response?: AggregatedDonorResponse
): string[] {
  return processAggregatedValue(response?.donors ?? [], "reported_ethnicity");
}

/**
 * Returns the singleton activity entity value from the index/activities API response.
 * @param response - Response model return from activity API endpoint.
 * @returns The core activity value from the API response.
 */
function getActivityEntityResponse(
  response?: ActivityEntityResponse
): ActivityEntity | undefined {
  if (!response) {
    return;
  }

  // Can assume singleton array here as biosamples is the core entity returned from the index/biosamples response.
  return response.activities?.[0];
}

/**
 * Returns the singleton biosample entity value from the index/biosamples API response.
 * @param response - Response model return from index/biosamples API endpoint.
 * @returns The core biosample value from the API response.
 */
function getBioSampleEntityResponse(
  response?: BioSampleEntityResponse
): BioSampleEntity | undefined {
  if (!response) {
    return;
  }

  // Can assume singleton array here as biosamples is the core entity returned from the index/biosamples response.
  return response.biosamples?.[0];
}

/**
 * Returns the singleton donor entity value from the index/datasets or index/datsets/uuid API response. TODO generalize getXEntityResponse
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns The core dataset value from the API response.
 */
function getDatasetEntityResponse(
  response?: DatasetEntityResponse
): DatasetEntity | undefined {
  if (!response) {
    return;
  }

  // Can assume singleton array here as datasets is the core entity returned from the index/datasets response.
  return response.datasets?.[0];
}

/**
 * Returns the singleton donor entity value from the index/donors API response.
 * @param response - Response model return from donors API endpoint.
 * @returns The core donor value from the API response.
 */
function getDonorEntityResponse(
  response?: DonorEntityResponse
): DonorEntity | undefined {
  if (!response) {
    return;
  }

  // Can assume singleton array here as donors is the core entity returned from the index/donors response.
  return response.donors?.[0];
}

/**
 * Returns the singleton library entity value from the index/libraries API response.
 * @param response - Response model return from libraries API endpoint.
 * @returns The core library value from the API response.
 */
function getLibraryEntityResponse(
  response?: LibraryEntityResponse
): LibraryEntity | undefined {
  if (!response) {
    return;
  }

  // Can assume singleton array here as libraries is the core entity returned from the index/libraries response.
  return response.libraries?.[0];
}
