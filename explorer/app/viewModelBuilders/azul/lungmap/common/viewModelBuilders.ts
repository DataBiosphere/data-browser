import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import * as C from "../../../../components";
import { getProjectResponse } from "../../../../components/Project/common/projectTransformer";
import * as MDX from "../../../../content/lungmap";
import { ProjectsResponse } from "../../../../models/responses";
import { ProjectMatrixView } from "../../common/entities";
import {
  groupProjectMatrixViewsBySpecies,
  projectMatrixMapper,
} from "../../hca-dcp/common/projectMatrixMapper";
import {
  getGeneratedMatricesAnatomicalEntityColumnDef,
  getGeneratedMatricesContentDescriptionColumnDef,
  getGeneratedMatricesFileNameColumnDef,
  getGeneratedMatricesFileSizeColumnDef,
  getGeneratedMatricesGenusSpeciesColumnDef,
  getGeneratedMatricesLibraryConstructionMethodColumnDef,
  getGeneratedMatricesMatrixCellCountColumnDef,
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
 * Returns generated matrices actions column def.
 * @returns actions column def.
 */
function getGeneratedMatricesActionsColumnDef<T>(): ColumnDef<T> {
  return {
    accessorKey: "",
    cell: ({ row }) =>
      C.ButtonGroup({
        Buttons: [
          C.FileLocationDownload({
            projectMatrixView: row.original as unknown as ProjectMatrixView,
          }),
          C.FileLocationCopy({
            projectMatrixView: row.original as unknown as ProjectMatrixView,
          }),
        ],
      }),
    header: "Actions",
  };
}
