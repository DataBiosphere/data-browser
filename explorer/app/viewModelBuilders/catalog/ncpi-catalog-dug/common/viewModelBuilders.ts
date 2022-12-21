import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { NCPI_CATALOG_FILTER_CATEGORY_KEYS } from "../../../../../site-config/ncpi-catalog/filter-category-keys";
import { DugCatalogStudy } from "../../../../apis/catalog/ncpi-catalog-dug/common/entities";
import * as C from "../../../../components";
import {
  Key,
  Value,
} from "../../../../components/common/KeyValuePairs/keyValuePairs";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";

/**
 * Build props for DetailViewTable component from the given Dug entity.
 * @param dugCatalogStudy - Dug catalog entity.
 * @returns Model to be used as props for the detail view table component.
 */
export const buildDetailViewRelatedStudiesTable = (
  dugCatalogStudy: DugCatalogStudy
): React.ComponentProps<typeof C.DetailViewTable> => {
  const { relatedStudies = [] } = dugCatalogStudy;
  return {
    columns: buildTableColumns(),
    gridTemplateColumns: "2fr auto auto 1fr auto 1fr auto",
    items: relatedStudies,
    noResultsTitle: "No Related Studies",
    tools: buildTableToolbarTools(),
  };
};

/**
 * Build props for NTagCell component from the given entity and entity key.
 * @param dugCatalogStudy - Dug catalog study.
 * @param key - Dug catalog study key.
 * @param metadataKey - Metadata key.
 * @returns Model to be used as props for the NTagCell component.
 */
function buildNTagCellProps(
  dugCatalogStudy: DugCatalogStudy,
  key: string,
  metadataKey: keyof typeof METADATA_KEY
): React.ComponentProps<typeof C.NTagCell> {
  return {
    label: getPluralizedMetadataLabel(metadataKey),
    values: dugCatalogStudy[key as keyof DugCatalogStudy] as string[],
  };
}

/**
 * Build props for study name cell component from the given Dug entity.
 * @param dugCatalogStudy - Dug catalog study.
 * @returns Model to be used as props for the study name cell.
 */
function buildStudyTitle(
  dugCatalogStudy: DugCatalogStudy
): React.ComponentProps<typeof C.Link> {
  const { dbGapId, studyAccession, title } = dugCatalogStudy;
  return {
    label: title,
    url: studyAccession ? `/studies/${dbGapId}` : "",
  };
}

/**
 * Builds the table column definition model for the detailed view related studies table.
 * @returns related studies table column definition.
 */
function buildTableColumns<T>(): ColumnDef<T>[] {
  return [
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.TITLE,
      cell: ({ row: { original } }) =>
        C.Link(buildStudyTitle(original as unknown as DugCatalogStudy)), // TODO revisit type assertion here
      header: "Study Title",
    },
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DB_GAP_ID,
      header: "dbGap Id",
    },
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.DATA_TYPE,
      cell: ({ column, row }) =>
        C.NTagCell(
          buildNTagCellProps(
            row.original as unknown as DugCatalogStudy, // TODO revisit type assertion here
            column.id,
            METADATA_KEY.DATA_TYPE
          )
        ),
      header: "Data Type",
    },
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.FOCUS,
      header: "Focus",
    },
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.CONSENT_CODE,
      cell: ({ column, row }) =>
        C.NTagCell(
          buildNTagCellProps(
            row.original as unknown as DugCatalogStudy, // TODO revisit type assertion here
            column.id,
            METADATA_KEY.CONSENT_CODE
          )
        ),
      header: "Consent Code",
    },
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.STUDY_DESIGN,
      header: "Study Design",
    },
    {
      accessorKey: NCPI_CATALOG_FILTER_CATEGORY_KEYS.PARTICIPANT_COUNT,
      cell: ({ getValue }) =>
        (getValue() as unknown as number)?.toLocaleString(),
      header: "Participants",
    },
  ];
}

function buildTableToolbarTools(): JSX.Element {
  const keyValuePairs = new Map<Key, Value>();
  keyValuePairs.set(
    "Related Studies",
    "Dug has identified the following studies as mentioning the selected focus/disease or related term in the study description."
  );
  return C.KeyValuePairs({
    KeyElType: (props) =>
      C.KeyElType({
        color: "ink.main",
        variant: "text-body-large-500",
        ...props,
      }),
    ValueElType: (props) =>
      C.ValueElType({
        color: "ink.light",
        variant: "text-body-400-2lines",
        ...props,
      }),
    keyValuePairs: keyValuePairs,
  });
}
