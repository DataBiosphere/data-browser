import {
  getConsortia,
  getDataType,
  getDisease,
  getIndication,
  getParticipantCount,
  getStudyDesign,
  getStudyName,
} from "../../../apis/anvil-catalog/common/transformers";
import { AnvilSourceItem } from "../../../apis/anvil/common/entities";
import * as C from "../../../components";

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
 * Build props for data type NTagCell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the data type NTagCell.
 */
export const buildDataType = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: "Data Types",
    values: getDataType(source),
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
 * Build props for study design NTagCell component from the given study in the Anvil catalog.
 * @param source - Study row in the Anvil catalog TSV.
 * @returns Model to be used as props for the study designs NTagCell.
 */
export const buildStudyDesign = (
  source: AnvilSourceItem
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: "Study Designs",
    values: getStudyDesign(source),
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
