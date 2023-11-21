import { StaticImageProps } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import {
  ContributorResponse,
  PublicationResponse,
} from "../../../../../../apis/azul/hca-dcp/common/entities";
import { Override } from "../../../../../common/entities";

/**
 * Set of analysis portal names.
 */
export enum ANALYSIS_PORTAL {
  CELLXGENE = "CELLXGENE",
  GENOME_BROWSER = "GENOME_BROWSER",
  LGEA = "LGEA",
  LUNGMAP_APPS = "LUNGMAP_APPS",
  SHINY = "SHINY",
  STEM_CELL_HUB = "STEM_CELL_HUB",
  TOPPCELL = "TOPPCELL",
  UCSC_CELL_BROWSER = "CELL_BROWSER",
}

export interface AnalysisPortal {
  icon: StaticImageProps["src"];
  label: string;
  name: string;
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
