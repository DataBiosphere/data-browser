import {
  LABEL,
  MANIFEST_DOWNLOAD_FORMAT,
} from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import {
  Filters,
  SelectedFilter,
} from "@clevercanary/data-explorer-ui/lib/common/entities";
import { Breadcrumb } from "@clevercanary/data-explorer-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import {
  Key,
  KeyValueFn,
  Value,
} from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import {
  FileSummaryFacet,
  FileSummaryTerm,
  FormFacet,
} from "@clevercanary/data-explorer-ui/lib/components/Export/common/entities";
import { CurrentQuery } from "@clevercanary/data-explorer-ui/lib/components/Export/components/ExportSummary/components/ExportCurrentQuery/exportCurrentQuery";
import { Summary } from "@clevercanary/data-explorer-ui/lib/components/Export/components/ExportSummary/components/ExportSelectedDataSummary/exportSelectedDataSummary";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { getConfig } from "@clevercanary/data-explorer-ui/lib/config/config";
import { ViewContext } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  FileFacet,
  FILE_MANIFEST_TYPE,
} from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/entities";
import {
  findFacet,
  isFacetTermSelected,
  sortTerms,
} from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/utils";
import { FileManifestState } from "@clevercanary/data-explorer-ui/lib/providers/fileManifestState";
import {
  TEXT_BODY_400,
  TEXT_BODY_400_2_LINES,
} from "@clevercanary/data-explorer-ui/lib/theme/common/typography";
import { formatCountSize } from "@clevercanary/data-explorer-ui/lib/utils/formatCountSize";
import { CategoryKeyLabel } from "@clevercanary/data-explorer-ui/lib/viewModelBuilders/common/entities";
import {
  mapCategoryKeyLabel,
  sanitizeString,
} from "@clevercanary/data-explorer-ui/lib/viewModelBuilders/common/utils";
import { ColumnDef } from "@tanstack/react-table";
import React, { ElementType, Fragment, ReactElement } from "react";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../../../site-config/hca-dcp/category";
import { PROJECTS_URL } from "../../../../../site-config/hca-dcp/dev/config";
import {
  ROUTE_BULK_DOWNLOAD,
  ROUTE_EXPORT_TO_TERRA,
  ROUTE_MANIFEST_DOWNLOAD,
} from "../../../../../site-config/hca-dcp/dev/export/constants";
import {
  processAggregatedOrArrayValue,
  processEntityArrayValue,
  processEntityValue,
  processNumberEntityValue,
} from "../../../../apis/azul/common/utils";
import { ProjectResponse } from "../../../../apis/azul/hca-dcp/common/entities";
import {
  EntityResponse,
  FilesResponse,
  ProjectsResponse,
  SamplesResponse,
  SummaryResponse,
} from "../../../../apis/azul/hca-dcp/common/responses";
import * as C from "../../../../components";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import * as MDX from "../../../../content/hca-dcp";
import { humanFileSize } from "../../../../utils/fileSize";
import { Unused } from "../../../common/entities";
import { mapAccessions } from "./accessionMapper/accessionMapper";
import { Accession } from "./accessionMapper/entities";
import { DATA_SUMMARY_DISPLAY_TEXT } from "./dataSummaryMapper/constants";
import { mapProjectDataSummary } from "./dataSummaryMapper/dataSummaryMapper";
import { AnalysisPortal } from "./projectMapper/projectEdits/entities";
import {
  mapProjectAnalysisPortals,
  mapProjectCollaboratingOrganizations,
  mapProjectContacts,
  mapProjectContributors,
  mapProjectDataCurators,
  mapProjectPublications,
  mapProjectSupplementaryLinks,
} from "./projectMapper/projectMapper";
import {
  ProjectMatrixTableView,
  ProjectMatrixView,
} from "./projectMatrixMapper/entities";
import {
  groupProjectMatrixViewsBySpecies,
  projectMatrixMapper,
} from "./projectMatrixMapper/projectMatrixMapper";
import { SUMMARY_DISPLAY_TEXT } from "./summaryMapper/constants";
import { FileTypeSummary, SUMMARY } from "./summaryMapper/entities";
import {
  bindFileSummaryResponse,
  mapExportSummary,
} from "./summaryMapper/summaryMapper";

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
 * Build props for the project title Link component from the given entity response.
 * @param entityResponse - Response model return from the entity response API.
 * @returns model to be used as props for the project title Link component.
 */
export const buildAggregatedProjectTitle = (
  entityResponse: FilesResponse | SamplesResponse
): React.ComponentProps<typeof C.Link> => {
  // Always take the first value in the returned aggregated project title array.
  return {
    label: takeArrayValueAt(
      processEntityArrayValue(
        entityResponse.projects,
        HCA_DCP_CATEGORY_KEY.PROJECT_TITLE
      )
    ),
    url: getAggregatedProjectTitleUrl(entityResponse),
  };
};

/**
 * Build props for analysis portals component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the analysis portals component.
 */
export const buildAnalysisPortals = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.KeyValuePairs> => {
  const project = getProjectResponse(projectsResponse);
  const analysisPortals = mapProjectAnalysisPortals(project);
  const keyValuePairs = getAnalysisPortalsKeyValuePairs(analysisPortals);
  const KeyValueElType = getAnalysisPortalsKeyValueElType(analysisPortals);
  return {
    KeyElType: Fragment,
    KeyValueElType,
    KeyValuesElType: Fragment,
    ValueElType: (props) =>
      C.ValueElType({
        variant: analysisPortals ? TEXT_BODY_400 : TEXT_BODY_400_2_LINES,
        ...props,
      }),
    keyValuePairs,
  };
};

/**
 * Build props for the data normalization and batch correction alert component.
 * @returns model to be used as props for the alert component.
 */
export const buildBatchCorrectionWarning = (): React.ComponentProps<
  typeof C.FluidAlert
> => {
  return {
    children: MDX.RenderComponent({ Component: MDX.BatchCorrectionWarning }),
    severity: "warning",
    title: "Please note",
  };
};

/**
 * Build props for project citation component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project citation component.
 */
export const buildCitation = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Citation> => {
  const { browserURL } = getConfig();
  const projectId = processEntityValue(
    projectsResponse.projects,
    "projectId",
    LABEL.EMPTY
  );
  return {
    projectPath: projectId ? projectId : undefined,
    url: browserURL ? `${browserURL}/explore/projects/` : undefined,
  };
};

/**
 * Build props for project collaborating organizations component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project collaborating organizations component.
 */
export const buildCollaboratingOrganizations = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.CollaboratingOrganizations> => {
  const project = getProjectResponse(projectsResponse);
  return {
    collaboratingOrganizations: mapProjectCollaboratingOrganizations(project),
  };
};

/**
 * Build props for project contacts component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project contacts component.
 */
export const buildContacts = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Contacts> => {
  const project = getProjectResponse(projectsResponse);
  return {
    contacts: mapProjectContacts(project),
  };
};

/**
 * Build props for content description NTagCell component from the given files response.
 * @param filesResponse - Response model return from files API.
 * @returns model to be used as props for the content description NTagCell component.
 */
export const buildContentDescriptions = (
  filesResponse: FilesResponse
): React.ComponentProps<typeof C.NTagCell> => {
  // Always take the first value in the files array.
  // This is a summary value and there should only ever be single value here.
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.CONTENT_DESCRIPTION),
    values: processEntityArrayValue(
      filesResponse.files,
      HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION
    ),
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
    columns: getContributorGeneratedMatricesTableColumns(),
    gridTemplateColumns:
      "auto minmax(240px, 1fr) repeat(6, minmax(124px, 1fr))",
    projectMatrixViewsBySpecies,
  };
};

/**
 * Build props for project contributors component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project contributors component.
 */
export const buildContributors = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Contributors> => {
  const project = getProjectResponse(projectsResponse);
  return {
    contributors: mapProjectContributors(project),
  };
};

/**
 * Build props for project data curators component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project data curators component.
 */
export const buildDataCurators = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.DataCurators> => {
  const project = getProjectResponse(projectsResponse);
  return {
    dataCurators: mapProjectDataCurators(project),
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
    columns: getDCPGeneratedMatricesTableColumns(),
    gridTemplateColumns:
      "auto minmax(240px, 1fr) repeat(5, minmax(124px, 1fr))",
    projectMatrixViewsBySpecies,
  };
};

/**
 * Build props for project description component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project description component.
 */
export const buildDescription = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Description> => {
  return {
    projectDescription: processEntityValue(
      projectsResponse.projects,
      "projectDescription",
      LABEL.NONE
    ),
  };
};

/**
 * Build props for project details component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project details component.
 */
export const buildDetails = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Details> => {
  const keyValuePairs = new Map<Key, Value>();
  for (const [key, value] of mapProjectDataSummary(projectsResponse)) {
    keyValuePairs.set(DATA_SUMMARY_DISPLAY_TEXT[key], value);
  }
  return {
    keyValuePairs,
    title: "Project Details",
  };
};

/**
 * Build props for development stage NTagCell component from the given entity response.
 * @param entityResponse - Response model return from the given entity API.
 * @returns model to be used as props for the development stage NTagCell component.
 */
export const buildDevelopmentStages = (
  entityResponse: EntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DEVELOPMENT_STAGE),
    values: processAggregatedOrArrayValue(
      entityResponse.donorOrganisms,
      HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE
    ),
  };
};

/**
 * Build props for the donor disease "Disease (Donor)" NTagCell component from the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns model to be used as props for the donor disease "Disease (Donor)" NTagCell component.
 */
export const buildDonorDisease = (
  entityResponse: EntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_DONOR),
    values: processAggregatedOrArrayValue(
      entityResponse.donorOrganisms,
      "disease"
    ),
  };
};

/**
 * Build props for DownloadCurlCommand component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the DownloadCurlCommand component.
 */
export const buildDownloadCurlCommand = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.DownloadCurlCommand> => {
  const {
    exploreState: { filterState },
    fileManifestState,
  } = viewContext;
  // Get the form facets.
  const formFacet = getFormFacets(fileManifestState);
  return {
    DownloadCurlForm: C.DownloadCurlCommandForm,
    DownloadCurlStart: MDX.DownloadCurlCommandStart,
    DownloadCurlSuccess: MDX.DownloadCurlCommandSuccess,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.BULK_DOWNLOAD,
    fileSummaryFacetName: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
    filters: filterState,
    formFacet,
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
  viewContext: ViewContext
): React.ComponentProps<typeof C.DownloadCurlCommand> => {
  const { fileManifestState } = viewContext;
  // Get the initial filters.
  const filters = getExportEntityFilters(projectsResponse);
  // Get the form facets.
  const formFacet = getFormFacets(fileManifestState);
  return {
    DownloadCurlForm: C.DownloadCurlCommandForm,
    DownloadCurlStart: MDX.DownloadCurlCommandStart,
    DownloadCurlSuccess: MDX.DownloadCurlCommandSuccess,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.ENTITY_BULK_DOWNLOAD,
    fileSummaryFacetName: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
    filters,
    formFacet,
  };
};

/**
 * Build props for "Cell Count Estimate" Cell component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the "Cell Count Estimate" Cell component.
 */
export const buildEstimateCellCount = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getEstimatedCellCount(projectsResponse),
  };
};

/**
 * Build props for ExportCurrentQuery component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportCurrentQuery component.
 */
export const buildExportCurrentQuery = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.ExportCurrentQuery> => {
  const {
    fileManifestState: { filesFacets, filters, isFacetsLoading },
  } = viewContext;
  return {
    isLoading: isFacetsLoading,
    queries: getExportCurrentQueries(filters, filesFacets),
  };
};

/**
 * Build props for ExportToTerra component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportToTerra component.
 */
export const buildExportEntityToTerra = (
  projectsResponse: ProjectsResponse,
  viewContext: ViewContext
): React.ComponentProps<typeof C.ExportToTerra> => {
  const { fileManifestState } = viewContext;
  // Get the initial filters.
  const filters = getExportEntityFilters(projectsResponse);
  // Get the form facets.
  const formFacet = getFormFacets(fileManifestState);
  return {
    ExportForm: C.ExportToTerraForm,
    ExportToTerraStart: MDX.ExportToTerra,
    ExportToTerraSuccess: MDX.ExportToTerraSuccess,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.ENITY_EXPORT_TO_TERRA,
    fileSummaryFacetName: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
    filters,
    formFacet,
    manifestDownloadFormat: MANIFEST_DOWNLOAD_FORMAT.TERRA_PFB,
    manifestDownloadFormats: [MANIFEST_DOWNLOAD_FORMAT.TERRA_PFB],
  };
};

/**
 * Build props for export Hero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the export Hero component.
 */
export function buildExportHero(
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.BackPageHero> {
  const { exploreState } = viewContext;
  const { tabValue } = exploreState || {};
  return {
    breadcrumbs: [
      { path: `/${tabValue}`, text: "Explore" },
      { path: "", text: "Export Selected Data" },
    ],
    title: "Choose Export Method",
  };
}

/**
 * Build props for ExportMethod component for display of the download to curl command section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportMethodBulkDownload = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  disabled: false,
  route: ROUTE_BULK_DOWNLOAD,
  title: "Download Study Data and Metadata (Curl Command)",
});

/**
 * Build props for download curl command Hero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Hero component.
 */
export const buildExportMethodHeroCurlCommand = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = 'Download Selected Data Using "curl"';
  const {
    exploreState: { tabValue },
  } = viewContext;
  return getExportMethodHero(tabValue, title);
};

/**
 * Build props for manifest download Hero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Hero component.
 */
export const buildExportMethodHeroManifestDownload = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "Request File Manifest";
  const {
    exploreState: { tabValue },
  } = viewContext;
  return getExportMethodHero(tabValue, title);
};

/**
 * Build props for export to terra Hero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Hero component.
 */
export const buildExportMethodHeroTerra = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "Export to Terra";
  const {
    exploreState: { tabValue },
  } = viewContext;
  return getExportMethodHero(tabValue, title);
};

/**
 * Build props for ExportMethod component for display of the manifest download section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportMethodManifestDownload = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Request File Manifest",
  description:
    "Request a file manifest for the current query containing the full list of selected files and the metadata for each file.",
  disabled: false,
  route: ROUTE_MANIFEST_DOWNLOAD,
  title: "Download a File Manifest with Metadata for the Selected Data",
});

/**
 * Build props for ExportMethod component for display of the export to terra section.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportMethodTerra = (): React.ComponentProps<
  typeof C.ExportMethod
> => ({
  buttonLabel: "Analyze in Terra",
  description:
    "Terra is a biomedical research platform to analyze data using workflows, Jupyter Notebooks, RStudio, and Galaxy.",
  disabled: false,
  route: ROUTE_EXPORT_TO_TERRA,
  title: "Export Study Data and Metadata to Terra Workspace",
});

/**
 * Build props for ExportSelectedDataSummary component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportSelectedDataSummary component.
 */
export const buildExportSelectedDataSummary = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.ExportSelectedDataSummary> => {
  const {
    fileManifestState: {
      filesFacets,
      isFacetsLoading,
      isSummaryLoading,
      summary,
    },
  } = viewContext;
  return {
    isLoading: isFacetsLoading || isSummaryLoading,
    summaries: getExportSelectedDataSummary(filesFacets, summary),
  };
};

/**
 * Build props for ExportToTerra component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportToTerra component.
 */
export const buildExportToTerra = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.ExportToTerra> => {
  const {
    exploreState: { filterState },
    fileManifestState,
  } = viewContext;
  // Get the form facets.
  const formFacet = getFormFacets(fileManifestState);
  return {
    ExportForm: C.ExportToTerraForm,
    ExportToTerraStart: MDX.ExportToTerraStart,
    ExportToTerraSuccess: MDX.ExportToTerraSuccessWithWarning,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.EXPORT_TO_TERRA,
    fileSummaryFacetName: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
    filters: filterState,
    formFacet,
    manifestDownloadFormat: MANIFEST_DOWNLOAD_FORMAT.TERRA_PFB,
    manifestDownloadFormats: [MANIFEST_DOWNLOAD_FORMAT.TERRA_PFB],
  };
};

/**
 * Build props for the KeyValuePairs component for displaying project file counts from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the key value pairs component.
 */
export const buildFileCounts = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.KeyValuePairs> => {
  return {
    KeyValueElType: Fragment,
    KeyValuesElType: (props) =>
      C.Grid({
        gridSx: {
          alignSelf: "stretch",
          gap: 2,
          gridTemplateColumns: "1fr auto",
        },
        ...props,
      }),
    keyValuePairs: getFileCountsKeyValuePairs(projectsResponse),
  };
};

/**
 * Build props for AzulFileDownload component from the given files response.
 * @param filesResponse - Response model return from files API.
 * @returns model to be used as props for the AzulFileDownload component.
 */
export const buildFileDownload = (
  filesResponse: FilesResponse
): React.ComponentProps<typeof C.AzulFileDownload> => {
  // Always take the first value in the files array.
  // This is a summary value and there should only ever be single value here.
  return {
    url: processEntityValue(filesResponse.files, "url", LABEL.EMPTY),
  };
};

/**
 * Build props for file format Cell component from the given files response.
 * @param filesResponse - Response model return from files API.
 * @returns model to be used as props for the file format Cell component.
 */
export const buildFileFormat = (
  filesResponse: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  // Always take the first value in the files array.
  // This is a summary value and there should only ever be single value here.
  return {
    value: processEntityValue(filesResponse.files, "format", LABEL.EMPTY),
  };
};

/**
 * Build props for file name Cell component from the given files response.
 * @param filesResponse - Response model return from files API.
 * @returns model to be used as props for the file name Cell component.
 */
export const buildFileName = (
  filesResponse: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  // Always take the first value in the files array.
  // This is a summary value and there should only ever be single value here.
  return {
    value: processEntityValue(filesResponse.files, "name", LABEL.EMPTY),
  };
};

/**
 * Build props for file size Cell component from the given files response.
 * @param filesResponse - Response model return from files API.
 * @returns model to be used as props for the file size Cell component.
 */
export const buildFileSize = (
  filesResponse: FilesResponse
): React.ComponentProps<typeof C.Cell> => {
  // Always take the first value in the files array.
  // This is a summary value and there should only ever be single value here.
  return {
    value: humanFileSize(processNumberEntityValue(filesResponse.files, "size")),
  };
};

/**
 * Returns the export selected data summary for the given file manifest.
 * @param filesFacets - Files facets.
 * @param summary - Response model return from summary API.
 * @returns export selected data summary.
 */
export function getExportSelectedDataSummary(
  filesFacets: FileFacet[],
  summary?: SummaryResponse
): Summary[] {
  return [...mapExportSummary(filesFacets, summary)].map(([key, value]) => [
    SUMMARY_DISPLAY_TEXT[key as SUMMARY] || key,
    value,
  ]);
}

/**
 * Build props for genus species NTagCell component from the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns model to be used as props for the genus species NTagCell component.
 */
export const buildGenusSpecies = (
  entityResponse: EntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.SPECIES),
    values: processAggregatedOrArrayValue(
      entityResponse.donorOrganisms,
      HCA_DCP_CATEGORY_KEY.GENUS_SPECIES
    ),
  };
};

/**
 * Build props for project Hero component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project Hero component.
 */
export const buildHero = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  return {
    breadcrumbs: getProjectBreadcrumbs(projectsResponse),
    title: processEntityValue(projectsResponse.projects, "projectTitle"),
  };
};

/**
 * Build props for the library construction approach NTagCell component from the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns model to be used as props for the library construction cell approach NTagCell component.
 */
export const buildLibraryConstructionApproach = (
  entityResponse: EntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(
      METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
    ),
    values: processAggregatedOrArrayValue(
      entityResponse.protocols,
      HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD
    ),
  };
};

/**
 * Build props for ManifestDownload component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ManifestDownload component.
 */
export const buildManifestDownload = (
  _: Unused,
  viewContext: ViewContext
): React.ComponentProps<typeof C.ManifestDownload> => {
  const {
    exploreState: { filterState },
    fileManifestState,
  } = viewContext;
  // Get the form facets.
  const formFacet = getFormFacets(fileManifestState);
  return {
    ManifestDownloadForm: C.ManifestDownloadForm,
    ManifestDownloadStart: MDX.ManifestDownloadStart,
    ManifestDownloadSuccess: MDX.ManifestDownloadSuccess,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.DOWNLOAD_MANIFEST,
    fileSummaryFacetName: HCA_DCP_CATEGORY_KEY.FILE_FORMAT,
    filters: filterState,
    formFacet,
  };
};

/*
 * Build props for ManifestDownloadEntity component.
 * @param projectsResponse - Response model return from the entity response API.
 * @returns model to be used as props for the ManifestDownloadEntity component.
 */
export const buildManifestDownloadEntity = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.ManifestDownloadEntity> => {
  // Get the initial filters.
  const filters = getExportEntityFilters(projectsResponse);
  // Get the metadata filters.
  const metadataFilters = getMetadataFilters(filters);
  return {
    fileManifestType: FILE_MANIFEST_TYPE.ENTITY_DOWNLOAD_MANIFEST,
    filters,
    metadataFilters,
  };
};

/**
 * Build props for the project title Link component from the given entity response.
 * @param projectsResponse - Response model return from the entity response API.
 * @returns model to be used as props for the project title Link component.
 */
export const buildProjectTitle = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: processEntityValue(
      projectsResponse.projects,
      HCA_DCP_CATEGORY_KEY.PROJECT_TITLE
    ),
    url: getProjectTitleUrl(projectsResponse),
  };
};

/**
 * Build props for project publications component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project publications component.
 */
export const buildPublications = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.Publications> => {
  const project = getProjectResponse(projectsResponse);
  return {
    publications: mapProjectPublications(project),
  };
};

/**
 * Build props for sample entity type Cell component from the given sample response.
 * @param samplesResponse - Response model return from samples API.
 * @returns model to be used as props for the sample entity type Cell component.
 */
export const buildSampleEntityType = (
  samplesResponse: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: processEntityValue(samplesResponse.samples, "sampleEntityType"),
  };
};

/**
 * Build props for sample identifier Cell component from the given sample response.
 * @param samplesResponse - Response model return from samples API.
 * @returns model to be used as props for the sample identifier Cell component.
 */
export const buildSampleId = (
  samplesResponse: SamplesResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: processEntityValue(samplesResponse.samples, "id"),
  };
};

/**
 * Build props for the specimen organ "Anatomical Entity" NTagCell component from the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns model to be used as props for the specimen organ "Anatomical Entity" NTagCell component.
 */
export const buildSpecimenOrgan = (
  entityResponse: EntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ANATOMICAL_ENTITY),
    values: processAggregatedOrArrayValue(
      entityResponse.specimens,
      HCA_DCP_CATEGORY_KEY.ORGAN
    ),
  };
};

/**
 * Build props for project supplementary links component from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns model to be used as props for the project supplementary links component.
 */
export const buildSupplementaryLinks = (
  projectsResponse: ProjectsResponse
): React.ComponentProps<typeof C.SupplementaryLinks> => {
  const project = getProjectResponse(projectsResponse);
  return {
    supplementaryLinks: mapProjectSupplementaryLinks(project),
  };
};

/**
 * Build props for total cells "Cell Count Estimate" Cell component from the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns model to be used as props for the total cells "Cell Count Estimate" Cell component.
 */
export const buildTotalCells = (
  entityResponse: EntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getCellSuspensionTotalCells(entityResponse),
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

/**
 * Calculate the estimated cell count from the given projects response.
 * Returns the estimated cell count, if any, otherwise the totalCell value from cellSuspensions.
 * @param projectsResponse - Response model return from projects API.
 * @returns estimated cell count.
 */
function calculateEstimatedCellCount(
  projectsResponse: ProjectsResponse
): number | null {
  const estimatedCellCount =
    getProjectResponse(projectsResponse).estimatedCellCount;
  // If there's an estimated cell count for the project, return it as the cell count.
  if (estimatedCellCount) {
    return estimatedCellCount;
  }
  // Otherwise, return the cell suspension total count.
  return rollUpTotalCells(projectsResponse);
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

/**
 * Returns the project detailed page url from the given entity response.
 * @param response - Response model return from entity API.
 * @returns project detail page url.
 */
function getAggregatedProjectTitleUrl(
  response: FilesResponse | SamplesResponse
): string {
  // Always take the first value in the returned aggregated project identifier array.
  return `/projects/${takeArrayValueAt(
    processEntityArrayValue(response.projects, "projectId")
  )}`;
}

/**
 * Returns the KeyValuePair key for the specified analysis portal.
 * @param analysisPortal - Analysis portal.
 * @returns the KeyValuePair key for analysis portal icon as a ReactElement.
 */
function getAnalysisPortalKey(analysisPortal: AnalysisPortal): ReactElement {
  const { icon, label } = analysisPortal;
  return C.StaticImage({
    alt: label,
    src: icon,
  });
}

/**
 * Returns the analysis portal key value function for the key value component.
 * @param analysisPortals - Analysis portals.
 * @returns key value function for the key value component.
 */
function getAnalysisPortalKeyValueFn(
  analysisPortals: AnalysisPortal[]
): KeyValueFn {
  return (keyValue) => {
    const [, value] = keyValue;
    if (value && typeof value === "string") {
      const url = analysisPortals.find(({ label }) => label === value)?.url;
      url && window.open(url, ANCHOR_TARGET.BLANK);
    }
  };
}

/**
 * Returns the analysis portals key value element type.
 * @param analysisPortals - Analysis portals.
 * @returns key value element type for the analysis portals key value pairs component.
 */
function getAnalysisPortalsKeyValueElType(
  analysisPortals: AnalysisPortal[] | undefined
): ElementType {
  if (!analysisPortals) {
    return Fragment; // No analysis portals for the given projects response.
  }
  return (props) =>
    C.KeyValueElType({
      boxSx: {
        display: "grid",
        gap: 2,
        gridTemplateColumns: "auto 1fr",
      },
      keyValueFn: getAnalysisPortalKeyValueFn(analysisPortals),
      ...props,
    });
}

/**
 * Returns the key value pairs for the analysis portal key value pairs component.
 * @param analysisPortals - Analysis portals.
 * @returns key value pairs for the key value pairs component.
 */
function getAnalysisPortalsKeyValuePairs(
  analysisPortals: AnalysisPortal[] | undefined
): Map<Key, Value> {
  const keyValuePairs = new Map<Key, Value>();
  if (!analysisPortals) {
    keyValuePairs.set(null, "None");
  } else {
    for (const analysisPortal of analysisPortals) {
      keyValuePairs.set(
        getAnalysisPortalKey(analysisPortal),
        analysisPortal.label
      );
    }
  }
  return keyValuePairs;
}

/**
 * Returns the total cells from cellSuspensions for the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns total cells from cellSuspensions.
 */
function getCellSuspensionTotalCells(entityResponse: EntityResponse): string {
  const totalCells = rollUpTotalCells(entityResponse);
  if (!totalCells) {
    return LABEL.UNSPECIFIED;
  }
  return totalCells.toLocaleString();
}

/**
 * Returns the table column definition model for the contributor generated matrices table.
 * @returns generated matrices table column definition.
 */
function getContributorGeneratedMatricesTableColumns<T>(): ColumnDef<T>[] {
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
 * Returns the table column definition model for the DCP generated matrices table.
 * @returns generated matrices table column definition.
 */
function getDCPGeneratedMatricesTableColumns<T>(): ColumnDef<T>[] {
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
 * Returns formatted estimated cell count from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @param formatFn - Function to format count (optional, e.g. formatCountSize, default is locale string).
 * @returns formatted estimated cell count.
 */
export function getEstimatedCellCount(
  projectsResponse: ProjectsResponse,
  formatFn?: (value: number) => string
): string {
  const estimatedCellCount = calculateEstimatedCellCount(projectsResponse);
  if (!estimatedCellCount) {
    return LABEL.UNSPECIFIED;
  }
  if (formatFn) {
    return formatFn(estimatedCellCount);
  }
  return estimatedCellCount.toLocaleString();
}

/**
 * Returns current queries from the given selected file facets.
 * @param filters - Filters.
 * @param filesFacets - Files facets.
 * @returns current queries.
 */
export function getExportCurrentQueries(
  filters: Filters,
  filesFacets: FileFacet[]
): CurrentQuery[] {
  const categoryKeyLabel = mapCategoryKeyLabel(
    HCA_DCP_CATEGORY_KEY,
    HCA_DCP_CATEGORY_LABEL
  );
  // Return all selected filters, as a list of current queries.
  // Replace any selected filter projectIds with project facet terms.
  return filters
    .map((filter) => mapProjectIdToProject(filter, filesFacets))
    .map((filter) => mapCurrentQuery(filter, categoryKeyLabel));
}

/**
 * Returns the key value pairs for the file counts component.
 * @param projectsResponse - Response model return from projects API.
 * @returns key value pairs for the file counts component.
 */
function getFileCountsKeyValuePairs(
  projectsResponse: ProjectsResponse
): Map<Key, Value> {
  // Grab the file type counts from the projects response.
  const countsByFileType = mapFileTypeCounts(projectsResponse);
  // Sort file types by alpha, descending.
  const fileTypeCounts = [...countsByFileType].sort((a, b) =>
    a[0].localeCompare(b[0])
  );
  const keyValuePairs = new Map<Key, Value>();
  for (const [fileType, count] of fileTypeCounts) {
    keyValuePairs.set(fileType, `${count.toLocaleString()} file(s)`);
  }
  return keyValuePairs;
}

/**
 * Returns the export entity filters for the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns export entity filters.
 */
function getExportEntityFilters(projectsResponse: ProjectsResponse): Filters {
  return [
    {
      categoryKey: "projectId",
      value: [processEntityValue(projectsResponse.projects, "projectId")],
    },
  ];
}

/**
 * Returns breadcrumbs and title for export method Hero component.
 * @param explorePath - Explore path.
 * @param title - Export method title.
 * @returns model to be used as props for the Hero component.
 */
function getExportMethodHero(
  explorePath: string,
  title: string
): React.ComponentProps<typeof C.BackPageHero> {
  return {
    breadcrumbs: [
      { path: `/${explorePath}`, text: "Explore" },
      { path: "/export", text: "Export Selected Data" },
      { path: "", text: title },
    ],
    title: title,
  };
}

/**
 * Returns file facet term names.
 * @param facet - File facet.
 * @returns file facet term names.
 */
function getFacetTerms(facet: FileFacet | undefined): string[] {
  return (
    facet?.terms.map(({ name }) => sanitizeString(name)) || [LABEL.UNSPECIFIED]
  );
}

/**
 * Returns the file summary facet, where facet terms are generated from the file summary to include term size.
 * @param fileFacet - File facet.
 * @param fileSummary - File summary.
 * @returns file summary facet.
 */
function getFileSummaryFacet(
  fileFacet?: FileFacet,
  fileSummary?: SummaryResponse
): FileSummaryFacet | undefined {
  if (!fileFacet || !fileSummary) {
    return;
  }
  // Clone the facet.
  const clonedFacet = { ...fileFacet };
  // Bind the file summary response.
  const { fileTypeSummaries } = bindFileSummaryResponse(fileSummary);
  // Grab the file summary facet terms, with total size from file summary.
  clonedFacet.terms = getFileSummaryTerms(fileTypeSummaries, clonedFacet);
  return clonedFacet;
}

/**
 * Returns the file summary facet terms, where term size is generated from the file summary.
 * @param fileTypeSummaries - File type summaries.
 * @param fileFacet - File facet.
 * @returns file summary facet terms.
 */
function getFileSummaryTerms(
  fileTypeSummaries: FileTypeSummary[],
  fileFacet: FileFacet
): FileSummaryTerm[] {
  return fileTypeSummaries
    .map(({ count, fileType: name, totalSize: size }) => {
      const selected = isFacetTermSelected(fileFacet, name);
      return {
        count,
        name,
        selected,
        size,
      };
    })
    .sort(sortTerms);
}

/**
 * Returns the form facets for the given file manifest state.
 * @param fileManifestState - File manifest state.
 * @returns form facets.
 */
function getFormFacets(fileManifestState: FileManifestState): FormFacet {
  // Find the species facet.
  const speciesFacet = findFacet(
    fileManifestState.filesFacets,
    HCA_DCP_CATEGORY_KEY.GENUS_SPECIES
  );
  // Get the file summary facet.
  const fileSummaryFacet = getFileSummaryFacet(
    findFacet(fileManifestState.filesFacets, HCA_DCP_CATEGORY_KEY.FILE_FORMAT),
    fileManifestState.fileSummary
  );
  return { fileSummaryFacet, speciesFacet };
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
        getNTagCellProps(
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
        getNTagCellProps(
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
        getNTagCellProps(
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
        getNTagCellProps(
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

/**
 * Returns the metadata filters.
 * @param filters - Filters.
 * @returns metadata filters.
 */
function getMetadataFilters(filters: Filters): Filters {
  const metadataFilters = [...filters];
  metadataFilters.push({
    categoryKey: HCA_DCP_CATEGORY_KEY.CONTENT_DESCRIPTION,
    value: ["Database entry metadata"],
  });
  return metadataFilters;
}

/**
 * Returns props for NTagCell component from the given entity and entity key.
 * @param projectMatrixTableView - Project matrix view (by species).
 * @param key - Project matrix view key.
 * @param metadataKey - Metadata key.
 * @returns model to be used as props for the NTagCell component.
 */
function getNTagCellProps(
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
 * Returns project related breadcrumbs.
 * @param projectsResponse - Response model return from projects API.
 * @returns project breadcrumbs.
 */
export function getProjectBreadcrumbs(
  projectsResponse: ProjectsResponse
): Breadcrumb[] {
  const firstCrumb = { path: PROJECTS_URL, text: "Explore" };
  const projectTitle = processEntityValue(
    projectsResponse.projects,
    "projectTitle"
  );
  const breadcrumbs = [firstCrumb];
  if (projectTitle) {
    breadcrumbs.push({ path: "", text: projectTitle });
  }
  return breadcrumbs;
}

/**
 * Returns project file formats from the projects API response.
 * @param projectsResponse - Response returned from projects API response.
 * @returns project file formats.
 */
export function getProjectFileFormats(
  projectsResponse: ProjectsResponse
): string[] {
  const fileFormats = projectsResponse.fileTypeSummaries
    .map((fileTypeSummary) => fileTypeSummary.format)
    .sort();
  return [...new Set(fileFormats)];
}

/**
 * Returns the project value from the projects API response.
 * @param projectsResponse - Response returned from projects API response.
 * @returns The core project value from the API response.
 */
export function getProjectResponse(
  projectsResponse: ProjectsResponse
): ProjectResponse {
  return projectsResponse.projects[0];
}

/**
 * Returns the project detailed page url.
 * @param projectsResponse - Response model return from entity API.
 * @returns project detail page url.
 */
function getProjectTitleUrl(projectsResponse: ProjectsResponse): string {
  return `/projects/${processEntityValue(
    projectsResponse.projects,
    "projectId"
  )}`;
}

/**
 * Returns current query for the given facet.
 * @param filter - Selected filter.
 * @param categoryKeyLabel - Map of category key to category label.
 * @returns current query.
 */
function mapCurrentQuery(
  filter: SelectedFilter,
  categoryKeyLabel: CategoryKeyLabel
): CurrentQuery {
  const { categoryKey, value: values } = filter;
  return [
    categoryKeyLabel.get(categoryKey) || categoryKey,
    values.map((value) => sanitizeString(value)),
  ];
}

/**
 * Sum counts for each file format.
 * @param projectsResponse - Response returned from projects API response.
 * @returns file counts keyed by file format.
 */
function mapFileTypeCounts(
  projectsResponse: ProjectsResponse
): Map<string, number> {
  return (projectsResponse.fileTypeSummaries || []).reduce(
    (acc, fileTypeSummary) => {
      const count = fileTypeSummary.count || 0;
      const fileType = fileTypeSummary.format;
      if (acc.has(fileType)) {
        const currentCount = acc.get(fileType);
        acc.set(fileType, currentCount + count);
      } else {
        acc.set(fileType, count);
      }
      return acc;
    },
    new Map()
  );
}

/**
 * Returns the project facet name and terms as a selected filter in lieu of selected filter of category project id.
 * @param filter - Selected filter.
 * @param filesFacets - Files facets.
 * @returns selected filter.
 */
function mapProjectIdToProject(
  filter: SelectedFilter,
  filesFacets: FileFacet[]
): SelectedFilter {
  if (filter.categoryKey === HCA_DCP_CATEGORY_KEY.PROJECT_ID) {
    const projectFacet = findFacet(filesFacets, HCA_DCP_CATEGORY_KEY.PROJECT);
    return {
      categoryKey: HCA_DCP_CATEGORY_KEY.PROJECT,
      value: getFacetTerms(projectFacet),
    };
  }
  return filter;
}

/**
 * Returns the aggregated total cells from cellSuspensions for the given entity response.
 * @param entityResponse - Response model return from entity API.
 * @returns total cells from cellSuspensions.
 */
function rollUpTotalCells(entityResponse: EntityResponse): number | null {
  return entityResponse.cellSuspensions.reduce((acc, { totalCells }) => {
    if (totalCells) {
      acc = (acc ?? 0) + totalCells;
    }
    return acc;
  }, null as null | number);
}

/**
 * Returns value from a string array matching the given index.
 * @param arr - String array.
 * @param index - Zero-based index of the array element to be returned.
 * @returns value in the array matching the given index.
 */
export function takeArrayValueAt(arr: string[], index = 0): string {
  return arr.at(index) ?? "";
}
