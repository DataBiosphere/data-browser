import { LABEL } from "@databiosphere/findable-ui/lib/apis/azul/common/entities";
import { stringifyValues } from "@databiosphere/findable-ui/lib/common/utils";
import { Value } from "@databiosphere/findable-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { NTagCell } from "@databiosphere/findable-ui/lib/components/Index/components/NTagCell/nTagCell";
import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { Links } from "@databiosphere/findable-ui/lib/components/Links/links";
import { formatCountSize } from "@databiosphere/findable-ui/lib/utils/formatCountSize";
import { METADATA_KEY } from "app/components/Index/common/entities";
import { getPluralizedMetadataLabel } from "app/components/Index/common/indexTransformer";
import { HCA_DCP_CATEGORY_KEY } from "../../../../../../site-config/hca-dcp/category";
import {
  processAggregatedBooleanOrArrayValue,
  processAggregatedNumberEntityValue,
  processAggregatedOrArrayValue,
  processEntityValue,
} from "../../../../../apis/azul/common/utils";
import { ProjectsResponse } from "../../../../../apis/azul/hca-dcp/common/responses";
import * as C from "../../../../../components/index";
import {
  getEstimatedCellCount,
  getProjectFileFormats,
} from "../viewModelBuilders";
import {
  DATA_SUMMARY,
  pipelineLinksByAnalysisProtocolKey,
  SAMPLE_ENTITY_TYPE,
} from "./constants";

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
  return Links({
    divider: ", ",
    links: analysisProtocols.map((analysisProtocol) => {
      const path = getPipelinePath(analysisProtocol);
      return {
        label: analysisProtocol,
        target: path ? ANCHOR_TARGET.BLANK : undefined,
        url: path || "",
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
  details.set(
    DATA_SUMMARY.PROJECT_SHORTNAME,
    C.TypographyWordBreak({ children: projectShortname })
  );
  details.set(
    DATA_SUMMARY.GENUS_SPECIES,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.SPECIES),
      values: genusSpecies,
    })
  );
  details.set(
    DATA_SUMMARY.SAMPLE_ENTITY_TYPE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.SAMPLE_TYPE),
      values: sampleEntityType,
    })
  ); // Sample Type
  details.set(
    DATA_SUMMARY.ORGAN,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.ANATOMICAL_ENTITY),
      values: organ,
    })
  ); // Anatomical Entity
  details.set(
    DATA_SUMMARY.ORGAN_PART,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.ORGAN_PART),
      values: organPart,
    })
  ); // Organ Part
  details.set(
    DATA_SUMMARY.SELECTED_CELL_TYPE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.SELECTED_CELL_TYPE),
      values: selectedCellType,
    })
  ); // Selected Cell Types
  // Model organ should only display a value when sampleEntityType is cellLines or organoids i.e. "modelOrgan" will
  // not display if the sampleEntityType is "specimens".
  if (!isSampleEntityTypeSpecimens(sampleEntityType)) {
    details.set(
      DATA_SUMMARY.MODEL_ORGAN,
      NTagCell({
        label: getPluralizedMetadataLabel(METADATA_KEY.MODEL_ORGAN),
        values: modelOrgan,
      })
    ); // Model Organ
  }
  details.set(
    DATA_SUMMARY.DISEASE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_STATUS_SPECIMEN),
      values: disease,
    })
  ); // Disease Status (Specimen)
  details.set(
    DATA_SUMMARY.DONOR_DISEASE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.DISEASE_STATUS_DONOR),
      values: donorDisease,
    })
  ); // Disease Status (Donor)
  details.set(
    DATA_SUMMARY.DEVELOPMENT_STAGE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.DEVELOPMENT_STAGE),
      values: developmentStage,
    })
  ); // Development Stage
  details.set(
    DATA_SUMMARY.LIBRARY_CONSTRUCTION_APPROACH,
    NTagCell({
      label: getPluralizedMetadataLabel(
        METADATA_KEY.LIBRARY_CONSTRUCTION_APPROACH
      ),
      values: libraryConstructionApproach,
    })
  ); // Library Construction Method
  details.set(
    DATA_SUMMARY.NUCLEIC_ACID_SOURCE,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.NUCLEIC_ACID_SOURCE),
      values: nucleicAcidSource,
    })
  ); // Nucleic Acid Source
  details.set(DATA_SUMMARY.PAIRED_END, stringifyValues(pairedEnd)); // Paired End
  // Workflow will not display if "Unspecified".
  if (isWorkflowSpecified(workflow)) {
    details.set(DATA_SUMMARY.WORKFLOW, getWorkflowValue(workflow)); // Analysis Protocol
  }
  details.set(
    DATA_SUMMARY.FILE_FORMAT,
    NTagCell({
      label: getPluralizedMetadataLabel(METADATA_KEY.FILE_FORMAT),
      values: fileFormat,
    })
  ); // File Format
  details.set(DATA_SUMMARY.TOTAL_CELLS, totalCells); // Cell Count Estimate
  details.set(DATA_SUMMARY.DONOR_COUNT, formatCountSize(donorCount)); // Donor Count
  return details;
}
