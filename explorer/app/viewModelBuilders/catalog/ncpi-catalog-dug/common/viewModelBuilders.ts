import {
  Key,
  Value,
} from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
  NCPI_CATALOG_CATEGORY_KEY,
  NCPI_CATALOG_CATEGORY_LABEL,
} from "../../../../../site-config/ncpi-catalog/category";
import { DugCatalogStudy } from "../../../../apis/catalog/ncpi-catalog-dug/common/entities";
import * as C from "../../../../components";
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
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.TITLE,
      cell: ({ row: { original } }) =>
        C.Link(buildStudyTitle(original as unknown as DugCatalogStudy)), // TODO revisit type assertion here
      header: "Study Title", // TODO revisit name
    },
    {
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.DB_GAP_ID,
      header: NCPI_CATALOG_CATEGORY_LABEL.DB_GAP_ID,
    },
    {
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.DATA_TYPE,
      cell: ({ column, row }) =>
        C.NTagCell(
          buildNTagCellProps(
            row.original as unknown as DugCatalogStudy, // TODO revisit type assertion here
            column.id,
            METADATA_KEY.DATA_TYPE
          )
        ),
      header: NCPI_CATALOG_CATEGORY_LABEL.DATA_TYPE,
    },
    {
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.FOCUS,
      header: "Focus", // TODO revisit header
    },
    {
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.CONSENT_CODE,
      cell: ({ column, row }) =>
        C.NTagCell(
          buildNTagCellProps(
            row.original as unknown as DugCatalogStudy, // TODO revisit type assertion here
            column.id,
            METADATA_KEY.CONSENT_CODE
          )
        ),
      header: NCPI_CATALOG_CATEGORY_LABEL.CONSENT_CODE,
    },
    {
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.STUDY_DESIGN,
      header: NCPI_CATALOG_CATEGORY_LABEL.STUDY_DESIGN,
    },
    {
      accessorKey: NCPI_CATALOG_CATEGORY_KEY.PARTICIPANT_COUNT,
      cell: ({ getValue }) =>
        (getValue() as unknown as number)?.toLocaleString(),
      header: NCPI_CATALOG_CATEGORY_LABEL.PARTICIPANT_COUNT,
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
