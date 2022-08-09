import {
  getStudyName,
  getConsortia,
  getDisease,
  getDataType,
  getIndication,
  getParticipantCount,
  getStudyDesign,
} from "../../../apis/anvil-catalog/common/transformers";
import * as C from "../../../components";
import { AnvilSourceItem } from "../../../apis/anvil/common/entities";

/**
 * Build props for study name cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildStudyName = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getStudyName(source),
  };
};

/**
 * Build props for consortia cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildConsortia = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsortia(source),
  };
};

/**
 * Build props for disease cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildDisease = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDisease(source),
  };
};

/**
 * Build props for data type cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildDataType = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDataType(source),
  };
};

/**
 * Build props for indication cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildIndication = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getIndication(source),
  };
};

/**
 * Build props for study design cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildStudyDesign = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getStudyDesign(source),
  };
};

/**
 * Build props for participant count cell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the platform cell.
 */
export const buildParticipantCount = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getParticipantCount(source),
  };
};
