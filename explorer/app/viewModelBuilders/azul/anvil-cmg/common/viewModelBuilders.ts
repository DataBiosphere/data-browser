import { LABEL } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import {
  Filters,
  SelectedFilter,
} from "@clevercanary/data-explorer-ui/lib/common/entities";
import { Breadcrumb } from "@clevercanary/data-explorer-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { CallToAction } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import { STATUS_BADGE_COLOR } from "@clevercanary/data-explorer-ui/lib/components/common/StatusBadge/statusBadge";
import { CurrentQuery } from "@clevercanary/data-explorer-ui/lib/components/Export/components/ExportSummary/components/ExportCurrentQuery/exportCurrentQuery";
import { Summary } from "@clevercanary/data-explorer-ui/lib/components/Export/components/ExportSummary/components/ExportSelectedDataSummary/exportSelectedDataSummary";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { ViewContext } from "@clevercanary/data-explorer-ui/lib/config/entities";
import {
  FileFacet,
  FILE_MANIFEST_TYPE,
} from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/entities";
import { CategoryKeyLabel } from "@clevercanary/data-explorer-ui/lib/viewModelBuilders/common/entities";
import {
  mapCategoryKeyLabel,
  sanitizeString,
} from "@clevercanary/data-explorer-ui/lib/viewModelBuilders/common/utils";
import React from "react";
import {
  ANVIL_CMG_CATEGORY_KEY,
  ANVIL_CMG_CATEGORY_LABEL,
} from "../../../../../site-config/anvil-cmg/category";
import {
  FORM_FACETS,
  ROUTE_EXPORT_TO_TERRA,
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
  getFileUrl,
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
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import * as MDX from "../../../../content/anvil-cmg";
import { SUMMARY_DISPLAY_TEXT } from "./summaryMapper/constants";
import { mapExportSummary } from "./summaryMapper/summaryMapper";

/**
 * Build props for activity type Cell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the activity type cell.
 */
export const buildActivityType = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getActivityType(response),
  };
};

/**
 * Build props for anatomical site Cell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the biosample type cell.
 */
export const buildAnatomicalSite = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getAnatomicalSite(response),
  };
};

/**
 * Build props for biosample id Cell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the biosample id cell.
 */
export const buildBioSampleId = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBioSampleId(response),
  };
};

/**
 * Build props for biosample type Cell component from the given index/biosamples response.
 * @param response - Response model return from index/biosamples API.
 * @returns model to be used as props for the biosample type cell.
 */
export const buildBioSampleType = (
  response: BioSampleEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getBioSampleType(response),
  };
};

/**
 * Build biosample types Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated biosamples.
 * @returns model to be used as props for the biosample types cell.
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
 * Build props for consent group Cell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the Cell component.
 */
export const buildConsentGroup = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsentGroup(datasetsResponse),
  };
};

/**
 * Build props for data modality NTagCell component from the given activities response.
 * @param response - Response model return from index/activities API.
 * @returns model to be used as props for the data modality NTagCell.
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
 * Build props for Description component from the given entity response.
 * TODO.
 * @returns model to be used as props for the Description component.
 */
export const buildDatasetDescription = (): React.ComponentProps<
  typeof C.Description
> => {
  return {
    projectDescription: LABEL.NONE,
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
 * Build props for BackPageHero component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildDatasetHero = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  return {
    breadcrumbs: getDatasetBreadcrumbs(datasetsResponse),
    callToAction: getDatasetCallToAction(datasetsResponse),
    title: getDatasetTitle(datasetsResponse),
  };
};

/**
 * Build dataset ID Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns model to be used as props for the dataset ID cell.
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
 * Build dataset list view list hero warning.
 * Warning serves as a reminder for users to log in.
 * @param _ - Unused.
 * @returns model to be used as props for Alert component.
 */
export const buildDatasetListViewListHeroWarning = (
  _: DatasetsResponse
): React.ComponentProps<typeof C.Alert> => {
  return {
    severity: "warning",
    title: MDX.RenderComponent({ Component: MDX.LoginReminder }),
    variant: "banner",
  };
};

/**
 * Build props for StatusBadge component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the StatusBadge component.
 */
export const buildDatasetStatus = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.StatusBadge> => {
  const isAccessGranted = isDatasetAccessible(datasetsResponse);
  const color = isAccessGranted
    ? STATUS_BADGE_COLOR.SUCCESS
    : STATUS_BADGE_COLOR.WARNING;
  const label = isAccessGranted ? "Access Granted" : "Access Required";
  return {
    color,
    label,
    sx: { gridRow: { sm: "unset", xs: "2" }, marginTop: -2 },
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
 * Build dataset ID Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated datasets.
 * @returns model to be used as props for the dataset ID cell.
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
 * Build props for diagnosis type cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated diagnoses.
 * @returns model to be used as props for the diagnosis cell.
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
 * Build props for donor ID cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the donor ID cell.
 */
export const buildDonorId = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDonorId(response),
  };
};

/**
 * Build props for document ID Cell component from the given activities response.
 * @param response - Response model return from activities API.
 * @returns model to be used as props for the activity document cell.
 */
export const buildDocumentId = (
  response: ActivityEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDocumentId(response),
  };
};

/**
 * Build props for ExportCurrentQuery component.
 * @returns model to be used as props for the ExportCurrentQuery component.
 */
export const buildExportCurrentQuery = (): React.ComponentProps<
  typeof C.ExportCurrentQuery
> => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- filesFacets is unused.
    getExportCurrentQueries: (filters: Filters) =>
      getExportCurrentQueries(filters),
  };
};

/**
 * Build props for ExportToTerra component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the ExportToTerra component.
 */
export const buildExportEntityToTerra = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.ExportToTerra> => {
  return {
    ExportForm: C.ExportToTerraForm,
    ExportToTerraStart: MDX.ExportToTerraStart,
    ExportToTerraSuccess: MDX.ExportToTerraSuccess,
    entity: [
      ANVIL_CMG_CATEGORY_KEY.DATASET_TITLE,
      getDatasetTitle(datasetsResponse),
    ],
    fileManifestType: FILE_MANIFEST_TYPE.ENITY_EXPORT_TO_TERRA,
    formFacets: FORM_FACETS,
  };
};

/**
 * Build props for entity related export warning FluidAlert component.
 * @param datasetsResponse - Response model return from datasets API (unused).
 * @param viewContext - View context.
 * @returns model to be used as props for the FluidAlert component.
 */
export const buildExportEntityWarning = (
  datasetsResponse: DatasetsResponse,
  viewContext: ViewContext
): React.ComponentProps<typeof C.FluidAlert> => {
  const {
    authState: { isAuthorized },
  } = viewContext;
  const title = isAuthorized
    ? "To export this dataset, please request access."
    : "To export this dataset, please sign in and, if necessary, request access.";
  return {
    severity: "warning",
    title,
    variant: "banner",
  };
};

/**
 * Build props for export Hero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Hero component.
 */
export function buildExportHero(
  _: Record<string, never>,
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
 * Build props for export to terra Hero component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Hero component.
 */
export const buildExportMethodHeroTerra = (
  _: Record<string, never>,
  viewContext: ViewContext
): React.ComponentProps<typeof C.BackPageHero> => {
  const title = "Export to Terra";
  const {
    exploreState: { tabValue },
  } = viewContext;
  return getExportMethodHero(tabValue, title);
};

/**
 * Build props for ExportMethod component for display of the export to terra metadata section.
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
 * @returns model to be used as props for the ExportSelectedDataSummary component.
 */
export const buildExportSelectedDataSummary = (): React.ComponentProps<
  typeof C.ExportSelectedDataSummary
> => {
  return {
    getExportSelectedDataSummary: (
      filesFacets: FileFacet[],
      summary?: SummaryResponse
    ) => getExportSelectedDataSummary(filesFacets, summary),
  };
};

/**
 * Build props for ExportToTerra component.
 * @returns model to be used as props for the ExportToTerra component.
 */
export const buildExportToTerra = (): React.ComponentProps<
  typeof C.ExportToTerra
> => {
  return {
    ExportForm: C.ExportToTerraForm,
    ExportToTerraStart: MDX.ExportToTerraStart,
    ExportToTerraSuccess: MDX.ExportToTerraSuccess,
    fileManifestType: FILE_MANIFEST_TYPE.EXPORT_TO_TERRA,
    formFacets: FORM_FACETS,
  };
};

/**
 * Build props for file data modality Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file data modality cell.
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
 * Build props for file download.
 * @param response - Response model returned from index/files API endpoint.
 * @returns Props to be used as input to file download component.
 */
export const buildFileDownload = (
  response: FilesResponse
): React.ComponentProps<typeof C.AzulFileDownload> => {
  return {
    url: getFileUrl(response),
  };
};

/**
 * Build props for file ID Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file ID cell.
 */
export const buildFileName = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileName(response),
  };
};

/**
 * Build props for file format Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file format cell.
 */
export const buildFileFormat = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileFormat(response),
  };
};

/**
 * Build props for file size Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file size cell.
 */
export const buildFileSize = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileSize(response),
  };
};

/**
 * Build props for library ID Cell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the library ID cell.
 */
export const buildLibraryId = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getLibraryId(response),
  };
};

/**
 * Build props for list view access warning Alert component.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the Alert component.
 */
export const buildListWarning = (
  _: Record<string, never>,
  viewContext: ViewContext
): React.ComponentProps<typeof C.Alert> => {
  const {
    entityConfig: { label },
  } = viewContext;
  return {
    severity: "warning",
    title: `For datasets with a 'Required' access status, ${label} are not listed.`,
    variant: "banner",
  };
};

/**
 * Build props for organism type cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the organism type cell.
 */
export const buildOrganismType = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getOrganismType(response),
  };
};

/**
 * Build props for organism type cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the organism type cell.
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
 * Build props for phenotypic sex cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
 */
export const buildPhenotypicSex = (
  response: DonorEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPhenotypicSex(response),
  };
};

/**
 * Build props for phenotypic sex cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
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
 * Build props for prep material name Cell component from the given libraries response.
 * @param response - Response model return from index/libraries API endpoint.
 * @returns model to be used as props for the prep material name cell.
 */
export const buildPrepMaterialName = (
  response: LibraryEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getPrepMaterialName(response),
  };
};

/**
 * Build props for registered identifier Cell component from the given datasets response.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the Cell component.
 */
export const buildRegisteredIdentifier = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getDatasetRegisteredIdentifier(datasetsResponse),
  };
};

/**
 * Build reported ethnicities Cell component from the given donors response. Naming is singular here to indicate
 * ethnicities are pulled from the core donor entity, even though the return value is an array.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the reported ethnicities cell.
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
  const isAccessGranted = isDatasetAccessible(datasetsResponse);
  const registeredIdentifier = getDatasetRegisteredIdentifier(datasetsResponse);
  if (isAccessGranted || registeredIdentifier === LABEL.UNSPECIFIED) {
    return;
  }
  return {
    label: "Request Access",
    target: ANCHOR_TARGET.BLANK,
    url: `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${registeredIdentifier}`,
  };
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
 * Returns true if dataset is accessible.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns true if dataset is accessible.
 */
function isDatasetAccessible(datasetsResponse: DatasetsResponse): boolean {
  return datasetsResponse.datasets[0].accessible;
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
 * Renders configuration component children when the given authentication state is not authorized.
 * @param _ - Unused.
 * @param viewContext - View context.
 * @returns model to be used as props for the ConditionalComponent component.
 */
export const renderWhenUnAuthorized = (
  _: DatasetsResponse,
  viewContext: ViewContext
): React.ComponentProps<typeof C.ConditionalComponent> => {
  const {
    authState: { isAuthorized },
  } = viewContext;
  return {
    isIn: !isAuthorized,
  };
};

/**
 * Renders entity related export when the given datasests response is accessible.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the ConditionalComponent component.
 */
export const renderExportEntity = (
  datasetsResponse: DatasetsResponse
): React.ComponentProps<typeof C.ConditionalComponent> => {
  return {
    isIn: isDatasetAccessible(datasetsResponse),
  };
};

/**
 * Renders entity related export warning when the given datasests response is not accessible.
 * @param datasetsResponse - Response model return from datasets API.
 * @returns model to be used as props for the ConditionalComponent component.
 */
export const renderExportEntityWarning = (
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
