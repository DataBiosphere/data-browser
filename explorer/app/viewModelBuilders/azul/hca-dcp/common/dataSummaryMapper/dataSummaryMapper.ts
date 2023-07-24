import { LABEL } from "@clevercanary/data-explorer-ui/lib/apis/azul/common/entities";
import { stringifyValues } from "@clevercanary/data-explorer-ui/lib/common/utils";
import { Value } from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import {
  displaySummaryTerms,
  listSelectedTermsOfFacet,
} from "@clevercanary/data-explorer-ui/lib/components/Export/components/ExportSummary/common/utils";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Links } from "@clevercanary/data-explorer-ui/lib/components/Links/links";
import { getConfig } from "@clevercanary/data-explorer-ui/lib/config/config";
import { FileManifest } from "@clevercanary/data-explorer-ui/lib/hooks/useFileManifest/common/entities";
import { formatCountSize } from "@clevercanary/data-explorer-ui/lib/utils/formatCountSize";
import { formatFileSize } from "@clevercanary/data-explorer-ui/lib/utils/formatFileSize";
import {
  HCA_DCP_CATEGORY_KEY,
  HCA_DCP_CATEGORY_LABEL,
} from "../../../../../../site-config/hca-dcp/category";
import {
  processAggregatedBooleanOrArrayValue,
  processAggregatedNumberEntityValue,
  processAggregatedOrArrayValue,
  processEntityValue,
} from "../../../../../apis/azul/common/utils";
import { ProjectsResponse } from "../../../../../apis/azul/hca-dcp/common/responses";
import {
  getEstimatedCellCount,
  getProjectFileFormats,
} from "../viewModelBuilders";
import {
  DATA_SUMMARY,
  pipelineLinksByAnalysisProtocolKey,
  SAMPLE_ENTITY_TYPE,
  SMART_SEQ2,
  SMART_SEQ2_WORKFLOW_PATH,
} from "./constants";

/**
 * Returns library construction approach values, with "Smart-seq2" linked to a page in the Data Portal.
 * @param values - Library construction approach values.
 * @returns library construction approach values, with "Smart-seq2" value linkified.
 */
function getLibraryConstructionApproachValue(values: string[]): Value {
  // Linkify Smart-seq2 value.
  if (values.includes(SMART_SEQ2)) {
    const url = `${getConfig().browserURL}${SMART_SEQ2_WORKFLOW_PATH}`;
    return Links({
      divider: ", ",
      links: values.map((value) => {
        return {
          label: value,
          target: value === SMART_SEQ2 ? ANCHOR_TARGET.BLANK : undefined,
          url: value === SMART_SEQ2 ? url : "",
        };
      }),
    });
  }
  // Otherwise, return the values as a concatenated string.
  return stringifyValues(values);
}

/**
 * Returns the Data Portal pipeline page path for the given analysis protocol value.
 * @param analysisProtocol - Analysis protocol.
 * @returns Data Portal pipeline page path.
 */
function getPipelinePath(analysisProtocol: string): string | undefined {
  const pipelineKey = Object.keys(pipelineLinksByAnalysisProtocolKey).find(
    (key) => analysisProtocol.includes(key)
  );
  if (pipelineKey) {
    return pipelineLinksByAnalysisProtocolKey[pipelineKey];
  }
}

/**
 * Returns analysis protocol values.
 * Analysis protocols with a corresponding Data Portal pipeline page are linked to the page.
 * @param analysisProtocols - Analysis protocols.
 * @returns analysis protocols, linked to a corresponding Data Portal pipeline page.
 */
function getWorkflowValue(analysisProtocols: string[]): Value {
  const url = getConfig().browserURL;
  return Links({
    divider: ", ",
    links: analysisProtocols.map((analysisProtocol) => {
      const path = getPipelinePath(analysisProtocol);
      return {
        label: analysisProtocol,
        target: path ? ANCHOR_TARGET.BLANK : undefined,
        url: path ? `${url}${path}` : "",
      };
    }),
  });
}

/**
 * Returns true if sample entity type is "specimens".
 * @param sampleEntityTypes - Sample entity types.
 * @returns true if sample entity type is "specimens".
 */
function isSampleEntityTypeSpecimens(sampleEntityTypes: string[]): boolean {
  return (
    sampleEntityTypes.length === 1 &&
    sampleEntityTypes[0] === SAMPLE_ENTITY_TYPE.SPECIMENS
  );
}

/**
 * Returns true if workflow is specified i.e. an array with a single value of "Unspecified" is not considered specified.
 * @param workflow - Workflow.
 * @returns true if workflow is specified.
 */
function isWorkflowSpecified(workflow: string[]): boolean {
  return !(workflow.length === 1 && workflow[0] === LABEL.UNSPECIFIED);
}

/**
 * Maps project data summary related information, included formatted display text from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns data summaries key-value pairs of data summary and corresponding value.
 */
export function mapProjectDataSummary(
  projectsResponse: ProjectsResponse
): Map<DATA_SUMMARY, Value> {
  const details = new Map<DATA_SUMMARY, Value>();
  const developmentStage = processAggregatedOrArrayValue(
    projectsResponse.donorOrganisms,
    HCA_DCP_CATEGORY_KEY.DEVELOPMENT_STAGE
  );
  const disease = processAggregatedOrArrayValue(
    projectsResponse.specimens,
    "disease"
  );
  const donorCount = processAggregatedNumberEntityValue(
    projectsResponse.donorOrganisms,
    "donorCount"
  );
  const donorDisease = processAggregatedOrArrayValue(
    projectsResponse.donorOrganisms,
    "disease"
  );
  const fileFormat = getProjectFileFormats(projectsResponse);
  const genusSpecies = processAggregatedOrArrayValue(
    projectsResponse.donorOrganisms,
    HCA_DCP_CATEGORY_KEY.GENUS_SPECIES
  );
  const libraryConstructionApproach = processAggregatedOrArrayValue(
    projectsResponse.protocols,
    HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD
  );
  const modelOrgan = processAggregatedOrArrayValue(
    projectsResponse.samples,
    HCA_DCP_CATEGORY_KEY.MODEL_ORGAN
  );
  const nucleicAcidSource = processAggregatedOrArrayValue(
    projectsResponse.protocols,
    HCA_DCP_CATEGORY_KEY.NUCLEIC_ACID_SOURCE
  );
  const organ = processAggregatedOrArrayValue(
    projectsResponse.specimens,
    HCA_DCP_CATEGORY_KEY.ORGAN
  );
  const organPart = processAggregatedOrArrayValue(
    projectsResponse.specimens,
    HCA_DCP_CATEGORY_KEY.ORGAN_PART
  );
  const pairedEnd = processAggregatedBooleanOrArrayValue(
    projectsResponse.protocols,
    HCA_DCP_CATEGORY_KEY.PAIRED_END
  );
  const projectShortname = processEntityValue(
    projectsResponse.projects,
    "projectShortname"
  );
  const sampleEntityType = processAggregatedOrArrayValue(
    projectsResponse.samples,
    HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE
  );
  const selectedCellType = processAggregatedOrArrayValue(
    projectsResponse.cellSuspensions,
    HCA_DCP_CATEGORY_KEY.SELECTED_CELL_TYPE
  );
  const totalCells = getEstimatedCellCount(projectsResponse, formatCountSize);
  const workflow = processAggregatedOrArrayValue(
    projectsResponse.protocols,
    HCA_DCP_CATEGORY_KEY.WORKFLOW
  );
  details.set(DATA_SUMMARY.PROJECT_SHORTNAME, projectShortname);
  details.set(DATA_SUMMARY.GENUS_SPECIES, stringifyValues(genusSpecies));
  details.set(
    DATA_SUMMARY.SAMPLE_ENTITY_TYPE,
    stringifyValues(sampleEntityType)
  ); // Sample Type
  details.set(DATA_SUMMARY.ORGAN, stringifyValues(organ)); // Anatomical Entity
  details.set(DATA_SUMMARY.ORGAN_PART, stringifyValues(organPart)); // Organ Part
  details.set(
    DATA_SUMMARY.SELECTED_CELL_TYPE,
    stringifyValues(selectedCellType)
  ); // Selected Cell Types
  // Model organ should only display a value when sampleEntityType is cellLines or organoids i.e. "modelOrgan" will
  // not display if the sampleEntityType is "specimens".
  if (!isSampleEntityTypeSpecimens(sampleEntityType)) {
    details.set(DATA_SUMMARY.MODEL_ORGAN, stringifyValues(modelOrgan)); // Model Organ
  }
  details.set(DATA_SUMMARY.DISEASE, stringifyValues(disease)); // Disease Status (Specimen)
  details.set(DATA_SUMMARY.DONOR_DISEASE, stringifyValues(donorDisease)); // Disease Status (Donor)
  details.set(
    DATA_SUMMARY.DEVELOPMENT_STAGE,
    stringifyValues(developmentStage)
  ); // Development Stage
  details.set(
    DATA_SUMMARY.LIBRARY_CONSTRUCTION_APPROACH,
    getLibraryConstructionApproachValue(libraryConstructionApproach)
  ); // Library Construction Method
  details.set(
    DATA_SUMMARY.NUCLEIC_ACID_SOURCE,
    stringifyValues(nucleicAcidSource)
  ); // Nucleic Acid Source
  details.set(DATA_SUMMARY.PAIRED_END, stringifyValues(pairedEnd)); // Paired End
  // Workflow will not display if "Unspecified".
  if (isWorkflowSpecified(workflow)) {
    details.set(DATA_SUMMARY.WORKFLOW, getWorkflowValue(workflow)); // Analysis Protocol
  }
  details.set(DATA_SUMMARY.FILE_FORMAT, stringifyValues(fileFormat)); // File Format
  details.set(DATA_SUMMARY.TOTAL_CELLS, totalCells); // Cell Count Estimate
  details.set(DATA_SUMMARY.DONOR_COUNT, formatCountSize(donorCount)); // Donor Count
  return details;
}

/**
 * Maps export summary related information, included formatted display text from the given file manifest.
 * @param fileManifest - File manifest.
 * @returns summaries key-value pairs of data summary and corresponding value.
 */
export function mapExportSummary(
  fileManifest: FileManifest
): Map<DATA_SUMMARY | string, string> {
  const { filesFacets, fileSummary } = fileManifest;
  // Grab summary values.
  const donorCount = fileSummary.donorCount;
  const donorDisease = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.DONOR_DISEASE
  );
  const fileCount = fileSummary.fileCount;
  const genusSpecies = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.GENUS_SPECIES
  );
  const libraryConstructionApproach = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.LIBRARY_CONSTRUCTION_METHOD
  );
  const organ = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.ORGAN
  );
  const organPart = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.ORGAN_PART
  );
  const pairedEnd = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.PAIRED_END
  );
  const projectCount = fileSummary.projectCount;
  const specimenCount = fileSummary.specimenCount;
  const specimenDisease = listSelectedTermsOfFacet(
    filesFacets,
    HCA_DCP_CATEGORY_KEY.SPECIMEN_DISEASE
  );
  const totalCellCount = fileSummary.totalCellCount;
  const totalFileSize = fileSummary.totalFileSize;

  // Map summary by summary key or display text.
  const summaryBySummaryKey = new Map<DATA_SUMMARY | string, string>();
  summaryBySummaryKey.set("Estimated Cells", formatCountSize(totalCellCount));
  summaryBySummaryKey.set(
    HCA_DCP_CATEGORY_LABEL.FILE_SIZE,
    formatFileSize(totalFileSize)
  );
  summaryBySummaryKey.set("Files", formatCountSize(fileCount));
  summaryBySummaryKey.set("Projects", formatCountSize(projectCount));
  summaryBySummaryKey.set(
    DATA_SUMMARY.GENUS_SPECIES,
    displaySummaryTerms(genusSpecies)
  );
  summaryBySummaryKey.set("Donors", formatCountSize(donorCount));
  summaryBySummaryKey.set(
    DATA_SUMMARY.DONOR_DISEASE,
    displaySummaryTerms(donorDisease)
  ); // Disease Status (Donor)
  summaryBySummaryKey.set("Specimens", formatCountSize(specimenCount));
  summaryBySummaryKey.set(
    DATA_SUMMARY.DISEASE,
    displaySummaryTerms(specimenDisease)
  ); // Disease Status (Specimen)
  summaryBySummaryKey.set(DATA_SUMMARY.ORGAN, displaySummaryTerms(organ)); // Anatomical Entity
  summaryBySummaryKey.set(
    DATA_SUMMARY.ORGAN_PART,
    displaySummaryTerms(organPart)
  );
  summaryBySummaryKey.set(
    DATA_SUMMARY.LIBRARY_CONSTRUCTION_APPROACH,
    displaySummaryTerms(libraryConstructionApproach)
  ); // Library Construction Method
  summaryBySummaryKey.set(
    DATA_SUMMARY.PAIRED_END,
    displaySummaryTerms(pairedEnd)
  ); // Paired End
  return summaryBySummaryKey;
}
