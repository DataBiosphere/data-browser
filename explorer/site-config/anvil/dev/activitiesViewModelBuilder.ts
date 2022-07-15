// Core dependencies
import React from "react";

// App dependencies
import * as C from "../../../app/components";
import { METADATA_KEY } from "../../../app/components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../app/components/Index/common/indexTransformer";
import { ActivitiesResponse } from "../../../app/models/responses";
import {
  getDocumentId,
  getActivityType,
  getBiosampleType,
  getBiosampleId,
  getDatasetName,
  getDataModality,
} from "../../../app/components/Index/common/activitiesTransformer";

/**
 * Build props for activity type Cell component from the given activities response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns model to be used as props for the activity type cell.
 */
export const buildActivityType = (
  activitiesResponse: ActivitiesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getActivityType(activitiesResponse),
  };
};

/**
 * Build props for biosample ID Cell component from the given activities response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns model to be used as props for the biosample ID cell.
 */
export const buildBiosampleId = (
  activitiesResponse: ActivitiesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBiosampleId(activitiesResponse),
  };
};

/**
 * Build props for biosample type Cell component from the given activities response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns model to be used as props for the biosample type cell.
 */
export const buildBiosampleType = (
  activitiesResponse: ActivitiesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBiosampleType(activitiesResponse),
  };
};

/**
 * Build props for data modality NTagCell component from the given activities response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns model to be used as props for the data modality NTagCell.
 */
export const buildDataModality = (
  activitiesResponse: ActivitiesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_MODALITY),
    values: getDataModality(activitiesResponse),
  };
};

/**
 * Build props for document ID Cell component from the given activities response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns model to be used as props for the activity document cell.
 */
export const buildDatasetName = (
  activitiesResponse: ActivitiesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDatasetName(activitiesResponse),
  };
};

/**
 * Build props for document ID Cell component from the given activities response.
 * @param activitiesResponse - Response model return from activities API.
 * @returns model to be used as props for the activity document cell.
 */
export const buildDocumentId = (
  activitiesResponse: ActivitiesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDocumentId(activitiesResponse),
  };
};
