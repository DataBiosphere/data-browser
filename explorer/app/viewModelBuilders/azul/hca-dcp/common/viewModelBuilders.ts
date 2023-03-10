import {
  Key,
  Value,
} from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { ColumnDef } from "@tanstack/react-table";
import React, { Fragment, ReactElement } from "react";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../../../site-config/hca-dcp/category";
import {
  FilesResponse,
  SamplesResponse,
} from "../../../../apis/azul/hca-dcp/common/responses";
import * as Transformers from "../../../../apis/azul/hca-dcp/common/transformers";
import {
  getProjectMetadataSpecies,
  getProjectsAnatomicalEntityColumn,
  getProjectsCellCountColumn,
  getProjectsDevelopmentStage,
  getProjectsDiseaseDonor,
  getProjectsLibraryConstructionApproachColumn,
  getProjectsTitleName,
  getProjectsTitleUrl,
} from "../../../../apis/azul/hca-dcp/common/transformers";
import * as C from "../../../../components";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { formatCountSize } from "../../../../components/Index/common/utils";
import { getProjectResponse } from "../../../../components/Project/common/projectTransformer";
import * as MDX from "../../../../content/hca-dcp";
import { ProjectsResponse } from "../../../../models/responses";
import { humanFileSize } from "../../../../utils/fileSize";
import {
  ProjectMatrixTableView,
  ProjectMatrixView,
} from "../../common/entities";
import { mapAccessions } from "./accessionMapper/accessionMapper";
import { Accession } from "./accessionMapper/entities";
import {
  groupProjectMatrixViewsBySpecies,
  projectMatrixMapper,
} from "./projectMatrixMapper";

/**
 * Build props for the KeyValuePairs component for displaying the project accessions.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the key value pairs component.
 */
export const buildAccessions = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.KeyValuePairs> => {
  const project = getProjectResponse(projectsResponse);
  const accessionsByLabel = mapAccessions(project?.accessions);
  const keyValuePairs = new Map<Key, Value>();
  for (const [label, accessions] of accessionsByLabel) {
    keyValuePairs.set(`${label}:`, getAccessionsKeyValue(accessions));
  }
  return {
    KeyElType: (props) =>
      C.KeyElType({
        color: "ink.main",
        ...props,
      }),
    KeyValueElType: Fragment,
    KeyValuesElType: (props) =>
      C.Grid({ gap: 1, gridTemplateColumns: "auto 1fr", ...props }),
    ValueElType: (props) =>
      C.GridItem({ display: "flex", flexWrap: "wrap", ...props }),
    keyValuePairs,
  };
};

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
 * Build props for GeneratedMatricesTable component from the given project response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the generated matrices table component.
 */
export const buildDCPGeneratedMatricesTable = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.GeneratedMatricesTables> => {
  const project = getProjectResponse(projectsResponse);
  const projectMatrixViews = projectMatrixMapper(project?.matrices);
  const projectMatrixViewsBySpecies =
    groupProjectMatrixViewsBySpecies(projectMatrixViews);
  return {
    columns: buildDCPGeneratedMatricesTableColumns(),
    gridTemplateColumns:
      "auto minmax(240px, 1fr) repeat(5, minmax(124px, 1fr))",
    projectMatrixViewsBySpecies,
  };
};

/**
 * Build props for ExportMethod component for display of the export to curl command metadata section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportToCurlCommand = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  disabled: false,
  route: "/export",
  title: "Download Study Data and Metadata (Curl Command)",
});

/**
 * Build props for ExportMethod component for display of the export to terra metadata section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportToTerraMetadata = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Analyze in Terra",
  description:
    "Terra is a biomedical research platform to analyze data using workflows, Jupyter Notebooks, RStudio, and Galaxy.",
  disabled: false,
  route: "/export/export-to-terra",
  title: "Export Study Data and Metadata to Terra Workspace",
});

/**
 * Build props for ExportMethod component for display of the export to cavatica metadata section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportToCavaticaMetadata = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Analyze in CAVATICA",
  description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  disabled: false,
  route: "/export",
  title: "Export to CAVATICA",
});

/**
 * Returns grid props for the Grid component.
 * Views render as follows:
 * - mobile view: grid component is ignored and children are rendered as direct children of the next ancestor.
 * - tablet view: 2 columns.
 * - desktop view: 3 columns.
 * @returns model to be used as props for the Grid component.
 */
export const buildTripleColumnGrid = (): React.ComponentProps<
  typeof C.Grid
> => {
  return {
    gridSx: {
      display: { sm: "grid", xs: "contents" },
      gap: 4,
      gridTemplateColumns: { md: "repeat(3, 1fr)", sm: "1fr 1fr" },
    },
  };
};

// Files view builders

/**
 * Build props for FileName component from the given files response.
 * @param file - Response model return from projects API.
 * @returns model to be used as props for the Citation component.
 */
export const filesBuildFileName = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetFileName(file),
  };
};

/**
 * Build props for FileDownload component from the given files response.
 * @param file - Response model return from files API.
 * @returns model to be used as props for the FileDownload component.
 */
export const filesBuildFileDownload = (
  file: FilesResponse
): React.ComponentProps<typeof C.AzulFileDownload> => {
  return {
    url: Transformers.filesGetFileUrl(file),
  };
};

export const filesBuildFileFormat = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetFileFormat(file),
  };
};

export const filesBuildProjTitle = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetProjTitle(file),
  };
};

export const filesBuildFileSize = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetFileSize(file),
  };
};

export const filesBuildContentDesc = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetContentDesc(file),
  };
};

export const filesBuildCellCount = (
  file: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.filesGetCellCount(file),
  };
};

/**
 * Returns the KeyValuePair value for the accessions.
 * @param accessions - Accessions.
 * @returns the KeyValuePair value for the accessions as a ReactElement.
 */
function getAccessionsKeyValue(accessions: Accession[]): ReactElement {
  return C.Links({
    divider: C.Divider({ children: ", " }),
    links: accessions.map(({ id, url }) => {
      return {
        label: id,
        target: ANCHOR_TARGET.BLANK,
        url,
      };
    }),
  });
}

// Samples view builders

export const samplesBuildSampleId = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetSampleId(sample),
  };
};
export const samplesBuildProjTitle = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetProjTitle(sample),
  };
};
export const samplesBuildSpecies = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetSpecies(sample),
  };
};
export const samplesBuildSampleType = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetSampleType(sample),
  };
};
export const samplesBuildLibraryConstructionApproach = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(
      METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
    ),
    values: Transformers.samplesGetLibraryConstructionApproach(sample),
  };
};
export const samplesBuildAnatomicalEntity = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ANATOMICAL_ENTITY),
    values: Transformers.samplesGetAnatomicalEntity(sample),
  };
};
export const samplesBuildDiseaseDonor = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_DONOR),
    values: Transformers.samplesGetDiseaseDonor(sample),
  };
};
export const samplesBuildCellCount = (
  sample: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: Transformers.samplesGetCellCount(sample),
  };
};

/**
 * Build props for the project title cell component from the given projects response.
 * @param project - Response model return from projects API.
 * @returns model to be used as props for the project title cell components.
 */
export const projectsBuildProjectTitleColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: getProjectsTitleName(project),
    url: getProjectsTitleUrl(project),
  };
};

/**
 * Build props for the CellCount component from the given projects response.
 * @param project - Response model return from projects API.
 * @returns model to be used as props for the CellCount component.
 */
export const projectsBuildCellCountColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.Cell> => {
  if (!project.cellSuspensions?.[0]) {
    return {
      value: "",
    };
  }
  return {
    value: getProjectsCellCountColumn(project),
  };
};
/**
 * Build props for the Development stage NTagCell component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the development stage table column.
 */
export const projectsBuildDevelopmentStage = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DEVELOPMENT_STAGE),
    values: getProjectsDevelopmentStage(projectsResponse),
  };
};
/**
 * Build props for the library construction cell component from the given projects response.
 * @param project - Response model return from projects API.
 * @returns model to be used as props for the library construction cell approach cell.
 */
export const projectsBuildLibraryConstructionApproachColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(
      METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
    ),
    values: getProjectsLibraryConstructionApproachColumn(project),
  };
};
/**
 * Build props for the AnatomicalEntity components from the given projects response.
 * @param project - Response model return from projects API.
 * @returns model to be used as props for the AnatomicalEntity component.
 */
export const projectsBuildAnatomicalEntityColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ANATOMICAL_ENTITY),
    values: getProjectsAnatomicalEntityColumn(project),
  };
};
/**
 * Build props for the DiseaseDonor components from the given projects response.
 * @param project - Response model return from projects API.
 * @returns model to be used as props for the Disease (Donor) table column.
 */
export const projectsBuildDiseaseDonorColumn = (
  project: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_DONOR),
    values: getProjectsDiseaseDonor(project),
  };
};
/**
 * Build props for project index species NTagCell component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project index species NTagCell.
 */
export const projectsBuildSpecies = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.SPECIES),
    values: getProjectMetadataSpecies(projectsResponse),
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
 * Builds the table column definition model for the DCP generated matrices table.
 * @returns generated matrices table column definition.
 */
function buildDCPGeneratedMatricesTableColumns<T>(): ColumnDef<T>[] {
  return [
    getGeneratedMatricesActionsColumnDef(),
    getGeneratedMatricesFileNameColumnDef(),
    getGeneratedMatricesContentDescriptionColumnDef(),
    getGeneratedMatricesGenusSpeciesColumnDef(),
    getGeneratedMatricesAnatomicalEntityColumnDef(),
    getGeneratedMatricesLibraryConstructionMethodColumnDef(),
    getGeneratedMatricesFileSizeColumnDef(),
  ];
}

/**
 * Build props for NTagCell component from the given entity and entity key.
 * @param projectMatrixTableView - Project matrix view (by species).
 * @param key - Project matrix view key.
 * @param metadataKey - Metadata key.
 * @returns model to be used as props for the NTagCell component.
 */
function buildNTagCellProps(
  projectMatrixTableView: ProjectMatrixTableView,
  key: string,
  metadataKey: keyof typeof METADATA_KEY
): React.ComponentProps<typeof C.NTagCell> {
  return {
    label: getPluralizedMetadataLabel(metadataKey),
    values: projectMatrixTableView[
      key as keyof ProjectMatrixTableView
    ] as string[],
  };
}

/**
 * Returns matrix cell count formatted by count size.
 * @param matrixCellCount - Matrix cell count.
 * @returns matrix cell count formatted by count size.
 */
function formatMatrixCellCount(matrixCellCount?: number): string {
  return matrixCellCount || matrixCellCount === 0
    ? formatCountSize(matrixCellCount)
    : "-";
}

/**
 * Returns generated matrices actions column def.
 * @returns actions column def.
 */
export function getGeneratedMatricesActionsColumnDef<T>(): ColumnDef<T> {
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

/**
 * Returns generated matrices anatomical entity column def.
 * @returns anatomical entity column def.
 */
export function getGeneratedMatricesAnatomicalEntityColumnDef<
  T
>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.ORGAN,
    cell: ({ column, row }) =>
      C.NTagCell(
        buildNTagCellProps(
          row.original as unknown as ProjectMatrixTableView, // TODO revisit type assertion here
          column.id,
          METADATA_KEY.ANATOMICAL_ENTITY
        )
      ),
    header: HCA_DCP_CATEGORY_LABEL.ANATOMICAL_ENTITY,
  };
}

/**
 * Returns generated matrices content description column def.
 * @returns content description column def.
 */
export function getGeneratedMatricesContentDescriptionColumnDef<
  T
>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION,
    cell: ({ column, row }) =>
      C.NTagCell(
        buildNTagCellProps(
          row.original as unknown as ProjectMatrixTableView, // TODO revisit type assertion here
          column.id,
          METADATA_KEY.CONTENT_DESCRIPTION
        )
      ),
    header: HCA_DCP_CATEGORY_LABEL.CONTENT_DESCRIPTION,
  };
}

/**
 * Returns generated matrices file name column def.
 * @returns file name column def.
 */
export function getGeneratedMatricesFileNameColumnDef<T>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.FILE_NAME,
    cell: ({ getValue, row }) =>
      C.FileNameCell({
        archivePreview: C.FileLocationArchivePreview({
          projectMatrixView: row.original as unknown as ProjectMatrixView,
        }),
        fileName: getValue() as unknown as string,
      }),
    header: HCA_DCP_CATEGORY_LABEL.FILE_NAME,
  };
}

/**
 * Returns generated matrices file size column def.
 * @returns file size method column def.
 */
export function getGeneratedMatricesFileSizeColumnDef<T>(): ColumnDef<T> {
  return {
    accessorKey: "size",
    cell: ({ getValue }) => humanFileSize(getValue() as unknown as number),
    header: HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
  };
}

/**
 * Returns generated matrices genus species column def.
 * @returns genus species column def.
 */
export function getGeneratedMatricesGenusSpeciesColumnDef<T>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.GENUS_SPECIES,
    cell: ({ column, row }) =>
      C.NTagCell(
        buildNTagCellProps(
          row.original as unknown as ProjectMatrixTableView, // TODO revisit type assertion here
          column.id,
          METADATA_KEY.SPECIES
        )
      ),
    header: "Species",
  };
}

/**
 * Returns generated matrices library construction method column def.
 * @returns library construction method column def.
 */
export function getGeneratedMatricesLibraryConstructionMethodColumnDef<
  T
>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD,
    cell: ({ column, row }) =>
      C.NTagCell(
        buildNTagCellProps(
          row.original as unknown as ProjectMatrixTableView, // TODO revisit type assertion here
          column.id,
          METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
        )
      ),
    header: HCA_DCP_CATEGORY_LABEL.LIBRARY_CONSTRUCTION_METHOD,
  };
}

/**
 * Returns generated matrices matrix cell count column def.
 * @returns matrix cell count column def.
 */
export function getGeneratedMatricesMatrixCellCountColumnDef<
  T
>(): ColumnDef<T> {
  return {
    accessorKey: HCA_DCP_CATEGORY_KEY.MATRIX_CELL_COUNT,
    cell: ({ getValue }) =>
      formatMatrixCellCount(getValue() as unknown as number),
    header: HCA_DCP_CATEGORY_LABEL.MATRIX_CELL_COUNT,
  };
}
