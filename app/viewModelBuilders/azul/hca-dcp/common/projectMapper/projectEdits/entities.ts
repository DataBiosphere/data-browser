import { StaticImageProps } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { Override } from "@databiosphere/findable-ui/lib/config/entities";
import {
  ContributorResponse,
  PublicationResponse,
} from "../../../../../../apis/azul/hca-dcp/common/entities";

/**
 * Set of analysis portal names.
 */
export enum ANALYSIS_PORTAL {
  CZ_CELLXGENE = "CZ_CELLXGENE",
  GENOME_BROWSER = "GENOME_BROWSER",
  LGEA = "LGEA",
  LUNGMAP_APPS = "LUNGMAP_APPS",
  SHINY = "SHINY",
  SINGLE_CELL = "SINGLE_CELL",
  STEM_CELL_HUB = "STEM_CELL_HUB",
  TOPPCELL = "TOPPCELL",
  UCSC_CELL_BROWSER = "CELL_BROWSER",
}

export interface AnalysisPortal {
  icon: StaticImageProps["src"];
  label: string;
  name: ANALYSIS_PORTAL;
  url: string;
}

export interface ProjectEdit extends Override {
  analysisPortals?: AnalysisPortal[];
  contributors?: Partial<ContributorResponse>[];
  projectShortname?: string;
  publications?: Pick<
    PublicationResponse,
    "publicationTitle" | "publicationUrl"
  >[];
}

export interface CellxGeneProjectMapping {
  cellxgeneId: string;
  hcaProjectId: string;
}
