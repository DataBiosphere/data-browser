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
  const genusSpecies = processAggregatedOrArrayValue(
    projectsResponse.donorOrganisms,
    HCA_DCP_CATEGORY_KEY.GENUS_SPECIES
  );
  const organ = processAggregatedOrArrayValue(
    projectsResponse.specimens,
    HCA_DCP_CATEGORY_KEY.ORGAN
  );
  const projectShortname = processEntityValue(
    projectsResponse.projects,
    "projectShortname"
  );
  const sampleEntityType = processAggregatedOrArrayValue(
    projectsResponse.samples,
    HCA_DCP_CATEGORY_KEY.SAMPLE_ENTITY_TYPE
  );
  details.set(DATA_SUMMARY.PROJECT_SHORTNAME, projectShortname);
  details.set(DATA_SUMMARY.GENUS_SPECIES, stringifyValues(genusSpecies));
  details.set(
    DATA_SUMMARY.SAMPLE_ENTITY_TYPE,
    stringifyValues(sampleEntityType)
  ); // Sample Type
  details.set(DATA_SUMMARY.ORGAN, stringifyValues(organ)); // Anatomical Entity
  return details;
}
