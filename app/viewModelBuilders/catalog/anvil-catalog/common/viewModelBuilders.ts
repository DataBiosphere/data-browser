import { stringifyValues } from "@databiosphere/findable-ui/lib/common/utils";
import { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import {
  Key,
  Value,
} from "@databiosphere/findable-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { COLUMN_IDENTIFIER } from "@databiosphere/findable-ui/lib/components/Table/common/columnIdentifier";
import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import { ColumnDef } from "@tanstack/react-table";
import React, { ReactElement } from "react";
import {
  ANVIL_CATALOG_CATEGORY_KEY,
  ANVIL_CATALOG_CATEGORY_LABEL,
} from "../../../../../site-config/anvil-catalog/category";
import { CONSORTIUM } from "../../../../../site-config/anvil-catalog/dev/index/common/constants";
import {
  AnVILCatalogConsortium,
  AnVILCatalogConsortiumStudy,
  AnVILCatalogEntity,
  AnVILCatalogStudy,
  AnVILCatalogWorkspace,
} from "../../../../apis/catalog/anvil-catalog/common/entities";
import * as C from "../../../../components";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { formatSizeToTB } from "../../../../utils/fileSize";
import { JSX } from "react";

/**
 * Build props for bucket size BasicCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the BasicCell component.
 */
export const buildBucketSize = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: formatSizeToTB(anvilCatalogEntity.bucketSize),
  };
};

/**
 * Build props for ConsentCodesCell component from the given AnVIL workspace.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the ConsentCodesCell component.
 */
export const buildConsentCode = (
  anvilCatalogWorkspace: AnVILCatalogWorkspace
): React.ComponentProps<typeof C.ConsentCodesCell> => {
  return {
    consentCode: [anvilCatalogWorkspace.consentCode],
    consentLongName: anvilCatalogWorkspace.consentLongName,
    label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
  };
};

/**
 * Build props for ConsentCodesCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the ConsentCodesCell component.
 */
export const buildConsentCodes = (
  anvilCatalogEntity: Exclude<AnVILCatalogEntity, AnVILCatalogWorkspace>
): React.ComponentProps<typeof C.ConsentCodesCell> => {
  return {
    consentCode: anvilCatalogEntity.consentCode,
    consentLongName: anvilCatalogEntity.consentLongName,
    label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
  };
};

/**
 * Build props for consortium Link component from the given AnVIL entity.
 * @param anVILCatalogEntity - AnVIL catalog entity .
 * @returns Model to be used as props for the Link component.
 */
export const buildConsortium = (
  anVILCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.Link> => {
  const { consortium } = anVILCatalogEntity;
  return {
    label: consortium,
    url:
      consortium === CONSORTIUM.UNSPECIFIED ? "" : `/consortia/${consortium}`,
  };
};

/**
 * Build props for DetailViewTable component from the given AnVIL entity.
 * @param anVILCatalogConsortium - AnVil catalog consortium.
 * @returns Model to be used as props for the DetailViewTable component.
 */
export const buildConsortiumDetailViewStudiesTable = (
  anVILCatalogConsortium: AnVILCatalogConsortium
): React.ComponentProps<typeof C.DetailViewTable> => {
  const { studies } = anVILCatalogConsortium;
  return {
    Paper: C.FluidPaper,
    columns: buildConsortiumStudiesTableColumns(),
    gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr 1fr auto",
    items: studies,
    noResultsTitle: "No Studies",
    tableOptions: {
      enableRowPosition: false,
      getRowId: (originalRow) =>
        (originalRow as AnVILCatalogConsortiumStudy).studyName,
      initialState: {
        columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
      },
    },
  };
};

/**
 * Build props for DetailViewTable component from the given AnVIL entity.
 * @param anVILCatalogConsortium - AnVil catalog consortium.
 * @returns Model to be used as props for the DetailViewTable component.
 */
export const buildConsortiumDetailViewWorkspacesTable = (
  anVILCatalogConsortium: AnVILCatalogConsortium
): React.ComponentProps<typeof C.DetailViewTable> => {
  const { workspaces } = anVILCatalogConsortium;
  return {
    Paper: C.FluidPaper,
    columns: buildConsortiumWorkspacesTableColumns(),
    gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr auto",
    items: workspaces,
    noResultsTitle: "No Workspaces",
    tableOptions: {
      getRowId: (originalRow) =>
        (originalRow as AnVILCatalogWorkspace).workspaceName,
      initialState: {
        columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
      },
    },
  };
};

/**
 * Build props for ConsortiumDescription component from the given AnVIL entity.
 * @param anVILCatalogConsortium - AnVil catalog consortium.
 * @returns model to be used as props for the ConsortiumDescription component.
 */
export const buildConsortiumOverview = (
  anVILCatalogConsortium: AnVILCatalogConsortium
): React.ComponentProps<typeof C.ConsortiumDescription> => {
  return {
    source: anVILCatalogConsortium.consortiumOverview,
  };
};

/**
 * Build props for Details component from the given AnVIL entity.
 * @param anVILCatalogConsortium - AnVIL catalog consortium.
 * @returns model to be used as props for the Details component.
 */
export const buildConsortiumSummary = (
  anVILCatalogConsortium: AnVILCatalogConsortium
): React.ComponentProps<typeof C.Details> => {
  const {
    consentCode,
    consentLongName,
    dataType,
    disease,
    participantCount,
    studyDesign,
  } = anVILCatalogConsortium;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set(
    "Consent Codes",
    C.ConsentCodeList({ consentCode, consentLongName })
  );
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
 * Build props for data type NTagCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the NTagCell component.
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
 * Build props for dbGapId BasicCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the BasicCell component.
 */
export const buildDbGapId = (
  anvilCatalogEntity: AnVILCatalogStudy
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: anvilCatalogEntity.dbGapId,
  };
};

/**
 * Build props for dbGapIds NTagCell component from the given AnVIL consortium catalog.
 * @param anvilCatalogConsortium - AnVIL catalog consortium.
 * @returns Model to be used as props for the NTagCell component.
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
 * Build props for disease (indication) NTagCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the NTagCell component.
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
 * Build props for BackPageHero component from the given AnVIL entity.
 * @param anvilCatalogConsortium - AnVIL catalog consortium.
 * @param viewContext - View context.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildConsortiumHero = (
  anvilCatalogConsortium: AnVILCatalogConsortium,
  viewContext: ViewContext<AnVILCatalogConsortium>
): React.ComponentProps<typeof C.BackPageHero> => {
  const { consortium } = anvilCatalogConsortium;
  return {
    breadcrumbs: getCatalogBreadcrumbs(viewContext, consortium),
    title: consortium,
  };
};

/**
 * Build props for participant count BasicCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the BasicCell component.
 */
export const buildParticipantCount = (
  anvilCatalogEntity: AnVILCatalogEntity
): React.ComponentProps<typeof C.BasicCell> => {
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
 * Build props for study design NTagCell component from the given AnVIL entity.
 * @param anvilCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the NTagCell component.
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
 * Build props for DetailViewTable component from the given AnVIL entity.
 * @param anVILCatalogStudy - AnVil catalog study.
 * @returns Model to be used as props for the DetailViewTable component.
 */
export const buildStudyDetailViewWorkspacesTable = (
  anVILCatalogStudy: AnVILCatalogStudy
): React.ComponentProps<typeof C.DetailViewTable> => {
  const { workspaces } = anVILCatalogStudy;
  return {
    Paper: C.FluidPaper,
    columns: buildStudyWorkspacesTableColumns(),
    gridTemplateColumns: "auto 1fr 1fr 1fr 1fr 1fr auto",
    items: workspaces,
    noResultsTitle: "No Workspaces",
    tableOptions: {
      getRowId: (originalRow) =>
        (originalRow as AnVILCatalogWorkspace).workspaceName,
      initialState: {
        columnVisibility: { [COLUMN_IDENTIFIER.ROW_POSITION]: false },
      },
    },
  };
};

/**
 * Build props for study design NTagCell component from the given AnVIL entity.
 * @param anVILCatalogConsortium - AnVIL catalog consortium.
 * @returns Model to be used as props for the NTagCell component.
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
 * Build props for BackPageHero component from the given AnVIL entity.
 * TODO revisit - separate from entity builder, generalize modeling?, revisit transformer
 * @param anVILCatalogStudy - AnVIL catalog study.
 * @param viewContext - View context.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildStudyHero = (
  anVILCatalogStudy: AnVILCatalogStudy,
  viewContext: ViewContext<AnVILCatalogStudy>
): React.ComponentProps<typeof C.BackPageHero> => {
  const { dbGapId, studyName } = anVILCatalogStudy;
  return {
    breadcrumbs: getCatalogBreadcrumbs(viewContext, studyName),
    callToAction: {
      label: "Request Access",
      target: ANCHOR_TARGET.BLANK,
      url: `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${dbGapId}`,
    },
    title: studyName,
  };
};

/**
 * Build props for study name Link component from the given AnVIL entity.
 * @param workspaceOrStudy - AnVIL catalog workspace.
 * @returns Model to be used as props for the Link component.
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
  const {
    consentCode,
    consentLongName,
    dataType,
    disease,
    participantCount,
    studyDesign,
  } = anVILCatalogStudy;
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set(
    "Consent Codes",
    C.ConsentCodeList({ consentCode, consentLongName })
  );
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
 * Build props for terra workspace name Link component from the given AnVIL workspace.
 * @param anvilCatalogWorkspace - AnVIL catalog workspace.
 * @returns Model to be used as props for the Link component.
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
 * Build props for terra workspace names NTagCell component from the given AnVIL entity.
 * @param anVILCatalogEntity - AnVIL catalog entity.
 * @returns Model to be used as props for the NTagCell component.
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
 * Builds the table column definition model for the group of consecutive columns shared by all detailed view tables.
 * @returns table column definition.
 */
function buildSharedTableColumns<T>(): ColumnDef<T>[] {
  return [
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.DISEASE,
      cell: ({ row }) =>
        C.NTagCell(
          buildDiseases(row.original as unknown as AnVILCatalogEntity) // TODO revisit type assertion here
        ),
      header: ANVIL_CATALOG_CATEGORY_LABEL.DISEASE,
    },
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.DATA_TYPE,
      cell: ({ row }) =>
        C.NTagCell(
          buildDataTypes(row.original as unknown as AnVILCatalogEntity) // TODO revisit type assertion here
        ),
      header: ANVIL_CATALOG_CATEGORY_LABEL.DATA_TYPE,
    },
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
      cell: ({ row }) =>
        C.NTagCell(
          buildStudyDesigns(row.original as unknown as AnVILCatalogEntity) // TODO revisit type assertion here
        ),
      header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
    },
  ];
}

/**
 * Builds the table column definition model for the detailed view studies table.
 * @returns studies table column definition.
 */
function buildConsortiumStudiesTableColumns<T>(): ColumnDef<T>[] {
  return [
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
      cell: ({ row: { original } }): JSX.Element => {
        const { dbGapId, studyAccession, studyName } =
          original as unknown as AnVILCatalogConsortiumStudy; // TODO revisit type assertion here
        return C.Link({
          label: studyName,
          url: studyAccession ? `/studies/${dbGapId}` : "",
        });
      },
      header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
    },
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.DB_GAP_ID,
      header: ANVIL_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
    },
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
      cell: ({ row }): JSX.Element => {
        const { consentCode } =
          row.original as unknown as AnVILCatalogConsortiumStudy; // TODO revisit type assertion here
        return C.NTagCell({
          label: getPluralizedMetadataLabel(METADATA_KEY.CONSENT_CODE),
          values: consentCode,
        });
      },
      header: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
    },
    ...buildSharedTableColumns<T>(),
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
      cell: ({ row }): JSX.Element => {
        const { workspaceName } =
          row.original as unknown as AnVILCatalogConsortiumStudy; // TODO revisit type assertion here
        return C.NTagCell({
          label: getPluralizedMetadataLabel(METADATA_KEY.WORKSPACE_NAME),
          values: workspaceName,
        });
      },
      header: "Workspaces",
    },
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
      cell: ({ getValue }) =>
        (getValue() as unknown as number)?.toLocaleString(),
      header: ANVIL_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
    },
  ];
}

/**
 * Builds the table column definition model for the detailed view workspaces table.
 * @returns workspaces table column definition.
 */
function buildConsortiumWorkspacesTableColumns<T>(): ColumnDef<T>[] {
  return [
    buildWorkspaceNameTableColumn<T>(),
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.STUDY_NAME,
      cell: ({ row: { original } }) =>
        C.Link(buildStudyName(original as unknown as AnVILCatalogWorkspace)), // TODO revisit type assertion here
      header: ANVIL_CATALOG_CATEGORY_LABEL.STUDY_NAME,
    },
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
      header: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
    },
    ...buildSharedTableColumns<T>(),
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
      cell: ({ getValue }) =>
        (getValue() as unknown as number)?.toLocaleString(),
      header: ANVIL_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
    },
  ];
}

/**
 * Builds the table column definition model for the detailed view workspaces table.
 * @returns workspaces table column definition.
 */
function buildStudyWorkspacesTableColumns<T>(): ColumnDef<T>[] {
  return [
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.CONSORTIUM,
      cell: ({ row: { original } }) =>
        C.Link(buildConsortium(original as unknown as AnVILCatalogWorkspace)), // TODO revisit type assertion here
      header: ANVIL_CATALOG_CATEGORY_LABEL.CONSORTIUM,
    },
    buildWorkspaceNameTableColumn<T>(),
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.CONSENT_CODE,
      header: ANVIL_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
    },
    ...buildSharedTableColumns<T>(),
    {
      accessorKey: ANVIL_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
      cell: ({ getValue }) =>
        (getValue() as unknown as number)?.toLocaleString(),
      header: ANVIL_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
    },
  ];
}

/**
 * Builds the table column definition model for the name column of the detailed view workspaces table.
 * @returns workspaces table column definition.
 */
function buildWorkspaceNameTableColumn<T>(): ColumnDef<T> {
  return {
    accessorKey: ANVIL_CATALOG_CATEGORY_KEY.WORKSPACE_NAME,
    cell: ({ row: { original } }) =>
      C.Link(
        buildTerraWorkspaceName(original as unknown as AnVILCatalogWorkspace) // TODO revisit type assertion here
      ),
    header: "Terra Workspace",
    meta: { columnPinned: true },
  };
}

/**
 * Returns catalog related breadcrumbs.
 * @param viewContext - View context.
 * @param lastCrumbText - Study title to be displayed as last crumb text.
 * @returns catalog breadcrumbs.
 */
function getCatalogBreadcrumbs(
  viewContext:
    | ViewContext<AnVILCatalogConsortium>
    | ViewContext<AnVILCatalogStudy>,
  lastCrumbText?: string
): Breadcrumb[] {
  const { label, route } = viewContext.entityConfig;
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
 * @returns the KeyValuePair value for study dbGapId as a ReactElement.
 */
function getStudyDbGapIdKeyValue(studyAccession: string): ReactElement {
  return C.Link({
    label: studyAccession,
    target: ANCHOR_TARGET.BLANK,
    url: `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${studyAccession}`,
  });
}
