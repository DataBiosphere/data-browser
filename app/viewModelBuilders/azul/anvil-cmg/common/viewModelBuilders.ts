import {
  LABEL,
  MANIFEST_DOWNLOAD_FORMAT,
} from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import {
  Filters,
  SelectedFilter,
} from "@databiosphere/findable-ui/lib/common/entities";
import { ALERT_PROPS } from "@databiosphere/findable-ui/lib/components/common/Alert/constants";
import { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { CallToAction } from "@databiosphere/findable-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import { STATUS_BADGE_COLOR } from "@databiosphere/findable-ui/lib/components/common/StatusBadge/statusBadge";
import {
  FileSummaryFacet,
  FileSummaryTerm,
  FormFacet,
} from "@databiosphere/findable-ui/lib/components/Export/common/entities";
import { CurrentQuery } from "@databiosphere/findable-ui/lib/components/Export/components/ExportSummary/components/ExportCurrentQuery/exportCurrentQuery";
import { Summary } from "@databiosphere/findable-ui/lib/components/Export/components/ExportSummary/components/ExportSelectedDataSummary/exportSelectedDataSummary";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { ViewContext } from "@databiosphere/findable-ui/lib/config/entities";
import {
  FILE_MANIFEST_TYPE,
  FileFacet,
} from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/entities";
import {
  findFacet,
  isFacetTermSelected,
  sortTerms,
} from "@databiosphere/findable-ui/lib/hooks/useFileManifest/common/utils";
import { FileManifestState } from "@databiosphere/findable-ui/lib/providers/fileManifestState";
import { SIZE } from "@databiosphere/findable-ui/lib/styles/common/constants/size";
import { CategoryKeyLabel } from "@databiosphere/findable-ui/lib/viewModelBuilders/common/entities";
import {
  mapCategoryKeyLabel,
  sanitizeString,
} from "@databiosphere/findable-ui/lib/viewModelBuilders/common/utils";
import {
  ChipProps as MChipProps,
  FadeProps as MFadeProps,
} from "@mui/material";
import React, { ReactNode } from "react";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
  DATASET_RESPONSE,
} from "../../../../../site-config/anvil-cmg/category";
import {
  ROUTE_EXPORT_TO_TERRA,
  ROUTE_MANIFEST_DOWNLOAD,
} from "../../../../../site-config/anvil-cmg/dev/export/constants";
import { URL_DATASETS } from "../../../../../site-config/anvil/dev/config";
import {
  AggregatedBioSampleResponse,
  AggregatedDatasetResponse,
  AggregatedDiagnosisResponse,
  AggregatedDonorResponse,
} from "../../../../apis/azul/anvil-cmg/common/aggregatedEntities";
import {
  ActivityEntityResponse,
  BioSampleEntityResponse,
  DonorEntityResponse,
  FileEntityResponse,
  FileFormat,
  LibraryEntityResponse,
} from "../../../../apis/azul/anvil-cmg/common/entities";
import {
  DatasetsResponse,
  FilesResponse,
  SummaryResponse,
} from "../../../../apis/azul/anvil-cmg/common/responses";
import {
  getActivityDataModalities,
  getActivityType,
  getAggregatedBioSampleTypes,
  getAggregatedDatasetIds,
  getAggregatedDatasetTitles,
  getAggregatedDiagnoses,
  getAggregatedOrganismTypes,
  getAggregatedPhenotypicSexes,
  getAggregatedReportedEthnicities,
  getAnatomicalSite,
  getBioSampleId,
  getBioSampleType,
  getConsentGroup,
  getDatasetDetails,
  getDatasetEntryId,
  getDocumentId,
  getDonorId,
  getFileDataModalities,
  getFileFormat,
  getFileName,
  getFileSize,
  getLibraryId,
  getOrganismType,
  getPhenotypicSex,
  getPrepMaterialName,
  getReportedEthnicities,
} from "../../../../apis/azul/anvil-cmg/common/transformers";
import {
  processEntityArrayValue,
  processEntityValue,
} from "../../../../apis/azul/common/utils";
import * as C from "../../../../components";
import * as MDX from "../../../../components/common/MDXContent/anvil-cmg";
import { Description } from "../../../../components/Detail/components/MDX/components/Description/description";
import { ExportMethod } from "@databiosphere/findable-ui/lib/components/Export/components/ExportMethod/exportMethod";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import { SUMMARY_DISPLAY_TEXT } from "./summaryMapper/constants";
import { mapExportSummary } from "./summaryMapper/summaryMapper";
import { ExportEntity } from "app/components/Export/components/AnVILExplorer/components/ExportEntity/exportEntity";
import { RequestAccess } from "../../../../components/Detail/components/AnVILCMG/components/RequestAccess/requestAccess";

/**
 * Build props for activity type BasicCell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildActivityType = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getActivityType(response),
  };
};

/**
 * Build props for dataset-related export warning Alert component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Alert component.
 */
export const buildAlertDatasetExportWarning = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof MDX.Alert> => {
  const content = isUserAuthenticated(viewContext)
    ? "To export this dataset, please request access."
    : "To export this dataset, please sign in and, if necessary, request access.";
  return {
    ...ALERT_PROPS.STANDARD_WARNING,
    component: C.FluidPaper,
    content,
  };
};

/**
 * Build props for entity related download manifest warning Alert component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Alert component.
 */
export const buildAlertDatasetManifestDownloadWarning = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof MDX.Alert> => {
  const content = isUserAuthenticated(viewContext)
    ? "To download this dataset manifest, please request access."
    : "To download this dataset manifest, please sign in and, if necessary, request access.";
  return {
    ...ALERT_PROPS.STANDARD_WARNING,
    component: C.FluidPaper,
    content,
  };
};

/**
 * Build props for list view access warning Alert component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Alert component.
 */
export const buildAlertEntityListWarning = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof MDX.AlertEntityListWarning> => {
  return {
    ...ALERT_PROPS.STANDARD_WARNING,
    component: C.FluidPaper,
    entityName: viewContext.entityConfig.label,
  };
};

/**
 * Build props for export warning Alert component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Alert component.
 */
export const buildAlertExportWarning = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof MDX.AlertExportWarning> => {
  const isAuthenticated = isUserAuthenticated(viewContext);
  return {
    ...ALERT_PROPS.STANDARD_WARNING,
    component: C.FluidPaper,
    content: isAuthenticated ? null : MDX.AlertExportWarningContent({}),
    size: isAuthenticated ? SIZE.MEDIUM : SIZE.LARGE,
  };
};

/**
 * Build props for anatomical site BasicCell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildAnatomicalSite = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getAnatomicalSite(response),
  };
};

/**
 * Build props for biosample id BasicCell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildBioSampleId = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getBioSampleId(response),
  };
};

/**
 * Build props for biosample type BasicCell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildBioSampleType = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getBioSampleType(response),
  };
};

/**
 * Build biosample types NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated biosamples.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildBioSampleTypes = (
  response: AggregatedBioSampleResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.BIOSAMPLE_TYPE),
    values: getAggregatedBioSampleTypes(response),
  };
};

/**
 * Build props for consent group BasicCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildConsentGroup = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getConsentGroup(datasetsResponse),
  };
};

/**
 * Build props for data modality NTagCell component from the given activities response.
 * @param response - Response model return from index/activities API.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildDataModality = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_MODALITY),
    values: getActivityDataModalities(response),
  };
};

/**
 * Build dataset StatusBadge component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the StatusBadge component.
 */
export const buildDatasetAccess = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.StatusBadge> => {
  const isAccessGranted = isDatasetAccessible(datasetsResponse);
  const color = isAccessGranted
    ? STATUS_BADGE_COLOR.SUCCESS
    : STATUS_BADGE_COLOR.WARNING;
  const label = isAccessGranted ? "Granted" : "Required";
  return {
    color,
    label,
  };
};

/**
 * Returns AccessibilityBadge component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the AccessibilityBadge component.
 */
export function buildDatasetAccessibilityBadge(
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.AccessibilityBadge> {
  const badgeProps = getDatasetStatusBadge(datasetsResponse);
  const fadeProps = getAccessibleTransition(datasetsResponse);
  return { badgeProps, fadeProps };
}

/**
 * Build props for Description component from the given entity response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the Description component.
 */
export const buildDatasetDescription = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof Description> => {
  return {
    content:
      processEntityValue(
        datasetsResponse.datasets,
        "description",
        LABEL.EMPTY
      ) || "To be provided.",
  };
};

/**
 * Build props for Details component from the given datasets response.
 * TODO revisit - separate from entity builder, generalize modeling/component?, revisit transformer
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the Details component.
 */
export const buildDatasetDetails = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.Details> => {
  return {
    keyValuePairs: getDatasetDetails(datasetsResponse),
    title: "Dataset Details",
  };
};

/**
 * Build base breadcrumbs for dataset export. Includes link to all datasets and
 * the selected dataset.
 * @param datasetsResponse  - Response model return from datasets API.
 * @returns array of breadcrumbs to be used by dataset export and dataset export method pages.
 */
export function buildDatasetExportBreadcrumbs(
  datasetsResponse: DatasetsResponse
): Breadcrumb[] {
  const datasetPath = buildDatasetPath(datasetsResponse);
  const datasetTitle = getDatasetTitle(datasetsResponse);
  return [
    { path: URL_DATASETS, text: "Datasets" },
    { path: datasetPath, text: datasetTitle },
  ];
}

/**
 * Build props for dataset export BackPageHero component.
 * @param datasetsResponse  - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export function buildDatasetExportHero(
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BackPageHero> {
  return {
    breadcrumbs: [
      ...buildDatasetExportBreadcrumbs(datasetsResponse),
      { path: "", text: "Choose Export Method" },
    ],
    title: getDatasetTitle(datasetsResponse),
  };
}

/**
 * Returns breadcrumbs and title for dataset export method Hero component.
 * @param datasetsResponse - Response model return from datasets API.
 * @param title - Short export method description (e.g. Request File Manifest).
 * @returns model to be used as props for the Hero component.
 */
function getDatasetExportMethodHero(
  datasetsResponse: DatasetsResponse,
  title: string
): React.ComponentProps<typeof C.BackPageHero> {
  const datasetPath = buildDatasetPath(datasetsResponse);
  return {
    breadcrumbs: [
      ...buildDatasetExportBreadcrumbs(datasetsResponse),
      { path: `${datasetPath}/export`, text: "Choose Export Method" },
      { path: "", text: title },
    ],
    title: getDatasetTitle(datasetsResponse),
  };
}

/**
 * Build props for dataset manifest download BackPageHero component.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildDatasetExportMethodHeroManifestDownload = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "File Manifest";
  return getDatasetExportMethodHero(datasetsResponse, title);
};

/**
 * Build props for dataset manifest download BackPageHero component.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildDatasetExportMethodHeroTerraExport = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "Analyze in Terra";
  return getDatasetExportMethodHero(datasetsResponse, title);
};

/**
 * Build props for ExportMethod component for display of the dataset manifest download section.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the dataset file manifest export method component.
 */
export const buildDatasetExportMethodManifestDownload = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.ExportMethod> => {
  const datasetPath = buildDatasetPath(datasetsResponse);
  return {
    buttonLabel: "Request File Manifest",
    description:
      "Request a file manifest suitable for downloading this dataset to your HPC cluster or local machine.",
    route: `${datasetPath}${ROUTE_MANIFEST_DOWNLOAD}`,
    title: "Download a File Manifest with Metadata",
  };
};

/**
 * Build props for either the ExportEntity component for the display of the choose export methods or
 * the AnVILManifestDownloadEntity component for the display of the manifest download method.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the ExportEntity component.
 */
export const buildDatasetExportPropsWithFilter = (
  datasetsResponse: DatasetsResponse
):
  | React.ComponentProps<typeof ExportEntity>
  | typeof C.AnVILManifestDownloadEntity => {
  return {
    filters: getExportEntityFilters(datasetsResponse),
  };
};

/**
 * Build props for ExportMethod component for display of the export to terra metadata section.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the dataset Terra export method component.
 */
export const buildDatasetExportMethodTerra = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof ExportMethod> => {
  const datasetPath = buildDatasetPath(datasetsResponse);
  return {
    buttonLabel: "Analyze in Terra",
    description:
      "Terra is a biomedical research platform to analyze data using workflows, Jupyter Notebooks, RStudio, and Galaxy.",
    route: `${datasetPath}${ROUTE_EXPORT_TO_TERRA}`,
    title: "Export Dataset Data and Metadata to Terra Workspace",
  };
};

/**
 * Build props for BackPageHero component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildDatasetHero = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  return {
    actions: getDatasetRequestAccess(datasetsResponse),
    breadcrumbs: getDatasetBreadcrumbs(datasetsResponse),
    callToAction: getDatasetCallToAction(datasetsResponse),
    title: getDatasetTitle(datasetsResponse),
  };
};

/**
 * Build dataset ID NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns model to be used as props for theNTagCell component.
 */
export const buildDatasetIds = (
  response: AggregatedDatasetResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATASET_NAME),
    values: getAggregatedDatasetIds(response),
  };
};

/**
 * Build path to dataset from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns path to the dataset.
 */
export function buildDatasetPath(datasetsResponse: DatasetsResponse): string {
  const datasetId = getDatasetEntryId(datasetsResponse);
  return `${URL_DATASETS}/${datasetId}`;
}

/**
 * Build props for dataset ExportToTerra component.
 * @param datasetsResponse - Response model return from datasets API.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportToTerra component.
 */
export const buildDatasetTerraExport = (
  datasetsResponse: DatasetsResponse,
  viewContext: ViewContext<DatasetsResponse>
): React.ComponentProps<typeof C.ExportToTerra> => {
  const { fileManifestState } = viewContext;
  // Get the initial filters.
  const filters = getExportTerraEntityFilters(datasetsResponse);
  // Grab the form facet.
  const formFacet = getFormFacets(fileManifestState);
  return {
    ExportForm: C.ExportToTerraForm,
    ExportToTerraStart: MDX.ExportToTerraStart,
    ExportToTerraSuccess: MDX.ExportToTerraSuccess,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.ENTITY_EXPORT_TO_TERRA,
    fileSummaryFacetName: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
    filters,
    formFacet,
    manifestDownloadFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
    manifestDownloadFormats: [MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB],
    speciesFacetName: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
  };
};

/**
 * Build dataset title Link component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the Link component.
 */
export const buildDatasetTitle = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: getDatasetTitle(datasetsResponse),
    url: `/datasets/${getDatasetEntryId(datasetsResponse)}`,
  };
};

/**
 * Build dataset ID NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildDatasetTitles = (
  response: AggregatedDatasetResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATASET_NAME),
    values: getAggregatedDatasetTitles(response),
  };
};

/**
 * Build props for diagnosis type NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated diagnoses.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildDiagnoses = (
  response: AggregatedDiagnosisResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DIAGNOSIS),
    values: getAggregatedDiagnoses(response),
  };
};

/**
 * Build props for donor ID BasicCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildDonorId = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getDonorId(response),
  };
};

/**
 * Build props for document ID BasicCell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildDocumentId = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getDocumentId(response),
  };
};

/**
 * Build props for DRS URI CopyCell component from the given files response.
 * @param filesResponse - Response model return from index/files API endpoint.
 * @returns model to be used as props for the CopyCell component.
 */
export const buildDRSURI = (
  filesResponse: FilesResponse
): React.ComponentProps<typeof C.CopyCell> => {
  return {
    value: processEntityValue(filesResponse.files, "drs_uri"),
  };
};

/**
 * Build props for ExportCurrentQuery component.
 * @param datasetsResponse - Response model returned from datasets API.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportCurrentQuery component.
 */
export const buildExportCurrentQuery = (
  datasetsResponse: DatasetsResponse,
  viewContext: ViewContext<DatasetsResponse>
): React.ComponentProps<typeof C.ExportCurrentQuery> => {
  return {
    isLoading: viewContext.fileManifestState.isFacetsLoading,
    queries: getExportCurrentQueries(
      getExportCurrentQuerySelectedFilters(datasetsResponse, viewContext)
    ),
  };
};

/**
 * Build props for export BackPageHero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the BackPageHero component.
 */
export function buildExportHero(
  _: unknown,
  viewContext: ViewContext<unknown>
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
 * Build props for manifest download BackPageHero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildExportMethodHeroManifestDownload = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "Request File Manifest";
  const {
    exploreState: { tabValue },
  } = viewContext;
  return getExportMethodHero(tabValue, title);
};

/**
 * Build props for export to terra BackPageHero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildExportMethodHeroTerra = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "Export to Terra";
  const {
    exploreState: { tabValue },
  } = viewContext;
  return getExportMethodHero(tabValue, title);
};

/**
 * Build props for ExportMethod component for display of the manifest download section.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportMethodManifestDownload = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof C.ExportMethod> => {
  return {
    ...getExportMethodAccessibility(viewContext),
    buttonLabel: "Request File Manifest",
    description:
      "Request a file manifest for the current query containing the full list of selected files and the metadata for each file.",
    route: ROUTE_MANIFEST_DOWNLOAD,
    title: "Download a File Manifest with Metadata for the Selected Data",
  };
};

/**
 * Build props for ExportMethod component for display of the export to terra metadata section.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportMethod component.
 */
export const buildExportMethodTerra = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof ExportMethod> => {
  return {
    ...getExportMethodAccessibility(viewContext),
    buttonLabel: "Analyze in Terra",
    description:
      "Terra is a biomedical research platform to analyze data using workflows, Jupyter Notebooks, RStudio, and Galaxy.",
    route: ROUTE_EXPORT_TO_TERRA,
    title: "Export Study Data and Metadata to Terra Workspace",
  };
};

/**
 * Build props for ExportSelectedDataSummary component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ExportSelectedDataSummary component.
 */
export const buildExportSelectedDataSummary = (
  _: unknown,
  viewContext: ViewContext<unknown>
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
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof C.ExportToTerra> => {
  const {
    exploreState: { filterState },
    fileManifestState,
  } = viewContext;
  // Grab the form facet.
  const formFacet = getFormFacets(fileManifestState);
  return {
    ExportForm: C.ExportToTerraForm,
    ExportToTerraStart: MDX.ExportToTerraStart,
    ExportToTerraSuccess: MDX.ExportToTerraSuccess,
    fileManifestState,
    fileManifestType: FILE_MANIFEST_TYPE.EXPORT_TO_TERRA,
    fileSummaryFacetName: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
    filters: filterState,
    formFacet,
    manifestDownloadFormat: MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB,
    manifestDownloadFormats: [MANIFEST_DOWNLOAD_FORMAT.VERBATIM_PFB],
    speciesFacetName: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
  };
};

/**
 * Build props for file data modality NTagCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildFileDataModality = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.DATA_MODALITY),
    values: getFileDataModalities(response),
  };
};

/**
 * Build props for file download AzulFileDownload component.
 * @param response - Response model returned from index/files API endpoint.
 * @returns model to be used as props for the AzulFileDownload component.
 */
export const buildFileDownload = (
  response: FilesResponse
): React.ComponentProps<typeof C.AzulFileDownload> => {
  const dataset = response.datasets[0];
  return {
    entityName: processEntityValue(response.files, "file_name"),
    relatedEntityId: dataset.dataset_id[0],
    relatedEntityName: dataset.title[0],
    url: processEntityValue(response.files, "url", LABEL.EMPTY),
  };
};

/**
 * Build props for file ID BasicCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildFileName = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getFileName(response),
  };
};

/**
 * Build props for file format BasicCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildFileFormat = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getFileFormat(response),
  };
};

/**
 * Build props for file size BasicCell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildFileSize = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getFileSize(response),
  };
};

/**
 * Build props for library ID BasicCell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildLibraryId = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getLibraryId(response),
  };
};

/**
 * Build props for ManifestDownload component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ManifestDownload component.
 */
export const buildManifestDownload = (
  _: unknown,
  viewContext: ViewContext<unknown>
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
    fileSummaryFacetName: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
    filters: filterState,
    formFacet,
    speciesFacetName: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
  };
};

/**
 * Build props for organism type BasicCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildOrganismType = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getOrganismType(response),
  };
};

/**
 * Build props for organism type NTagCell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildOrganismTypes = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.ORGANISM_TYPE),
    values: getAggregatedOrganismTypes(response),
  };
};

/**
 * Build props for phenotypic sex BasicCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildPhenotypicSex = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getPhenotypicSex(response),
  };
};

/**
 * Build props for phenotypic sex NTagCell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildPhenotypicSexes = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.PHENOTYPIC_SEX),
    values: getAggregatedPhenotypicSexes(response),
  };
};

/**
 * Build props for prep material name BasicCell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildPrepMaterialName = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getPrepMaterialName(response),
  };
};

/**
 * Build props for registered identifier BasicCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the BasicCell component.
 */
export const buildRegisteredIdentifier = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BasicCell> => {
  return {
    value: getDatasetRegisteredIdentifier(datasetsResponse),
  };
};

/**
 * Build reported ethnicities NTagCell component from the given donors response. Naming is singular here to indicate
 * ethnicities are pulled from the core donor entity, even though the return value is an array.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildReportedEthnicity = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getReportedEthnicities(response),
  };
};

/**
 * Build reported ethnicities NTagCell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the NTagCell component.
 */
export const buildReportedEthnicities = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getAggregatedReportedEthnicities(datasetsResponse),
  };
};

/**
 * Returns transition relating to accessibility from the given datasets response and authorization state.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the Fade component.
 */
function getAccessibleTransition(
  datasetsResponse: DatasetsResponse
): Partial<MFadeProps> {
  const isIn = isAccessibleTransitionIn(datasetsResponse);
  return {
    appear: false,
    in: isIn,
    timeout: 300,
  };
}

/**
 * Returns dataset related breadcrumbs.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns dataset breadcrumbs.
 */
export function getDatasetBreadcrumbs(
  datasetsResponse: DatasetsResponse
): Breadcrumb[] {
  return [
    { path: URL_DATASETS, text: "Datasets" },
    { path: "", text: getDatasetTitle(datasetsResponse) },
  ];
}

/**
 * Returns the callToAction prop for the Hero component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the CallToActionButton component.
 */
function getDatasetCallToAction(
  datasetsResponse: DatasetsResponse
): CallToAction | undefined {
  const isReady = isResponseReady(datasetsResponse);
  const isAccessGranted = isDatasetAccessible(datasetsResponse);
  if (!isReady) return;
  // Display export button if user is authorized to access the dataset.
  if (isAccessGranted) {
    return {
      label: "Export",
      target: ANCHOR_TARGET.SELF,
      url: `/datasets/${getDatasetEntryId(datasetsResponse)}/export`,
    };
  }
  // Otherwise, display nothing.
}

/**
 * Returns dataset registered identifier from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns registered identifier.
 */
export function getDatasetRegisteredIdentifier(
  datasetsResponse: DatasetsResponse
): string {
  return takeArrayValueAt(
    processEntityArrayValue(datasetsResponse.datasets, "registered_identifier"),
    0
  );
}

/**
 * Returns the `actions` prop for the Hero component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns react node to be used as the `actions` props for the Hero component.
 */
function getDatasetRequestAccess(
  datasetsResponse: DatasetsResponse
): ReactNode {
  const isReady = isResponseReady(datasetsResponse);
  const isAccessGranted = isDatasetAccessible(datasetsResponse);
  if (!isReady) return null;
  // Display nothing if user is authorized to access the dataset.
  if (isAccessGranted) return null;
  // Display request access button if user is not authorized to access the dataset.
  return RequestAccess({ datasetsResponse });
}

/**
 * Returns StatusBadge component props from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns StatusBadge component props.
 */
function getDatasetStatusBadge(
  datasetsResponse: DatasetsResponse
): Partial<MChipProps> {
  const isAccessGranted = isDatasetAccessible(datasetsResponse);
  const color = isAccessGranted
    ? STATUS_BADGE_COLOR.SUCCESS
    : STATUS_BADGE_COLOR.WARNING;
  const label = isAccessGranted ? "Access Granted" : "Access Required";
  return {
    color,
    label,
  };
}

/**
 * Returns dataset ID from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns dataset ID.
 */
export function getDatasetId(datasetsResponse: DatasetsResponse): string {
  return processEntityValue(
    datasetsResponse.datasets,
    "dataset_id",
    LABEL.NONE
  );
}

/**
 * Returns dataset title from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns dataset title.
 */
export function getDatasetTitle(datasetsResponse: DatasetsResponse): string {
  return processEntityValue(datasetsResponse.datasets, "title", LABEL.NONE);
}

/**
 * Returns current queries from the given selected file facets.
 * @param filters - filters.
 * @returns current queries.
 */
export function getExportCurrentQueries(filters: Filters): CurrentQuery[] {
  const categoryKeyLabel = mapCategoryKeyLabel(
    ANVIL_CMG_CATEGORY_KEY,
    ANVIL_CMG_CATEGORY_LABEL
  );
  // Return all selected filters, as a list of current queries.
  return filters.map((filter) => mapCurrentQuery(filter, categoryKeyLabel));
}

/**
 * Returns the export current query selected filters for the given file manifest state.
 * @param datasetsResponse - Response model return from datasets API.
 * @param viewContext - View context.
 * @returns export current query selected filters.
 */
export function getExportCurrentQuerySelectedFilters(
  datasetsResponse: DatasetsResponse,
  viewContext: ViewContext<DatasetsResponse>
): Filters {
  if (DATASET_RESPONSE.DATASETS in datasetsResponse) {
    return getExportEntityCurrentQuerySelectedFilters(
      datasetsResponse,
      viewContext
    );
  }
  return viewContext.fileManifestState.filters;
}

/**
 * Returns the export entity current query selected filters for the given file manifest state.
 * Dataset ID is filtered out from the current filters query, and dataset title is added.
 * @param datasetsResponse - Response model return from datasets API.
 * @param viewContext - View context.
 * @returns export entity current query selected filters.
 */
export function getExportEntityCurrentQuerySelectedFilters(
  datasetsResponse: DatasetsResponse,
  viewContext: ViewContext<DatasetsResponse>
): Filters {
  const filters = viewContext.fileManifestState.filters.filter(filterDatasetId);
  const datasetTitleFilter: SelectedFilter = {
    categoryKey: ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
    value: [getDatasetTitle(datasetsResponse)],
  };
  return [datasetTitleFilter, ...filters];
}

/**
 * Returns the export entity filters for the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns export entity filters.
 */
function getExportEntityFilters(datasetsResponse: DatasetsResponse): Filters {
  return [
    {
      categoryKey: ANVIL_CMG_CATEGORY_KEY.DATASET_ID,
      value: [getDatasetId(datasetsResponse)],
    },
  ];
}

/**
 * Returns the export method accessibility.
 * @param viewContext - View context.
 * @returns export method accessibility.
 */
function getExportMethodAccessibility(
  viewContext: ViewContext<unknown>
): Partial<typeof C.ExportMethod> {
  const { fileManifestState } = viewContext;
  const { isFacetsSuccess } = fileManifestState;
  const isAccessible = isFileManifestAccessible(fileManifestState);
  return {
    footnote: isFacetsSuccess
      ? isAccessible
        ? null
        : "You currently don’t have access to any files matching the query."
      : null,
    isAccessible: isFacetsSuccess && isAccessible,
  };
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
    SUMMARY_DISPLAY_TEXT[key] || key,
    value,
  ]);
}

/**
 * Returns the export to terra entity filters for the given datasets response.
 * Includes dataset ID, donor organism type, and file format.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns export to terra entity filters.
 */
function getExportTerraEntityFilters(
  datasetsResponse: DatasetsResponse
): Filters {
  return [
    ...getExportEntityFilters(datasetsResponse),
    {
      categoryKey: ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE,
      value: processRawEntityArrayValue(
        datasetsResponse.donors,
        "organism_type"
      ),
    },
    {
      categoryKey: ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT,
      value: processRawEntityArrayValue(datasetsResponse.files, "file_format"),
    },
  ];
}

/**
 * Returns the file summary facet, where facet terms are generated from the file summary.
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
  // Clone the file facet.
  const clonedFacet = { ...fileFacet };
  // Grab the file formats from the file summary.
  const { fileFormats } = fileSummary;
  // Grab the file summary facet terms from file summary.
  clonedFacet.terms = getFileSummaryTerms(fileFormats, clonedFacet);
  return clonedFacet;
}

/**
 * Returns the file summary facet terms from the file summary.
 * @param fileFormats - File formats.
 * @param fileFacet - File facet.
 * @returns file summary facet terms.
 */
function getFileSummaryTerms(
  fileFormats: FileFormat[],
  fileFacet: FileFacet
): FileSummaryTerm[] {
  return fileFormats
    .map(({ count, format: name }) => {
      const selected = isFacetTermSelected(fileFacet, name);
      return {
        count,
        name,
        selected,
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
    ANVIL_CMG_CATEGORY_KEY.DONOR_ORGANISM_TYPE
  );
  // Get the file summary facet.
  const fileSummaryFacet = getFileSummaryFacet(
    findFacet(
      fileManifestState.filesFacets,
      ANVIL_CMG_CATEGORY_KEY.FILE_FILE_FORMAT
    ),
    fileManifestState.fileSummary
  );
  return {
    fileSummaryFacet: fileSummaryFacet
      ? {
          ...fileSummaryFacet,
          formLabel: ANVIL_CMG_CATEGORY_LABEL.FILE_FILE_FORMAT,
        }
      : undefined,
    speciesFacet: speciesFacet
      ? {
          ...speciesFacet,
          formLabel: ANVIL_CMG_CATEGORY_LABEL.DONOR_ORGANISM_TYPE,
        }
      : undefined,
  };
}

/**
 * Boolean to filter out any selected filters that have dataset ID as the category key.
 * @param filter - Selected filter.
 * @returns true if the filter category key is not dataset ID.
 */
function filterDatasetId(filter: SelectedFilter): boolean {
  return filter.categoryKey !== ANVIL_CMG_CATEGORY_KEY.DATASET_ID;
}

/**
 * Returns true if the response is accessible, or when the response is ready.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns true if the response is accessible, or when the response is ready.
 */
function isAccessibleTransitionIn(datasetsResponse: DatasetsResponse): boolean {
  const isAccessible = isDatasetAccessible(datasetsResponse);
  const isReady = isResponseReady(datasetsResponse);
  return isAccessible || isReady;
}

/**
 * Returns true if dataset is accessible.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns true if dataset is accessible.
 */
function isDatasetAccessible(datasetsResponse: DatasetsResponse): boolean {
  return datasetsResponse.datasets[0].accessible;
}

/**
 * Returns true if the "accessible" file facet has a term value of "true".
 * @param fileManifestState - File manifest state.
 * @returns true if the "accessible" file facet has a term value of "true".
 */
function isFileManifestAccessible(
  fileManifestState: FileManifestState
): boolean {
  return isFileManifestSummaryFileCountValid(fileManifestState);
}

/**
 * Returns true if the file manifest summary file count is valid.
 * @param fileManifestState - File manifest state.
 * @returns true if the file manifest summary file count is valid.
 */
function isFileManifestSummaryFileCountValid(
  fileManifestState: FileManifestState
): boolean {
  const { summary: { fileCount } = {} } = fileManifestState;
  return fileCount > 0;
}

/**
 * Returns true if the response is ready (for use) for the given authorization state.
 * The response is ready when the response is no longer loading (loading is false).
 * @param datasetsResponse - Response model return from datasets API.
 * @returns true if the response is ready.
 */
function isResponseReady(datasetsResponse: DatasetsResponse): boolean {
  const { isLoading } = datasetsResponse;
  return !isLoading;
}

/**
 * Returns true if user is authenticated.
 * @param viewContext - View context.
 * @returns true if user is authenticated.
 */
export function isUserAuthenticated(
  viewContext: ViewContext<unknown>
): boolean {
  return viewContext.authState.isAuthenticated;
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
 * Processes entities and extracts unique string or null values
 * from a specified key that holds an array of (string | null)[].
 * @param responseValues - Response model return from API.
 * @param key - The key whose values (arrays of string or null) will be processed.
 * @returns A unique list of string or null values.
 */
function processRawEntityArrayValue<
  T extends Record<K, (string | null)[]>,
  K extends keyof T,
>(responseValues: T[], key: K): (string | null)[] {
  const flatValues = responseValues.flatMap((value) => value[key]);
  const uniqueValues = new Set(flatValues);
  return [...uniqueValues];
}

/**
 * Renders configuration component children when the given authentication state is not authenticated.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ConditionalComponent component.
 */
export const renderWhenUnAuthenticated = (
  _: unknown,
  viewContext: ViewContext<unknown>
): React.ComponentProps<typeof C.ConditionalComponent> => {
  return {
    isIn: !isUserAuthenticated(viewContext),
  };
};

/**
 * Renders dataset export-related components (either the choose export method component,
 * or specific export components) when the given dataset is accessble.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the ConditionalComponent component.
 */
export const renderDatasetExport = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.ConditionalComponent> => {
  return {
    isIn: isDatasetAccessible(datasetsResponse),
  };
};

/**
 * Renders dataset export-related warning components (either the choose export method component,
 * or specific export components) when the given dataset is not accessible.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the ConditionalComponent component.
 */
export const renderDatasetExportWarning = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.ConditionalComponent> => {
  return {
    isIn: !isDatasetAccessible(datasetsResponse),
  };
};

/**
 * Returns value from a string array matching the given index.
 * @param arr - String array.
 * @param index - Zero-based index of the array element to be returned.
 * @returns value in the array matching the given index.
 */
export function takeArrayValueAt(arr: string[], index = 0): string {
  return arr.at(index) ?? "";
}
