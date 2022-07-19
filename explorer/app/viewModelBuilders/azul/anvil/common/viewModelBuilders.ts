// Core dependencies
import React from "react";

// App dependencies
import {
  DonorsResponse,
  LibrariesResponse,
} from "../../../../apis/azul/anvil/common/entities";
import {
  getBioSampleTypes,
  getDatasetNames,
  getDonorId,
  getLibraryId,
  getOrganismType,
  getPhenotypicSex,
  getPrepMaterialName,
  getReportedEthnicities,
} from "../../../../apis/azul/anvil/common/transformers";
import * as C from "../../../../components";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { METADATA_KEY } from "../../../../components/Index/common/entities";

/**
 * Build biosample types Cell component from the given libraries response.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the biosample types cell.
 */
export const buildBioSampleTypes = (
  librariesResponse: LibrariesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.BIOSAMPLE_TYPE),
    values: getBioSampleTypes(librariesResponse),
  };
};

/**
 * Build dataset names Cell component from the given libraries response.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the dataset names cell.
 */
export const buildDatasetNames = (
  librariesResponse: LibrariesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATASET_NAME),
    values: getDatasetNames(librariesResponse),
  };
};

/**
 * Build props for donor ID cell component from the given donors response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the donor ID cell.
 */
export const buildDonorId = (
  donorsResponse: DonorsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDonorId(donorsResponse),
  };
};

/**
 * Build props for library ID Cell component from the given libraries response.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the library ID cell.
 */
export const buildLibraryId = (
  librariesResponse: LibrariesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getLibraryId(librariesResponse),
  };
};

/**
 * Build props for organism type cell component from the given donors response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the organism type cell.
 */
export const buildOrganismType = (
  donorsResponse: DonorsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getOrganismType(donorsResponse),
  };
};

/**
 * Build props for phenotypic sex cell component from the given donors response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
 */
export const buildPhenotypicSex = (
  donorsResponse: DonorsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPhenotypicSex(donorsResponse),
  };
};

/**
 * Build reported ethnicities Cell component from the given donors response.
 * @param donorsResponse - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the reported ethnicities cell.
 */
export const buildReportedEthnicities = (
  donorsResponse: DonorsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getReportedEthnicities(donorsResponse),
  };
};

/**
 * Build props for prep material name Cell component from the given libraries response.
 * @param librariesResponse - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the prep material name cell.
 */
export const buildPrepMaterialName = (
  librariesResponse: LibrariesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPrepMaterialName(librariesResponse),
  };
};
