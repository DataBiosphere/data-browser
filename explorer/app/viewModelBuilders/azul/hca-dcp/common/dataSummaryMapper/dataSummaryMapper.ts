import { stringifyValues } from "@clevercanary/data-explorer-ui/lib/common/utils";
import { Value } from "@clevercanary/data-explorer-ui/lib/components/common/KeyValuePairs/keyValuePairs";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Links } from "@clevercanary/data-explorer-ui/lib/components/Links/links";
import { getConfig } from "@clevercanary/data-explorer-ui/lib/config/config";
import { HCA_DCP_CATEGORY_KEY } from "../../../../../../site-config/hca-dcp/category";
import {
  processAggregatedBooleanOrArrayValue,
  processAggregatedOrArrayValue,
  processEntityValue,
} from "../../../../../apis/azul/common/utils";
import { ProjectsResponse } from "../../../../../apis/azul/hca-dcp/common/responses";
import {
  DATA_SUMMARY,
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
  const donorDisease = processAggregatedOrArrayValue(
    projectsResponse.donorOrganisms,
    "disease"
  );
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
  return details;
}
