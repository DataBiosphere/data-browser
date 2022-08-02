import React from "react";
import * as C from "../../../components";
import { NPCICatalogSourceItem } from "../../../apis/ncpi-catalog/common/entities";
import {
  getConsentCode,
  getDataType,
  getDbGapId,
  getFocusDisease,
  getParticipants,
  getPlatform,
  getStudy,
  getStudyDesign,
} from "../../../apis/ncpi-catalog/common/transformers";

/**
 * Build props for platform cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildPlatform = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPlatform(source),
  };
};

/**
 * Build props for study cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the study cell.
 */
export const buildStudy = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getStudy(source),
  };
};

/**
 * Build props for focus/disease cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the focus/disease cell.
 */
export const buildFocusDisease = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFocusDisease(source),
  };
};

/**
 * Build props for data type cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the data type cell.
 */
export const buildDataType = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDataType(source),
  };
};

/**
 * Build props for dbGaP Id cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the dbGaP Id cell.
 */
export const buildDbGapId = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDbGapId(source),
  };
};

/**
 * Build props for study design cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the study design cell.
 */
export const buildStudyDesign = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getStudyDesign(source),
  };
};

/**
 * Build props for participants cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the participants cell.
 */
export const buildParticipants = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getParticipants(source),
  };
};

/**
 * Build props for consent code cell component from the given study in the NCPI catalog.
 * @param source - Study row in the NCPI catalog TSV.
 * @returns Model to be used as props for the consent code cell.
 */
export const buildConsentCode = (
  source: NPCICatalogSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsentCode(source),
  };
};
