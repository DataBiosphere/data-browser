import { LABEL } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { CallToAction } from "@clevercanary/data-explorer-ui/lib/components/common/Button/components/CallToActionButton/callToActionButton";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { ViewContext } from "@clevercanary/data-explorer-ui/lib/config/entities";
import { FILE_MANIFEST_TYPE } from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/entities";
import React from "react";
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
  AggregatedLibraryResponse,
} from "../../../../apis/azul/anvil-cmg/common/aggregatedEntities";
import {
  ActivityEntityResponse,
  BioSampleEntityResponse,
  DatasetEntityResponse,
  DonorEntityResponse,
  FileEntityResponse,
  LibraryEntityResponse,
} from "../../../../apis/azul/anvil-cmg/common/entities";
import {
  DatasetsResponse,
  FilesResponse,
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
  getAggregatedPrepMaterialNames,
  getAggregatedReportedEthnicities,
  getAnatomicalSite,
  getBioSampleId,
  getBioSampleType,
  getConsentGroup,
  getDatasetBreadcrumbs,
  getDatasetDescription,
  getDatasetDetails,
  getDatasetEntryId,
  getDatasetId,
  getDatasetTitle,
  getDocumentId,
  getDonorId,
  getFileDataModalities,
  getFileFormat,
  getFileId,
  getFileName,
  getFileSize,
  getFileType,
  getFileUrl,
  getLibraryId,
  getOrganismType,
  getPhenotypicSex,
  getPrepMaterialName,
  getRegisteredIdentifier,
  getReportedEthnicities,
} from "../../../../apis/azul/anvil-cmg/common/transformers";
import * as C from "../../../../components";
import { METADATA_KEY } from "../../../../components/Index/common/entities";
import { getPluralizedMetadataLabel } from "../../../../components/Index/common/indexTransformer";
import * as MDX from "../../../../content/anvil-cmg";

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
 * Build props for phenotypic sex cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
 */
export const buildConsentGroup = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getConsentGroup(response),
  };
};

/**
 * Build props for Description component from the given entity response.
 * TODO revisit - separate from entity builder, generalize description component, revisit transformer
 * @param response - Response model return from datasets API.
 * @returns model to be used as props for the Description component.
 */
export const buildDatasetDescription = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.Description> => {
  return {
    projectDescription: getDatasetDescription(response) || "None",
  };
};

/**
 * Build props for Details component from the given datasets index or detaset detail response.
 * TODO revisit - separate from entity builder, generalize modeling/component?, revisit transformer
 * @param response - Response model return from datasets or dataset API endpoints.
 * @returns model to be used as props for the Description component.
 */
export const buildDatasetDetails = (
  response: DatasetsResponse
): React.ComponentProps<typeof C.Details> => {
  return {
    keyValuePairs: getDatasetDetails(response),
    title: "Dataset Details",
  };
};

/**
 * Build props for Hero component from the given datasets response.
 * TODO revisit - separate from entity builder, generalize modeling?, revisit transformer
 * @param response - Response model return from datasets API.
 * @returns model to be used as props for the BackPageHero component.
 */
export const buildDatasetHero = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.BackPageHero> => {
  const firstCrumb = { path: URL_DATASETS, text: "Datasets" };
  const callToAction = getDatasetCallToAction(response);
  return {
    breadcrumbs: getDatasetBreadcrumbs(firstCrumb, response),
    callToAction,
    title: getDatasetTitle(response),
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
 * Build dataset access badge component from the given index/datasets response.
 * @param response - Response model return from index/datasets API.
 * @returns model to be used as props for the dataset access cell.
 */
export const buildDatasetAccess = (
  response: DatasetsResponse
): React.ComponentProps<typeof C.AccessStatusBadge> => {
  return {
    accessible: response.datasets[0].accessible,
  };
};

/**
 * Build dataset name Cell component from the given index/datasets response.
 * @param response - Response model return from index/datasets API.
 * @returns model to be used as props for the dataset name cell.
 */
export const buildDatasetId = (
  response: DatasetsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: getDatasetId(response),
    url: `/datasets/${getDatasetEntryId(response)}`,
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
 * Build dataset name Cell component from the given index/datasets response.
 * @param response - Response model return from index/datasets API.
 * @returns model to be used as props for the dataset name cell.
 */
export const buildDatasetTitle = (
  response: DatasetsResponse
): React.ComponentProps<typeof C.Link> => {
  return {
    label: getDatasetTitle(response),
    url: `/datasets/${getDatasetEntryId(response)}`,
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
    entity: ["entryId", datasetsResponse.entryId],
    fileManifestType: FILE_MANIFEST_TYPE.ENITY_EXPORT_TO_TERRA,
    formFacets: FORM_FACETS,
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
export const buildFileId = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileId(response),
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
 * Build props for file type Cell component from the given files response.
 * @param response - Response model return from index/files API endpoint.
 * @returns model to be used as props for the file type cell.
 */
export const buildFileType = (
  response: FileEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getFileType(response),
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
 * Build props for prep material name cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated libraries.
 * @returns model to be used as props for the organism type cell.
 */
export const buildPrepMaterialNames = (
  response: AggregatedLibraryResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.LIBRARY_PREPARATION),
    values: getAggregatedPrepMaterialNames(response),
  };
};

/**
 * Build props for phenotypic sex cell component from the given donors response.
 * @param response - Response model return from index/donors API endpoint.
 * @returns model to be used as props for the phenotypic sex cell.
 */
export const buildRegisteredIdentifier = (
  response: DatasetEntityResponse
): React.ComponentProps<typeof C.Cell> => {
  return {
    value: getRegisteredIdentifier(response),
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
 * Build reported ethnicities Cell component from the given entity response.
 * @param response - Response model return from Azul that includes aggregated donors.
 * @returns model to be used as props for the reported ethnicities cell.
 */
export const buildReportedEthnicities = (
  response: AggregatedDonorResponse
): React.ComponentProps<typeof C.NTagCell> => {
  return {
    label: getPluralizedMetadataLabel(METADATA_KEY.REPORTED_ETHNICITY),
    values: getAggregatedReportedEthnicities(response),
  };
};

/**
 * Returns the callToAction prop for the Hero component from the given datasets API.
 * @param datasetEntity - Response model return from datasets API.
 * @returns model to be used as props for the CallToActionButton component.
 */
function getDatasetCallToAction(
  datasetEntity: DatasetEntityResponse
): CallToAction | undefined {
  const registeredIdentifier = getRegisteredIdentifier(datasetEntity);
  if (registeredIdentifier === LABEL.UNSPECIFIED) {
    return;
  }
  return {
    label: "Request Access",
    target: ANCHOR_TARGET.BLANK,
    url: `https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?adddataset=${registeredIdentifier}`,
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
