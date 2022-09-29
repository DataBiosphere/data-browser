import React from "react";
import { NCPICatalogDataset } from "../../../apis/ncpi-catalog/common/entities";
import {
  getConsentCodes,
  getDataTypes,
  getDbGapId,
  getFocusDisease,
  getParticipantCount,
  getPlatforms,
  getStudy,
  getStudyDesigns,
} from "../../../apis/ncpi-catalog/common/transformers";
import * as C from "../../../components";
import { METADATA_KEY } from "../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../components/Index/common/indexTransformer";

/**
 * Build props for consent code cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the consent code cell.
 */
export const buildConsentCodes = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
    values: getConsentCodes(ncpiCatalogDataset),
  };
};

/**
 * Build props for data type cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the data type cell.
 */
export const buildDataTypes = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_TYPE),
    values: getDataTypes(ncpiCatalogDataset),
  };
};

/**
 * Build props for dbGaPId cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the dbGaPId cell.
 */
export const buildDbGapId = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDbGapId(ncpiCatalogDataset),
  };
};

/**
 * Build props for focus/disease cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the focus/disease cell.
 */
export const buildFocusDisease = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFocusDisease(ncpiCatalogDataset),
  };
};

/**
 * Build props for participant count cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the participant count cell.
 */
export const buildParticipantCount = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getParticipantCount(ncpiCatalogDataset),
  };
};

/**
 * Build props for platform cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the platform cell.
 */
export const buildPlatforms = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.PLATFORM),
    values: getPlatforms(ncpiCatalogDataset),
  };
};

/**
 * Build props for study cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the study cell.
 */
export const buildStudy = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getStudy(ncpiCatalogDataset),
  };
};

/**
 * Build props for study design cell component from the given study in the NCPI catalog.
 * @param ncpiCatalogDataset - NCPI catalog dataset.
 * @returns Model to be used as props for the study design cell.
 */
export const buildStudyDesigns = (
  ncpiCatalogDataset: NCPICatalogDataset
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.STUDY_DESIGN),
    values: getStudyDesigns(ncpiCatalogDataset),
  };
};
