import { StaticImageProps } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import {
  ContributorResponse,
  PublicationResponse,
} from "../../../../../../apis/azul/hca-dcp/common/entities";

/**
 * Set of analysis portal names.
 */
export enum ANALYSIS_PORTAL {
  CELLXGENE = "CELLXGENE",
  GENOME_BROWSER = "GENOME_BROWSER",
  LUNGMAP_APPS = "LUNGMAP_APPS",
  STEM_CELL_HUB = "STEM_CELL_HUB",
  UCSC_CELL_BROWSER = "CELL_BROWSER",
}

export interface AnalysisPortal {
  icon: StaticImageProps["src"];
  label: string;
  name: string;
  url: string;
}

export interface ProjectEdit {
  analysisPortals?: AnalysisPortal[];
  contributors?: Partial<ContributorResponse>[];
  deprecated?: boolean;
  duplicateOf?: string;
  entryId: string;
  projectShortname?: string;
  publications?: Pick<
    PublicationResponse,
    "publicationTitle" | "publicationUrl"
  >[];
  redirectUrl?: string;
  supersededBy?: string;
  withdrawn?: boolean;
}
