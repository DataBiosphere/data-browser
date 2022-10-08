import {
  AnVILCatalogConsortium,
  AnVILCatalogEntity,
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "../../../apis/catalog/anvil-catalog/common/entities";
import {
  getConsentCode,
  getConsentCodes,
  getConsortium,
  getDataTypes,
  getDbGapId,
  getDbGapIds,
  getDiseases,
  getParticipantCount,
  getStudyDesigns,
  getTerraWorkspaceCount,
  getTerraWorkspaceName,
  getTerraWorkspaceNames,
} from "../../../apis/catalog/anvil-catalog/common/transformers";
import * as C from "../../../components";
import { METADATA_KEY } from "../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../components/Index/common/indexTransformer";

/**
 * Build props for consent code cell component from the given AnVIL workspace.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the consent code cell.
 */
export const buildConsentCode = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsentCode(anvilCatalogWorkspace),
  };
};

/**
 * Build props for consent codes cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the consent codes cell.
 */
export const buildConsentCodes = (
  anvilCatalogEntity: Exclude<AnVILCatalogEntity, AnVILCatalogWorkspace>
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
    values: getConsentCodes(anvilCatalogEntity),
  };
};

/**
 * Build props for consortium cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the consortium cell.
 */
export const buildConsortium = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsortium(anvilCatalogEntity),
  };
};

/**
 * Build props for data type cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the data type cell.
 */
export const buildDataTypes = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_TYPE),
    values: getDataTypes(anvilCatalogEntity),
  };
};

/**
 * Build props for dbGapId cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the dbGapId cell.
 */
export const buildDbGapId = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDbGapId(anvilCatalogEntity),
  };
};

/**
 * Build props for dbGapIds cell component from the given AnVIL consortium catalog.
 * @param anvilCatalogConsortium - AnVIL catalog consortium.
 * @returns Model to be used as props for the dbGapIds cell.
 */
export const buildDbGapIds = (
  anvilCatalogConsortium: AnVILCatalogConsortium
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DBGAP_ID),
    values: getDbGapIds(anvilCatalogConsortium),
  };
};

/**
 * Build props for disease (indication) cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the disease (indication) cell.
 */
export const buildDiseases = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_INDICATION),
    values: getDiseases(anvilCatalogEntity),
  };
};

/**
 * Build props for participant count cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the participant count cell.
 */
export const buildParticipantCount = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getParticipantCount(anvilCatalogEntity),
  };
};

/**
 * Build props for study design cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the study design cell.
 */
export const buildStudyDesigns = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.STUDY_DESIGN),
    values: getStudyDesigns(anvilCatalogEntity),
  };
};

/**
 * Build props for terra workspace count cell component from the given AnVIL study.
 * @param anVILCatalogStudy - AnVIL catalog study.
 * @returns Model to be used as props for the terra workspace count cell.
 */
export const buildTerraWorkspaceCount = (
  anVILCatalogStudy: AnVILCatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getTerraWorkspaceCount(anVILCatalogStudy),
  };
};

/**
 * Build props for terra workspace name cell component from the given AnVIL workspace.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the terra workspace name cell.
 */
export const buildTerraWorkspaceName = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getTerraWorkspaceName(anvilCatalogWorkspace),
  };
};

/**
 * Build props for terra workspace names cell component from the given AnVIL entity.
 * @param anVILCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the terra workspace names cell.
 */
export const buildTerraWorkspaceNames = (
  anVILCatalogEntity: Exclude<AnVILCatalogEntity, AnVILCatalogWorkspace>
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.WORKSPACE_NAME),
    values: getTerraWorkspaceNames(anVILCatalogEntity),
  };
};
