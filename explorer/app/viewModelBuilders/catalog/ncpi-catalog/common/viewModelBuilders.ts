import { ANCHOR_TARGET } from "app/components/Links/common/entities";
import React, { ReactElement } from "react";
import {
  NCPICatalogEntity,
  NCPICatalogPlatform,
  NCPICatalogStudy,
} from "../../../../apis/catalog/ncpi-catalog/common/entities";
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
import { getEntityConfig } from "../../../../config/config";

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
 * Build props for Links component for the "Applying For Access" section from the given NCPI entity.
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
 * Build props for Markdown component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns model to be used as props for the Markdown component.
 */
export const buildStudyDescription = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Markdown> => {
  return {
    content: ncpiCatalogStudy.studyDescription || "None",
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
 * Build props for KeyValuePairs component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns model to be used as props for the KeyValuePairs component.
 */
export const buildStudyDetails = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.KeyValuePairs> => {
  const { dbGapId, platform, studyAccession } = ncpiCatalogStudy;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set("Platforms", stringifyValues(platform));
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
 * Build props for Hero component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @param exploreState - Global search state.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildStudyHero = (
  ncpiCatalogStudy: NCPICatalogStudy,
  exploreState: ExploreState
): React.ComponentProps<typeof C.BackPageHero> => {
  const { dbGapId, title } = ncpiCatalogStudy;
  return {
    breadcrumbs: getCatalogBreadcrumbs(exploreState, title),
    callToAction: {
      label: "Request Access",
      target: ANCHOR_TARGET.BLANK,
      url: `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${dbGapId}`,
    },
    title: title,
  };
};

/**
 * Build props for Details component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns model to be used as props for the Details component.
 */
export const buildStudySummary = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Details> => {
  const { consentCode, dataType, focus, participantCount, studyDesign } =
    ncpiCatalogStudy;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set("Consent Codes", stringifyValues(consentCode));
  keyValuePairs.set("Focus / Diseases", focus);
  keyValuePairs.set("Study Design", stringifyValues(studyDesign));
  keyValuePairs.set("Data Types", stringifyValues(dataType));
  keyValuePairs.set("Subjects", participantCount);
  return {
    keyValuePairs,
    title: "Summary",
  };
};

/**
 * Build props for study name cell component from the given NCPI entity.
 * @param ncpiCatalogStudy - NCPI catalog study.
 * @returns Model to be used as props for the study name cell.
 */
export const buildStudyTitle = (
  ncpiCatalogStudy: NCPICatalogStudy
): React.ComponentProps<typeof C.Link> => {
  return {
    label: ncpiCatalogStudy.title,
    url: `/studies/${ncpiCatalogStudy.dbGapId}`,
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
 * Returns the KeyValuePair value for the specified NCPI entity.
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
 * Returns the KeyValuePair value for the specified NCPI entity.
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
