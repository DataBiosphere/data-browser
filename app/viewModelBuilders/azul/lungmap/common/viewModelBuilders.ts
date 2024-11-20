import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../../../site-config/hca-dcp/category";
import { ProjectsResponse } from "../../../../apis/azul/hca-dcp/common/responses";
import * as C from "../../../../components";
import * as MDX from "../../../../components/common/MDXContent/lungmap";
import { Void } from "../../../common/entities";
import {
  groupProjectMatrixViewsBySpecies,
  projectMatrixMapper,
} from "../../hca-dcp/common/projectMatrixMapper/projectMatrixMapper";
import {
  buildDownloadCurlCommand as buildHCADownloadCurlCommand,
  buildDownloadEntityCurlCommand as buildHCADownloadEntityCurlCommand,
  buildExportToTerra as buildHCAExportToTerra,
  buildManifestDownload as buildHCAManifestDownload,
  getGeneratedMatricesActionsColumnDef,
  getGeneratedMatricesAnatomicalEntityColumnDef,
  getGeneratedMatricesContentDescriptionColumnDef,
  getGeneratedMatricesFileSizeColumnDef,
  getGeneratedMatricesGenusSpeciesColumnDef,
  getGeneratedMatricesLibraryConstructionMethodColumnDef,
  getGeneratedMatricesMatrixCellCountColumnDef,
  getProjectResponse,
} from "../../hca-dcp/common/viewModelBuilders";

/**
 * Build props for GeneratedMatricesTable component from the given project response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the GeneratedMatricesTables component.
 */
export const buildContributorGeneratedMatricesTable = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.GeneratedMatricesTables> => {
  const project = getProjectResponse(projectsResponse);
  const projectMatrixViews = projectMatrixMapper(project?.contributedAnalyses);
  const projectMatrixViewsBySpecies =
    groupProjectMatrixViewsBySpecies(projectMatrixViews);
  return {
    columns: buildContributorGeneratedMatricesTableColumns(),
    gridTemplateColumns:
      "auto minmax(240px, 1fr) repeat(6, minmax(124px, 1fr))",
    projectMatrixViewsBySpecies,
  };
};

/**
 * Builds the table column definition model for the contributor generated matrices table.
 * @returns generated matrices table column definition.
 */
function buildContributorGeneratedMatricesTableColumns<T>(): ColumnDef<T>[] {
  return [
    getGeneratedMatricesActionsColumnDef(),
    getGeneratedMatricesFileNameColumnDef(),
    getGeneratedMatricesContentDescriptionColumnDef(),
    getGeneratedMatricesGenusSpeciesColumnDef(),
    getGeneratedMatricesAnatomicalEntityColumnDef(),
    getGeneratedMatricesLibraryConstructionMethodColumnDef(),
    getGeneratedMatricesFileSizeColumnDef(),
    getGeneratedMatricesMatrixCellCountColumnDef(),
  ];
}

/**
 * Build props for DownloadCurlCommand component.
 * @param _ - Void.
 * @param viewContext - View context.
 * @returns model to be used as props for the DownloadCurlCommand component.
 */
export const buildDownloadCurlCommand = (
  _: Void,
  viewContext?: ViewContext<Void>
): React.ComponentProps<typeof C.DownloadCurlCommand> => {
  return {
    ...buildHCADownloadCurlCommand(_, viewContext as ViewContext<Void>),
    DownloadCurlSuccess: MDX.DownloadCurlCommandSuccess,
  };
};

/**
 * Build props for DownloadCurlCommand component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @param viewContext - View context.
 * @returns model to be used as props for the DownloadCurlCommand component.
 */
export const buildDownloadEntityCurlCommand = (
  projectsResponse: ProjectsResponse,
  viewContext: ViewContext<ProjectsResponse>
): React.ComponentProps<typeof C.DownloadCurlCommand> => {
  return {
    ...buildHCADownloadEntityCurlCommand(projectsResponse, viewContext),
    DownloadCurlSuccess: MDX.DownloadCurlCommandSuccess,
  };
};

/**
 * Build props for ExportToTerra component.
 * @param _ - Void.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportToTerra component.
 */
export const buildExportToTerra = (
  _: Void,
  viewContext?: ViewContext<Void>
): React.ComponentProps<typeof C.ExportToTerra> => {
  return {
    ...buildHCAExportToTerra(_, viewContext as ViewContext<Void>),
    ExportToTerraStart: MDX.ExportToTerraStart,
    ExportToTerraSuccess: MDX.ExportToTerraSuccessWithWarning,
  };
};

/**
 * Build props for ManifestDownload component.
 * @param _ - Void.
 * @param viewContext - View context.
 * @returns model to be used as props for the ManifestDownload component.
 */
export const buildManifestDownload = (
  _: Void,
  viewContext?: ViewContext<Void>
): React.ComponentProps<typeof C.ManifestDownload> => {
  return {
    ...buildHCAManifestDownload(_, viewContext as ViewContext<Void>),
    ManifestDownloadSuccess: MDX.ManifestDownloadSuccess,
  };
};

/**
 * Returns grid props for the Grid component.
 * Views render as follows:
 * - mobile view: grid component is ignored and children are rendered as direct children of the next ancestor.
 * - tablet view: 2 columns.
 * - desktop view: 3 columns.
 * @returns model to be used as props for the Grid component.
 */
export const buildTripleColumnGrid = (): Partial<
  React.ComponentProps<typeof C.Grid>
> => {
  return {
    gridSx: {
      display: { sm: "grid", xs: "contents" },
      gap: 4,
      gridTemplateColumns: { md: "repeat(3, 1fr)", sm: "1fr 1fr" },
    },
  };
};

/**
 * Returns generated matrices file name column def.
 * @returns file name column def.
 */
function getGeneratedMatricesFileNameColumnDef<T>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.FILE_NAME,
    cell: ({ getValue }) =>
      C.FileNameCell({ fileName: getValue() as unknown as string }),
    header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
    meta: {
      columnPinned: true,
    },
  };
}
