// Core dependencies
import React from "react";

// App dependencies
import * as C from "../../../app/components";
import {
  getLibraryPreparation,
  getReportedEthnicity,
  getDatasetName,
  getOrganismType,
  getPhenotypicSex,
  getDataModality,
} from "../../../app/components/Index/common/datasetsTransformer";
import { METADATA_KEY } from "../../../app/components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../app/components/Index/common/indexTransformer";
import { DatasetsResponse } from "../../../app/models/responses";

/**
 * Build props for data modality NTagCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the data modality NTagCell.
 */
export const buildDataModality = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_MODALITY),
    values: getDataModality(datasetsResponse),
  };
};

/**
 * Build props for dataset name Cell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the dataset name cell.
 */
export const buildDatasetName = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDatasetName(datasetsResponse),
  };
};

/**
 * Build props for library preparation NTagCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the library preparation NTagCell.
 */
export const buildLibraryPreparation = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.LIBRARY_PREPARATION),
    values: getLibraryPreparation(datasetsResponse),
  };
};

/**
 * Build props for organism type NTagCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the organism type NTagCell.
 */
export const buildOrganismType = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ORGANISM_TYPE),
    values: getOrganismType(datasetsResponse),
  };
};

/**
 * Build props for phenotypic sex NTagCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the phenotypic sex NTagCell.
 */
export const buildPhenotypicSex = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.PHENOTYPIC_SEX),
    values: getPhenotypicSex(datasetsResponse),
  };
};

/**
 * Build props for reported ethnicity NTagCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the reported ethnicity NTagCell.
 */
export const buildReportedEthnicity = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getReportedEthnicity(datasetsResponse),
  };
};
