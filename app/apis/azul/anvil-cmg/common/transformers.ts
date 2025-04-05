import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { stringifyValues } from "@databiosphere/findable-ui/lib/common/utils";
import {
  Key,
  KeyValues,
  Value,
} from "@databiosphere/findable-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { MetadataValue } from "@databiosphere/findable-ui/lib/components/Index/components/NTagCell/nTagCell";
import { humanFileSize } from "../../../../utils/fileSize";
import {
  processAggregatedOrArrayValue,
  processEntityValue,
  processNumberEntityValue,
} from "../../common/utils";
import {
  AggregatedActivityResponse,
  AggregatedBioSampleResponse,
  AggregatedDatasetResponse,
  AggregatedDiagnosisResponse,
  AggregatedDonorResponse,
} from "./aggregatedEntities";
import {
  ActivityEntityResponse,
  BioSampleEntityResponse,
  DonorEntityResponse,
  FileEntityResponse,
  LibraryEntityResponse,
} from "./entities";
import { DatasetsResponse } from "./responses";

/**
 * Maps activity type from the core activity entity returned from the index/activites API response.
 * @param response - Response model return from index/activities API.
 * @returns Activity type.
 */
export function getActivityType(response: ActivityEntityResponse): string {
  return processEntityValue(response.activities, "activity_type");
}

/**
 * Maps anatomical site from the core biosample entity returned from the index/biosamples API response.
 * @param response - Response model return from index/biosamples API.
 * @returns Activity type.
 */
export function getAnatomicalSite(response: BioSampleEntityResponse): string {
  return processEntityValue(response.biosamples, "anatomical_site");
}

/**
 * Maps biosample ID from the core biosample entity returned from the index/biosamples API response.
 * @param response - Response model return from biosamples API.
 * @returns Biosample ID.
 */
export function getBioSampleId(response: BioSampleEntityResponse): string {
  return processEntityValue(response.biosamples, "biosample_id");
}

/**
 * Maps biosample type from the core biosample entity returned from the index/biosamples API response.
 * @param response - Response model return from biosamples API.
 * @returns Biosample type.
 */
export function getBioSampleType(response: BioSampleEntityResponse): string {
  return processEntityValue(response.biosamples, "biosample_type");
}

/**
 * Maps biosample type from the core biosample entity returned from the index/biosamples API response.
 * @param response - Response model return from biosamples API.
 * @returns Biosample type.
 */
export function getConsentGroup(response: DatasetsResponse): string[] {
  return processAggregatedOrArrayValue(response.datasets, "consent_group");
}

/**
 * Maps biosample type from an aggregated biosamples value returned from endpoints other than index/biosamples.
 * @param response - Response model return from Azul that includes aggregated biosamples.
 * @returns Set of aggregated biosample types.
 */
export function getAggregatedBioSampleTypes(
  response: AggregatedBioSampleResponse
): string[] {
  return processAggregatedOrArrayValue(response.biosamples, "biosample_type");
}

/**
 * Maps dataset-related information, included formatted display text from API response.
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns data summaries key-value pairs of data summary label and corresponding value.
 */
export function getDatasetDetails(
  response: DatasetsResponse
): KeyValues | undefined {
  const datasetId = processEntityValue(
    response.datasets,
    "dataset_id",
    LABEL.NONE
  );
  const details = new Map<Key, Value>();
  details.set("Dataset ID", datasetId);
  details.set("Consent group", getConsentGroup(response));
  details.set(
    "Organism type",
    stringifyValues(getAggregatedOrganismTypes(response))
  );
  details.set("Diagnosis", stringifyValues(getAggregatedDiagnoses(response)));
  details.set(
    "Phenotypic sex",
    stringifyValues(getAggregatedPhenotypicSexes(response))
  );
  details.set(
    "Reported ethnicity",
    stringifyValues(getAggregatedReportedEthnicities(response))
  );
  return details;
}

/**
 * Maps data modality from index/activities API response.
 * @param response - Response model return from index/activities API.
 * @returns a list of data modalities.
 */
export function getActivityDataModalities(
  response: ActivityEntityResponse
): MetadataValue[] {
  return processAggregatedOrArrayValue(response.activities, "data_modality");
}

/**
 * Maps data modalities from aggregated activities values returned from endpoints other than index/activities.
 * @param response - Response model return from Azul that includes aggregated activities.
 * @returns Data modalities.
 */
export function getAggregatedActivityDataModalities(
  response: AggregatedActivityResponse
): MetadataValue[] {
  return processAggregatedOrArrayValue(response.activities, "data_modality");
}

/**
 * Maps dataset id from the core dataset entity returned from the index/datasets endpoint.
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns Dataset ID.
 */
export function getDatasetEntryId(response: DatasetsResponse): string {
  return response.entryId ?? ""; // TODO throw on no ID?
}

/**
 * Maps dataset name from an aggregated datasets value returned from endpoints other than index/datasets.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns Set of aggregated dataset names.
 */
export function getAggregatedDatasetIds(
  response: AggregatedDatasetResponse
): string[] {
  return processAggregatedOrArrayValue(response.datasets, "dataset_id");
}

/**
 * Maps dataset name from an aggregated datasets value returned from endpoints other than index/datasets.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns Set of aggregated dataset names.
 */
export function getAggregatedDatasetTitles(
  response: AggregatedDatasetResponse
): string[] {
  return processAggregatedOrArrayValue(response.datasets, "title");
}

/**
 * Maps donor ID from the core donor value returned from the /index/donors API response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Donor ID.
 */
export function getDonorId(response: DonorEntityResponse): string {
  return processEntityValue(response.donors, "donor_id");
}

/**
 * Maps document ID the core activity entity returned from /index/activities API response.
 * @param response - Response model return from index/activities API.
 * @returns Document ID.
 */
export function getDocumentId(response: ActivityEntityResponse): string {
  return processEntityValue(response.activities, "document_id");
}

/**
 * Maps file data modality from the core file value returned from the /index/files API response.
 * @param response - Response model return from index/files API endpoint.
 * @returns File data modality.
 */
export function getFileDataModalities(response: FileEntityResponse): string[] {
  return processAggregatedOrArrayValue(response.files, "data_modality");
}

/**
 * Maps file ID from the core file value returned from the /index/files API response.
 * @param response - Response model return from index/files API endpoint.
 * @returns File ID.
 */
export function getFileName(response: FileEntityResponse): string {
  return processEntityValue(response.files, "file_name");
}

/**
 * Maps file format from the core file value returned from the /index/files API response.
 * @param response - Response model return from index/files API endpoint.
 * @returns File format.
 */
export function getFileFormat(response: FileEntityResponse): string {
  return processEntityValue(response.files, "file_format");
}

/**
 * Maps file size from the core file value returned from the /index/files API response.
 * @param response - Response model return from index/files API endpoint.
 * @returns Formatted file size.
 */
export function getFileSize(response: FileEntityResponse): string {
  const fileSize = processNumberEntityValue(response.files, "file_size");
  return humanFileSize(fileSize);
}

/**
 * Maps library ID from the core library value returned from the /index/libraries API response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns Library ID.
 */
export function getLibraryId(response: LibraryEntityResponse): string {
  return processEntityValue(response.libraries, "library_id");
}

/**
 * Maps organism type from the core donor value returned from the /index/donors API response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Organism type.
 */
export function getOrganismType(response: DonorEntityResponse): string {
  return processEntityValue(response.donors, "organism_type");
}

/**
 * Maps organism types from aggregated donors values returned from endpoints other than index/donors.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns Organism types.
 */
export function getAggregatedOrganismTypes(
  response: AggregatedDonorResponse
): string[] {
  return processAggregatedOrArrayValue(response.donors, "organism_type");
}

/**
 * Maps diagnoses from aggregated diagnoses values returned from endpoints other than index/diagnosis.
 * @param response - Response model return from Azul that includes diagnoses.
 * @returns Organism types.
 */
export function getAggregatedDiagnoses(
  response: AggregatedDiagnosisResponse
): string[] {
  return processAggregatedOrArrayValue(response.diagnoses, "disease");
}

/**
 * Maps prep material name from the core library value returned from the /index/libraries API response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns Prep material name.
 */
export function getPrepMaterialName(response: LibraryEntityResponse): string {
  return processEntityValue(response.libraries, "prep_material_name");
}

/**
 * Maps phenotypic sex from the core donor value returned from the /index/donors API response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Phenotypic sex.
 */
export function getPhenotypicSex(response: DonorEntityResponse): string {
  return processEntityValue(response.donors, "phenotypic_sex");
}

/**
 * Maps phenotypic sexes from aggregated donors values returned from endpoints other than index/donors.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns Phenotypic sexes.
 */
export function getAggregatedPhenotypicSexes(
  response: AggregatedDonorResponse
): string[] {
  return processAggregatedOrArrayValue(response.donors, "phenotypic_sex");
}

/**
 * Maps reported ethnicities from the core donors value returned from the index/donors endpoint.
 * @param response - Response model return from index/donors API endpoint.
 * @returns Set of aggregated dataset names.
 */
export function getReportedEthnicities(
  response: DonorEntityResponse
): string[] {
  return processAggregatedOrArrayValue(response.donors, "reported_ethnicity");
}

/**
 * Maps reported ethnicities from aggregated donors values returned from endpoints other than index/donors.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns Set of aggregated dataset names.
 */
export function getAggregatedReportedEthnicities(
  response: AggregatedDonorResponse
): string[] {
  return processAggregatedOrArrayValue(response.donors, "reported_ethnicity");
}
