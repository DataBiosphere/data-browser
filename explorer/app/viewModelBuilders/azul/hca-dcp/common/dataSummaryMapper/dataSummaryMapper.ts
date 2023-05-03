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
  const projectShortname = processEntityValue(
    projectsResponse.projects,
    "projectShortname"
  );
  details.set(DATA_SUMMARY.PROJECT_SHORTNAME, projectShortname);
  details.set(DATA_SUMMARY.GENUS_SPECIES, stringifyValues(genusSpecies));
  return details;
}
