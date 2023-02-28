import { GenusSpecies, ProjectAnalysisPortalName } from "./constants";

/**
 * Model of a project-level analysis portal.
 */
export interface ProjectAnalysisPortal {
  name: ProjectAnalysisPortalName;
  url: string;
  uuid: string;
}

/**
 * View-specific model of matrix files associated with a project, either contributor-generated or DCP-generated, grouped
 * by species.
 */
export interface ProjectMatrixTableView {
  projectMatrixViews: ProjectMatrixView[];
  species: GenusSpecies[];
}

/**
 * View-specific model of matrix file (without meta) associated with a project, either contributor-generated or DCP-generated.
 */
export interface ProjectMatrixView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO - revisit type for meta
  [key: string]: any;

  // Populated from project edits JSON.
  analysisPortals?: ProjectAnalysisPortal[];
  // Allow additional meta e.g. library construction approach, species.
  contentDescription: string[];
  fileName: string;
  // Matrix uuid.
  id: string;
  // Count can be null or >= 0.
  matrixCellCount?: number;
  size: number;
  url: string;

  version: string;
}
