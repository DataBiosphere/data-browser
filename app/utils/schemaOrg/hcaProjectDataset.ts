import type { ProjectsResponse } from "../../apis/azul/hca-dcp/common/responses";
import type { ProjectCatalogOptions } from "./projectDataset";
import { buildProjectJsonLd } from "./projectDataset";
import type { SchemaDataset } from "./types";

const CATALOG_NAME = "Human Cell Atlas Data Coordination Platform";

const OPTIONS: ProjectCatalogOptions = {
  catalogName: CATALOG_NAME,
  descriptionFallbackSuffix: `${CATALOG_NAME} project.`,
};

/**
 * Builds a Schema.org Dataset JSON-LD object for an HCA DCP project.
 * @param data - HCA DCP project detail response from Azul.
 * @param browserURL - Site base URL used for canonical and catalog URLs.
 * @returns Schema.org Dataset JSON-LD object, or `undefined` if not buildable.
 */
export function buildHcaProjectJsonLd(
  data: ProjectsResponse,
  browserURL: string
): SchemaDataset | undefined {
  return buildProjectJsonLd(data, browserURL, OPTIONS);
}
