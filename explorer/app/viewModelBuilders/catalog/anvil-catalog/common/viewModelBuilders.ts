import React, { ReactElement } from "react";
import {
  AnVILCatalogConsortium,
  AnVILCatalogEntity,
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "../../../../apis/catalog/anvil-catalog/common/entities";
import { ExploreState } from "../../../../common/context/exploreState";
import * as C from "../../../../components";
import { Breadcrumb } from "../../../../components/common/Breadcrumbs/breadcrumbs";
import {
  Key,
  Value,
} from "../../../../components/common/KeyValuePairs/keyValuePairs";
import { stringifyValues } from "../../../../components/Detail/common/utils";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { ANCHOR_TARGET } from "../../../../components/Links/common/entities";
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
 * Build props for Links component for the "Applying For Access" section.
 * @returns model to be used as props for the Links component.
 */
export const buildStudyApplyingForAccess = (): React.ComponentProps<
  typeof C.Links
> => {
  return {
    links: [
      {
        label: "dbGaP FAQ",
        target: ANCHOR_TARGET.BLANK,
        url: "https://www.ncbi.nlm.nih.gov/books/NBK5295/",
      },
      {
        label: "dbGaP Access Request Video Tutorial",
        target: ANCHOR_TARGET.BLANK,
        url: "https://www.youtube.com/watch?v=m0xp_cCO7kA",
      },
    ],
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
 * Build props for KeyValuePairs component from the given AnVIL entity.
 * TODO revisit - separate from entity builder, generalize modeling/component?, revisit transformer
 * @param anVILCatalogStudy - AnVIL catalog study.
 * @returns model to be used as props for the KeyValuePairs component.
 */
export const buildStudyDetails = (
  anVILCatalogStudy: AnVILCatalogStudy
): React.ComponentProps<typeof C.KeyValuePairs> => {
  const { consortium, dbGapId, studyAccession } = anVILCatalogStudy;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set("Consortium", consortium);
  keyValuePairs.set("dbGaP ID", getStudyDbGapIdKeyValue(studyAccession));
  keyValuePairs.set("APIs", getStudyAPIKeyValue(dbGapId));
  return {
    KeyElType: C.KeyElType,
    KeyValuesElType: (props) => C.Stack({ gap: 4, ...props }),
    ValueElType: C.ValueElType,
    keyValuePairs,
  };
};

/**
 * Build props for Hero component from the given AnVIL entity.
 * TODO revisit - separate from entity builder, generalize modeling?, revisit transformer
 * @param anVILCatalogStudy - AnVIL catalog study.
 * @param exploreState - Global search state.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildStudyHero = (
  anVILCatalogStudy: AnVILCatalogStudy,
  exploreState: ExploreState
): React.ComponentProps<typeof C.BackPageHero> => {
  const { dbGapId, studyName } = anVILCatalogStudy;
  return {
    breadcrumbs: getCatalogBreadcrumbs(exploreState, studyName),
    callToAction: {
      label: "Request Access",
      target: ANCHOR_TARGET.BLANK,
      url: `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${dbGapId}`,
    },
    title: studyName,
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
  const { dbGapId, studyAccession, studyName } = workspaceOrStudy;
  return {
    label: studyName,
    url: studyAccession ? `/studies/${dbGapId}` : "",
  };
};

/**
 * Build props for Details component from the given AnVIL entity.
 * @param anVILCatalogStudy - AnVIL catalog study.
 * @returns model to be used as props for the Details component.
 */
export const buildStudySummary = (
  anVILCatalogStudy: AnVILCatalogStudy
): React.ComponentProps<typeof C.Details> => {
  const { consentCode, dataType, disease, participantCount, studyDesign } =
    anVILCatalogStudy;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set("Consent Codes", stringifyValues(consentCode));
  keyValuePairs.set("Diseases", stringifyValues(disease));
  keyValuePairs.set("Study Design", stringifyValues(studyDesign));
  keyValuePairs.set("Data Types", stringifyValues(dataType));
  keyValuePairs.set("Subjects", participantCount.toLocaleString());
  return {
    keyValuePairs,
    title: "Summary",
  };
};

/**
 * Build props for terra workspace name cell component from the given AnVIL workspace.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the terra workspace name cell.
 */
export const buildTerraWorkspaceName = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.Link> => {
  const workspaceName = anvilCatalogWorkspace.workspaceName;
  return {
    label: workspaceName,
    target: ANCHOR_TARGET.BLANK,
    url: `https://anvil.terra.bio/#workspaces/anvil-datastorage/${workspaceName}`,
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

/**
 * Returns catalog related breadcrumbs.
 * @param exploreState - Global search state.
 * @param lastCrumbText - Study title to be displayed as last crumb text.
 * @returns catalog breadcrumbs.
 */
function getCatalogBreadcrumbs(
  exploreState: ExploreState,
  lastCrumbText?: string
): Breadcrumb[] {
  const { label, route } = getEntityConfig(exploreState.tabValue);
  const firstCrumb = {
    path: `/${route}`,
    text: label,
  };
  const breadcrumbs = [firstCrumb];
  if (lastCrumbText) {
    breadcrumbs.push({ path: "", text: lastCrumbText });
  }
  return breadcrumbs;
}

/**
 * Returns the KeyValuePair value for the specified AnVIL entity.
 * @param dbGapId - Study identifier.
 * @returns the KeyValuePair value for study APIs as a ReactElement.
 */
function getStudyAPIKeyValue(dbGapId: string): ReactElement {
  return C.Stack({
    children: C.Links({
      links: [
        {
          label: "dbGaP FHIR",
          target: ANCHOR_TARGET.BLANK,
          url: `https://dbgap-api.ncbi.nlm.nih.gov/fhir/x1/ResearchStudy?_id=${dbGapId}&_format=json`,
        },
      ],
    }),
  });
}

/**
 * Returns the KeyValuePair value for the specified AnVIL entity.
 * @param studyAccession - Study identifier with version.
 * @returns the KeyValuePair value for study dbGap Id as a ReactElement.
 */
function getStudyDbGapIdKeyValue(studyAccession: string): ReactElement {
  return C.Link({
    label: studyAccession,
    target: ANCHOR_TARGET.BLANK,
    url: `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${studyAccession}`,
  });
}
