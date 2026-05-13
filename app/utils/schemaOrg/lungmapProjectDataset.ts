import type { ProjectsResponse } from "../../apis/azul/hca-dcp/common/responses";
import type { ProjectCatalogOptions } from "./projectDataset";
import { buildProjectJsonLd } from "./projectDataset";
import type { SchemaDataset } from "./types";

const CATALOG_NAME = "LungMAP Data Explorer";

const OPTIONS: ProjectCatalogOptions = {
  catalogName: CATALOG_NAME,
  descriptionFallbackSuffix: `${CATALOG_NAME} project.`,
};

/**
 * Builds a Schema.org Dataset JSON-LD object for a LungMAP project. LungMAP
 * shares the HCA Azul backend, so the response shape matches HCA's
 * `ProjectsResponse` and the shared `buildProjectJsonLd` core does the
 * mapping; this wrapper just supplies LungMAP-specific catalog identity.
 * @param data - LungMAP project detail response from Azul.
 * @param browserURL - Site base URL used for canonical and catalog URLs.
 * @returns Schema.org Dataset JSON-LD object, or `undefined` if not buildable.
 */
export function buildLungmapProjectJsonLd(
  data: ProjectsResponse,
  browserURL: string
): SchemaDataset | undefined {
  return buildProjectJsonLd(data, browserURL, OPTIONS);
}
