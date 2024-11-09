import React from "react";
import { URL_DATASETS } from "../../../../../site-config/anvil/dev/config";
import {
  AggregatedBioSampleResponse,
  AggregatedDatasetResponse,
  AggregatedDonorResponse,
  AggregatedLibraryResponse,
} from "../../../../apis/azul/anvil/common/aggregatedEntities";
import {
  ActivityEntityResponse,
  BioSampleEntityResponse,
  DatasetEntityResponse,
  DonorEntityResponse,
  FileEntityResponse,
  LibraryEntityResponse,
} from "../../../../apis/azul/anvil/common/entities";
import { DatasetsResponse } from "../../../../apis/azul/anvil/common/responses";
import {
  getActivityDataModalities,
  getActivityType,
  getAggregatedBioSampleTypes,
  getAggregatedDatasetNames,
  getAggregatedOrganismTypes,
  getAggregatedPhenotypicSexes,
  getAggregatedPrepMaterialNames,
  getAggregatedReportedEthnicities,
  getAnatomicalSite,
  getBioSampleId,
  getBioSampleType,
  getDatasetBreadcrumbs,
  getDatasetDescription,
  getDatasetDetails,
  getDatasetEntryId,
  getDatasetName,
  getDocumentId,
  getDonorId,
  getFileDataModalities,
  getFileFormat,
  getFileId,
  getFileType,
  getLibraryId,
  getOrganismType,
  getPhenotypicSex,
  getPrepMaterialName,
  getReportedEthnicities,
} from "../../../../apis/azul/anvil/common/transformers";
import * as C from "../../../../components";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";

/**
 * Build props for activity type BasicCell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildActivityType = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getActivityType(response),
  };
};

/**
 * Build props for anatomical site BasicCell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildAnatomicalSite = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getAnatomicalSite(response),
  };
};

/**
 * Build props for biosample id BasicCell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildBioSampleId = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getBioSampleId(response),
  };
};

/**
 * Build props for biosample type BasicCell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildBioSampleType = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getBioSampleType(response),
  };
};

/**
 * Build biosample types NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated biosamples.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildBioSampleTypes = (
  response: AggregatedBioSampleResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.BIOSAMPLE_TYPE),
    values: getAggregatedBioSampleTypes(response),
  };
};

/**
 * Build props for Description component from the given entity response.
 * TODO revisit - separate from entity builder, generalize description component, revisit transformer
 * @param response - Response model return from datasets API.
 * @returns model to be used as props for the Description component.
 */
export const buildDatasetDescription = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.Description> => {
  return {
    projectDescription: getDatasetDescription(response) || "None",
  };
};

/**
 * Build props for Details component from the given datasets index or detaset detail response.
 * TODO revisit - separate from entity builder, generalize modeling/component?, revisit transformer
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns model to be used as props for the Details component.
 */
export const buildDatasetDetails = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.Details> => {
  return {
    keyValuePairs: getDatasetDetails(response),
    title: "Dataset Details",
  };
};

/**
 * Build props for BackPageHero component from the given datasets response.
 * TODO revisit - separate from entity builder, generalize modeling?, revisit transformer
 * @param response - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildDatasetHero = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  const firstCrumb = { path: URL_DATASETS, text: "Datasets" };
  return {
    breadcrumbs: getDatasetBreadcrumbs(firstCrumb, response),
    title: getDatasetName(response),
  };
};

/**
 * Build props for data modality NTagCell component from the given activities response.
 * @param response - Response model return from index/activities API.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildDataModality = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_MODALITY),
    values: getActivityDataModalities(response),
  };
};

/**
 * Build dataset name Link component from the given index/datasets response.
 * @param response - Response model return from index/datasets API.
 * @returns model to be used as props for the Link component.
 */
export const buildDatasetName = (
  response: DatasetsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: getDatasetName(response),
    url: `/datasets/${getDatasetEntryId(response)}`,
  };
};

/**
 * Build dataset names NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildDatasetNames = (
  response: AggregatedDatasetResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATASET_NAME),
    values: getAggregatedDatasetNames(response),
  };
};

/**
 * Build props for donor ID BasicCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildDonorId = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getDonorId(response),
  };
};

/**
 * Build props for document ID BasicCell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildDocumentId = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getDocumentId(response),
  };
};

/**
 * Build props for file data modality NTagCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildFileDataModality = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_MODALITY),
    values: getFileDataModalities(response),
  };
};

/**
 * Build props for file ID BasicCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildFileId = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getFileId(response),
  };
};

/**
 * Build props for file format BasicCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildFileFormat = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getFileFormat(response),
  };
};

/**
 * Build props for file type BasicCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for theBasicCell component.
 */
export const buildFileType = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getFileType(response),
  };
};

/**
 * Build props for library ID BasicCell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildLibraryId = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getLibraryId(response),
  };
};

/**
 * Build props for organism type BasicCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildOrganismType = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getOrganismType(response),
  };
};

/**
 * Build props for organism type NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildOrganismTypes = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ORGANISM_TYPE),
    values: getAggregatedOrganismTypes(response),
  };
};

/**
 * Build props for phenotypic sex BasicCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildPhenotypicSex = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getPhenotypicSex(response),
  };
};

/**
 * Build props for phenotypic sex NTagCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildPhenotypicSexes = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.PHENOTYPIC_SEX),
    values: getAggregatedPhenotypicSexes(response),
  };
};

/**
 * Build props for prep material name BasicCell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildPrepMaterialName = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getPrepMaterialName(response),
  };
};

/**
 * Build props for prep material name NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated libraries.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildPrepMaterialNames = (
  response: AggregatedLibraryResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.LIBRARY_PREPARATION),
    values: getAggregatedPrepMaterialNames(response),
  };
};

/**
 * Build reported ethnicities NTagCell component from the given donors response.
 * Naming is singular here to indicate ethnicities are pulled from the core donor entity,
 * even though the return value is an array.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildReportedEthnicity = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getReportedEthnicities(response),
  };
};

/**
 * Build reported ethnicities NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildReportedEthnicities = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getAggregatedReportedEthnicities(response),
  };
};
