import React from "react";
import {
  AnVILCatalogConsortium,
  AnVILCatalogEntity,
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "../../../../apis/catalog/anvil-catalog/common/entities";
import { ExploreState } from "../../../../common/context/exploreState";
import * as C from "../../../../components";
import {
  Key,
  Value,
} from "../../../../components/common/KeyValuePairs/keyValuePairs";
import { stringifyValues } from "../../../../components/Detail/common/utils";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { getEntityConfig } from "../../../../config/config";

/**
 * Build props for consent code cell component from the given AnVIL workspace.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the consent code cell.
 */
export const buildConsentCode = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: anvilCatalogWorkspace.consentCode,
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
    values: anvilCatalogEntity.consentCode,
  };
};

/**
 * Build props for consortium cell component from the given AnVIL entity.
 * @param anVILCatalogEntity - AnVIL catalog entity .
 * @returns Model to be used as props for the consortium cell.
 */
export const buildConsortium = (
  anVILCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: anVILCatalogEntity.consortium,
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
    values: anvilCatalogEntity.dataType,
  };
};

/**
 * Build props for dbGapId cell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the dbGapId cell.
 */
export const buildDbGapId = (
  anvilCatalogEntity: AnVILCatalogStudy
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: anvilCatalogEntity.dbGapId,
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
    values: anvilCatalogConsortium.dbGapId,
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
    values: anvilCatalogEntity.disease,
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
    value: anvilCatalogEntity.participantCount,
  };
};

/**
 * Build props for Markdown component from the given AnVIL entity.
 * TODO revisit - separate from entity builder, generalize description component, revisit transformer
 * @param anvilCatalogStudy - AnVIL catalog study.
 * @returns model to be used as props for the Markdown component.
 */
export const buildStudyDescription = (
  anvilCatalogStudy: AnVILCatalogStudy
): React.ComponentProps<typeof C.Markdown> => {
  return {
    content: anvilCatalogStudy.studyDescription || "None",
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
    values: anvilCatalogEntity.studyDesign,
  };
};

/**
 * Build props for study design cell component from the given AnVIL entity.
 * @param anVILCatalogConsortium - AnVIL catalog consortium.
 * @returns Model to be used as props for the study design cell.
 */
export const buildStudyNames = (
  anVILCatalogConsortium: AnVILCatalogConsortium
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.STUDY),
    values: anVILCatalogConsortium.studyName,
  };
};

/**
 * Build props for KeyValuePairs component from the given datasets index or dataset detail response.
 * TODO revisit - separate from entity builder, generalize modeling/component?, revisit transformer
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns model to be used as props for the KeyValuePairs component.
 */
export const buildStudyDetails = (
  response: AnVILCatalogStudy
): React.ComponentProps<typeof C.KeyValuePairs> => {
  const { consentCode, consortium, dataType, dbGapId, disease, studyDesign } =
    response;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set("Consortium", consortium);
  keyValuePairs.set("Consent Codes", stringifyValues(consentCode));
  keyValuePairs.set("Diseases", stringifyValues(disease));
  keyValuePairs.set("Study Design", stringifyValues(studyDesign));
  keyValuePairs.set("Data Types", stringifyValues(dataType));
  keyValuePairs.set("dbGaP ID", dbGapId);
  return {
    KeyElType: C.KeyElType,
    KeyValuesElType: (props) => C.Stack({ gap: 4, ...props }),
    ValueElType: C.ValueElType,
    keyValuePairs,
  };
};

/**
 * Build props for Hero component from the given study response.
 * TODO revisit - separate from entity builder, generalize modeling?, revisit transformer
 * @param response - Response model return from datasets API.
 * @param exploreState - Global search state.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildStudyHero = (
  response: AnVILCatalogStudy,
  exploreState: ExploreState
): React.ComponentProps<typeof C.BackPageHero> => {
  const { label, route } = getEntityConfig(exploreState.tabValue);
  const firstCrumb = { path: `/${route}`, text: label };
  const studyName = response.studyName;
  const breadcrumbs = [firstCrumb];
  if (studyName) {
    breadcrumbs.push({ path: "", text: studyName });
  }
  return {
    breadcrumbs: breadcrumbs,
    title: response.studyName,
  };
};

/**
 * Build props for study name cell component from the given AnVIL entity.
 * @param workspaceOrStudy - AnVIL catalog workspace.
 * @returns Model to be used as props for the study name cell.
 */
export const buildStudyName = (
  workspaceOrStudy: Exclude<AnVILCatalogEntity, AnVILCatalogConsortium>
): React.ComponentProps<typeof C.Link> => {
  return {
    label: workspaceOrStudy.studyName,
    url: `/studies/${workspaceOrStudy.dbGapId}`,
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
    value: anvilCatalogWorkspace.workspaceName,
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
    values: anVILCatalogEntity.workspaceName,
  };
};
