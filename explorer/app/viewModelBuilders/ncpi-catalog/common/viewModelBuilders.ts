import React from "react";
import {
  NCPICatalogEntity,
  NCPICatalogPlatform,
  NCPICatalogStudy,
} from "../../../apis/catalog/ncpi-catalog/common/entities";
import {
  getConsentCodes,
  getDataTypes,
  getDbGapId,
  getDbGapIds,
  getFocusDisease,
  getFocusDiseases,
  getParticipantCount,
  getPlatform,
  getPlatforms,
  getStudyDesigns,
  getStudyName,
  getStudyNames,
} from "../../../apis/catalog/ncpi-catalog/common/transformers";
import * as C from "../../../components";
import { METADATA_KEY } from "../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../components/Index/common/indexTransformer";

/**
 * Build props for consent codes cell component from the given NCPI entity.
 * @param ncpiCatalogEntity - NCPI catalog entity.
 * @returns Model to be used as props for the consent codes cell.
 */
export const buildConsentCodes = (
  ncpiCatalogEntity: NCPICatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
    values: getConsentCodes(ncpiCatalogEntity),
  };
};

/**
 * Build props for data types cell component from the given NCPI entity.
 * @param ncpiCatalogEntity - NCPI catalog entity.
 * @returns Model to be used as props for the data types cell.
 */
export const buildDataTypes = (
  ncpiCatalogEntity: NCPICatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_TYPE),
    values: getDataTypes(ncpiCatalogEntity),
  };
};

/**
 * Build props for dbGaPId cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the dbGaPId cell.
 */
export const buildDbGapId = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDbGapId(ncpiCatalogStudy),
  };
};

/**
 * Build props for dbGaPIds cell component from the given NCPI entity.
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns Model to be used as props for the dbGaPIds cell.
 */
export const buildDbGapIds = (
  ncpiCatalogPlatform: NCPICatalogPlatform
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DBGAP_ID),
    values: getDbGapIds(ncpiCatalogPlatform),
  };
};

/**
 * Build props for focus/disease cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the focus/disease cell.
 */
export const buildFocusDisease = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFocusDisease(ncpiCatalogStudy),
  };
};

/**
 * Build props for focus/diseases cell component from the given NCPI entity.
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns Model to be used as props for the focus/diseases cell.
 */
export const buildFocusDiseases = (
  ncpiCatalogPlatform: NCPICatalogPlatform
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.FOCUS_DISEASE),
    values: getFocusDiseases(ncpiCatalogPlatform),
  };
};

/**
 * Build props for participant count cell component from the given NCPI entity.
 * @param ncpiCatalogEntity - NCPI catalog entity.
 * @returns Model to be used as props for the participant count cell.
 */
export const buildParticipantCount = (
  ncpiCatalogEntity: NCPICatalogEntity
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getParticipantCount(ncpiCatalogEntity),
  };
};

/**
 * Build props for platform cell component from the given NCPI entity.
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns Model to be used as props for the platform cell.
 */
export const buildPlatform = (
  ncpiCatalogPlatform: NCPICatalogPlatform
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPlatform(ncpiCatalogPlatform),
  };
};

/**
 * Build props for platforms cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the platforms cell.
 */
export const buildPlatforms = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.PLATFORM),
    values: getPlatforms(ncpiCatalogStudy),
  };
};

/**
 * Build props for study designs cell component from the given NCPI entity.
 * @param ncpiCatalogEntity - NCPI catalog entity.
 * @returns Model to be used as props for the study designs cell.
 */
export const buildStudyDesigns = (
  ncpiCatalogEntity: NCPICatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.STUDY_DESIGN),
    values: getStudyDesigns(ncpiCatalogEntity),
  };
};

/**
 * Build props for study name cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the study name cell.
 */
export const buildStudyName = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getStudyName(ncpiCatalogStudy),
  };
};

/**
 * Build props for study names cell component from the given NCPI entity.
 * @param ncpiCatalogPlatform - NCPI catalog platform.
 * @returns Model to be used as props for the study names cell.
 */
export const buildStudyNames = (
  ncpiCatalogPlatform: NCPICatalogPlatform
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.STUDY),
    values: getStudyNames(ncpiCatalogPlatform),
  };
};
