import { stringifyValues } from "@clevercanary/data-explorer-ui/lib/common/utils";
import { HCA_DCP_CATEGORY_KEY } from "../../../../../../site-config/hca-dcp/category";
import {
  processAggregatedOrArrayValue,
  processEntityValue,
} from "../../../../../apis/azul/common/utils";
import { ProjectsResponse } from "../../../../../apis/azul/hca-dcp/common/responses";
import { DATA_SUMMARY } from "./constants";

/**
 * Maps project data summary related information, included formatted display text from the given projects response.
 * @param projectsResponse - Response model return from projects API.
 * @returns data summaries key-value pairs of data summary and corresponding value.
 */
export function mapProjectDataSummary(
  projectsResponse: ProjectsResponse
): Map<DATA_SUMMARY, string> {
  const details = new Map<DATA_SUMMARY, string>();
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
  details.set(DATA_SUMMARY.DISEASE, stringifyValues(disease)); // Disease Status (Specimen)
  details.set(DATA_SUMMARY.DONOR_DISEASE, stringifyValues(donorDisease)); // Disease Status (Donor)
  details.set(
    DATA_SUMMARY.DEVELOPMENT_STAGE,
    stringifyValues(developmentStage)
  ); // Development Stage
  details.set(
    DATA_SUMMARY.LIBRARY_CONSTRUCTION_APPROACH,
    stringifyValues(libraryConstructionApproach)
  ); // Library Construction Method
  details.set(
    DATA_SUMMARY.NUCLEIC_ACID_SOURCE,
    stringifyValues(nucleicAcidSource)
  ); // Nucleic Acid Source
  return details;
}
