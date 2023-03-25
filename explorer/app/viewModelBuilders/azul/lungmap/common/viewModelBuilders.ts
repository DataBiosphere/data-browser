import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../../../site-config/hca-dcp/category";
import { ProjectsResponse } from "../../../../apis/azul/hca-dcp/common/responses";
import * as C from "../../../../components";
import * as MDX from "../../../../content/lungmap";
import {
  groupProjectMatrixViewsBySpecies,
  projectMatrixMapper,
} from "../../hca-dcp/common/projectMatrixMapper/projectMatrixMapper";
import {
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
 * Build props for the data normalization and batch correction alert component.
 * @returns model to be used as props for the alert component.
 */
export const buildBatchCorrectionWarning = (): React.ComponentProps<
  typeof C.Alert
> => {
  return {
    children: MDX.RenderComponent({ Component: MDX.BatchCorrectionWarning }),
    severity: "warning",
    title: "Please note",
  };
};

/**
 * Build props for GeneratedMatricesTable component from the given project response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the contributor generated matrices table component.
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
 * Returns generated matrices file name column def.
 * @returns file name column def.
 */
function getGeneratedMatricesFileNameColumnDef<T>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.FILE_NAME,
    cell: ({ getValue }) =>
      C.FileNameCell({ fileName: getValue() as unknown as string }),
    header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
  };
}
