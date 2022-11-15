import React from "react";
import {
  NCPICatalogEntity,
  NCPICatalogPlatform,
  NCPICatalogStudy,
} from "../../../apis/catalog/ncpi-catalog/common/entities";
import * as C from "../../../components";
import { METADATA_KEY } from "../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../components/Index/common/indexTransformer";

/**
 * Build props for consent codes cell component from the given NCPI entity.
 * @param ncpiCatalogEntry - NCPI catalog entity.
 * @returns Model to be used as props for the consent codes cell.
 */
export const buildConsentCodes = (
  ncpiCatalogEntry: NCPICatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
    values: ncpiCatalogEntry.consentCode,
  };
};

/**
 * Build props for data types cell component from the given NCPI entity.
 * @param ncpiCatalogEntry - NCPI catalog entity.
 * @returns Model to be used as props for the data types cell.
 */
export const buildDataTypes = (
  ncpiCatalogEntry: NCPICatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_TYPE),
    values: ncpiCatalogEntry.dataType,
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
    value: ncpiCatalogStudy.dbGapId,
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
    values: ncpiCatalogPlatform.dbGapId,
  };
};

/**
 * Build props for focus/disease cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the focus/disease cell.
 */
export const buildFocus = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: ncpiCatalogStudy.focus,
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
    values: ncpiCatalogPlatform.focus,
  };
};

/**
 * Build props for participant count cell component from the given NCPI entity.
 * @param ncpiCatalogEntry - NCPI catalog entity.
 * @returns Model to be used as props for the participant count cell.
 */
export const buildParticipantCount = (
  ncpiCatalogEntry: NCPICatalogEntity
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: ncpiCatalogEntry.participantCount,
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
    value: ncpiCatalogPlatform.platform,
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
    values: ncpiCatalogStudy.platform,
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
    values: ncpiCatalogEntity.studyDesign,
  };
};

/**
 * Build props for study name cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the study name cell.
 */
export const buildStudyTitle = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: ncpiCatalogStudy.title,
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
    values: ncpiCatalogPlatform.title,
  };
};
