import { GridPaper } from "@databiosphere/findable-ui/lib/components/common/Paper/paper.styles";
import { Table } from "@databiosphere/findable-ui/lib/components/Detail/components/Table/table";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../../../../../../../site-config/hca-dcp/category";
import { useProjectMatrixArchiveFiles } from "../../../../../../../../hooks/useProjectMatrixArchiveFiles";
import { humanFileSize } from "../../../../../../../../utils/fileSize";
import { ProjectMatrixView } from "../../../../../../../../viewModelBuilders/azul/hca-dcp/common/projectMatrixMapper/entities";
import { FileNameCell } from "../../../FileNameCell/fileNameCell";
import { ArchivePreviewNotAvailable as PreviewNotAvailable } from "./archivePreviewTable.styles";
import { TYPOGRAPHY_PROPS } from "@databiosphere/findable-ui/lib/styles/common/mui/typography";

export type SetLoadingFn = Dispatch<SetStateAction<boolean>>;

export interface ArchivePreviewTableProps {
  projectMatrixView: ProjectMatrixView;
  setLoading: SetLoadingFn;
}

/**
 * Builds the table column definition model for the archive preview table.
 * @returns archive preview table column definition.
 */
function getArchivePreviewTableColumns<
  T extends RowData,
  TData = unknown,
>(): ColumnDef<T, TData>[] {
  return [
    {
      accessorKey: HCA_DCP_CATEGORY_KEY.FILE_NAME,
      cell: ({ getValue }) =>
        FileNameCell({ fileName: getValue() as unknown as string }),
      header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
    },
    {
      accessorKey: HCA_DCP_CATEGORY_KEY.MODIFIED,
      header: HCA_DCP_CATEGORY_LABEL.MODIFIED,
    },
    {
      accessorKey: HCA_DCP_CATEGORY_KEY.FILE_SIZE,
      cell: ({ getValue }) => humanFileSize(getValue() as unknown as number),
      header: HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
    },
  ];
}

export const ArchivePreviewTable = ({
  projectMatrixView,
  setLoading,
}: ArchivePreviewTableProps): JSX.Element => {
  const { archiveFiles, isLoading, isSuccess } =
    useProjectMatrixArchiveFiles(projectMatrixView);
  const isArchiveFiles = archiveFiles && archiveFiles.length > 0;

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <>
      {isArchiveFiles && isSuccess ? (
        <GridPaper>
          <Table
            columns={getArchivePreviewTableColumns()}
            gridTemplateColumns={"1fr auto auto"}
            items={archiveFiles}
            tableView={{
              table: {
                stickyHeader: true,
              },
              tableCell: {
                size: "small",
              },
              tableContainer: {
                sx: { maxHeight: 375 }, // ~6.5 rows at 49px per row (includes 1px gap between each row), plus header row.
              },
            }}
          />
        </GridPaper>
      ) : (
        <PreviewNotAvailable variant={TYPOGRAPHY_PROPS.VARIANT.BODY_400}>
          Preview not available.
        </PreviewNotAvailable>
      )}
    </>
  );
};
