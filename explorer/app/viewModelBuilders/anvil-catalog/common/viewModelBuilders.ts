import { AnVILCatalogWorkspace } from "../../../apis/anvil-catalog/common/entities";
import {
  getConsentCode,
  getConsortium,
  getDataTypes,
  getDbGapId,
  getDiseases,
  getParticipantCount,
  getStudyDesigns,
  getTerraWorkspaceName,
} from "../../../apis/anvil-catalog/common/transformers";
import * as C from "../../../components";
import { METADATA_KEY } from "../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../components/Index/common/indexTransformer";

/**
 * Build props for consent code cell component from the given workspace in the AnVIL catalog.
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
 * Build props for consortium cell component from the given workspace in the AnVIL catalog.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the consortium cell.
 */
export const buildConsortium = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsortium(anvilCatalogWorkspace),
  };
};

/**
 * Build props for data type cell component from the given workspace in the AnVIL catalog.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the data type cell.
 */
export const buildDataTypes = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_TYPE),
    values: getDataTypes(anvilCatalogWorkspace),
  };
};

/**
 * Build props for dbGap Id cell component from the given workspace in the AnVIL catalog.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the dbGap Id cell.
 */
export const buildDbGapId = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDbGapId(anvilCatalogWorkspace),
  };
};

/**
 * Build props for disease (indication) cell component from the given workspace in the AnVIL catalog.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the disease (indication) cell.
 */
export const buildDiseases = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_INDICATION),
    values: getDiseases(anvilCatalogWorkspace),
  };
};

/**
 * Build props for participant count cell component from the given workspace in the AnVIL catalog.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the participant count cell.
 */
export const buildParticipantCount = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getParticipantCount(anvilCatalogWorkspace),
  };
};

/**
 * Build props for study design cell component from the given workspace in the AnVIL catalog.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the study design cell.
 */
export const buildStudyDesigns = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.STUDY_DESIGN),
    values: getStudyDesigns(anvilCatalogWorkspace),
  };
};

/**
 * Build props for terra workspace name cell component from the given workspace in the AnVIL catalog.
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
