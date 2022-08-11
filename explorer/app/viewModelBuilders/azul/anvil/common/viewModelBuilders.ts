// Core dependencies
import React from "react";

// App dependencies
import {
  getActivityType,
  getAnatomicalSite,
  getBioSampleId,
  getBioSampleType,
  getAggregatedBioSampleTypes,
  getActivityDataModalities,
  getDatasetBreadcrumbs,
  getDatasetDescription,
  getDatasetDetails,
  getDatasetEntryId,
  getDatasetName,
  getAggregatedDatasetNames,
  getDocumentId,
  getDonorId,
  getFileFormat,
  getFileId,
  getFileType,
  getLibraryId,
  getOrganismType,
  getAggregatedOrganismTypes,
  getPhenotypicSex,
  getAggregatedPhenotypicSexes,
  getPrepMaterialName,
  getAggregatedPrepMaterialNames,
  getAggregatedReportedEthnicities,
  getReportedEthnicities,
  getFileDataModalities,
} from "../../../../apis/azul/anvil/common/transformers";
import * as C from "../../../../components";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { URL_DATASETS } from "../../../../../site-config/anvil/dev/config";
import {
  ActivityEntityResponse,
  BioSampleEntityResponse,
  DatasetEntityResponse,
  DonorEntityResponse,
  FileEntityResponse,
  LibraryEntityResponse,
} from "../../../../apis/azul/anvil/common/entities";
import {
  AggregatedBioSampleResponse,
  AggregatedDatasetResponse,
  AggregatedDonorResponse,
  AggregatedLibraryResponse,
} from "../../../../apis/azul/anvil/common/aggregatedEntities";
import { DatasetsResponse } from "../../../../apis/azul/anvil/common/responses";

/**
 * Build props for activity type Cell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the activity type cell.
 */
export const buildActivityType = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getActivityType(response),
  };
};

/**
 * Build props for anatomical site Cell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the biosample type cell.
 */
export const buildAnatomicalSite = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getAnatomicalSite(response),
  };
};

/**
 * Build props for biosample id Cell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the biosample id cell.
 */
export const buildBioSampleId = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBioSampleId(response),
  };
};

/**
 * Build props for biosample type Cell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the biosample type cell.
 */
export const buildBioSampleType = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBioSampleType(response),
  };
};

/**
 * Build biosample types Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated biosamples.
 * @returns model to be used as props for the biosample types cell.
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
 * @returns model to be used as props for the Description component.
 */
export const buildDatasetDetails = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.Details> => {
  return {
    keyValuePairs: getDatasetDetails(response),
  };
};

/**
 * Build props for Hero component from the given datasets response.
 * TODO revisit - separate from entity builder, generalize modeling?, revisit transformer
 * @param response - Response model return from datasets API.
 * @returns model to be used as props for the Hero component.
 */
export const buildDatasetHero = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.ProjectHero> => {
  const firstCrumb = { path: URL_DATASETS, text: "Datasets" };
  return {
    breadcrumbs: getDatasetBreadcrumbs(firstCrumb, response),
    title: getDatasetName(response),
  };
};

/**
 * Build props for data modality NTagCell component from the given activities response.
 * @param response - Response model return from index/activities API.
 * @returns model to be used as props for the data modality NTagCell.
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
 * Build props for TitledText component for the display of the data release policy.
 * @returns model to be used as props for the TitledText component.
 */
export const buildDataReleasePolicy = (): React.ComponentProps<
  typeof C.TitledText
> => {
  return {
    text: [
      "Downloaded data is governed by the AnVIL Data Release Policy and licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0). For more information please see our Data Use Agreement.",
    ],
  };
};

/**
 * Build dataset name Cell component from the given index/datasets response.
 * @param response - Response model return from index/datasets API.
 * @returns model to be used as props for the dataset name cell.
 */
export const buildDatasetName = (
  response: DatasetsResponse
): React.ComponentProps<typeof C.Links> => {
  return {
    links: [
      {
        label: getDatasetName(response),
        url: `/datasets/${getDatasetEntryId(response)}`,
      },
    ],
  };
};

/**
 * Build dataset names Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns model to be used as props for the dataset names cell.
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
 * Build props for donor ID cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the donor ID cell.
 */
export const buildDonorId = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDonorId(response),
  };
};

/**
 * Build props for document ID Cell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the activity document cell.
 */
export const buildDocumentId = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDocumentId(response),
  };
};

/**
 * Build props for file data modality Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file data modality cell.
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
 * Build props for file ID Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file ID cell.
 */
export const buildFileId = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileId(response),
  };
};

/**
 * Build props for file format Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file format cell.
 */
export const buildFileFormat = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileFormat(response),
  };
};

/**
 * Build props for file type Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file type cell.
 */
export const buildFileType = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileType(response),
  };
};

/**
 * Build props for library ID Cell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the library ID cell.
 */
export const buildLibraryId = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getLibraryId(response),
  };
};

/**
 * Build props for organism type cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the organism type cell.
 */
export const buildOrganismType = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getOrganismType(response),
  };
};

/**
 * Build props for organism type cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the organism type cell.
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
 * Build props for phenotypic sex cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
 */
export const buildPhenotypicSex = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPhenotypicSex(response),
  };
};

/**
 * Build props for phenotypic sex cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
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
 * Build props for prep material name Cell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the prep material name cell.
 */
export const buildPrepMaterialName = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPrepMaterialName(response),
  };
};

/**
 * Build props for prep material name cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated libraries.
 * @returns model to be used as props for the organism type cell.
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
 * Build reported ethnicities Cell component from the given donors response. Naming is singular here to indicate
 * ethnicities are pulled from the core donor entity, even though the return value is an array.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the reported ethnicities cell.
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
 * Build reported ethnicities Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the reported ethnicities cell.
 */
export const buildReportedEthnicities = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getAggregatedReportedEthnicities(response),
  };
};

export const buildExportToTerraMetadata = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Analyze in Terra",
  description:
    "Terra is a biomedical research platform to analyze data using workflows, Jupyter Notebooks, RStudio, and Galaxy.",
  disabled: false,
  route: "/export",
  title: "Export Study Data and Metadata to Terra Workspace",
});
