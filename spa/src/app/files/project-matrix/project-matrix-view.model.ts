/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of matrix file associated with a project, either contributor-generated or DCP-generated.
 */

// App dependencies
import { ProjectMatrixAnalysisPortal } from "./project-matrix-analysis-portal.model";

export interface ProjectMatrixView {
    analysisPortals?: ProjectMatrixAnalysisPortal[]; // Populated from project edits JSON
    fileName: string;
    url: string;
    [key: string]: any // Allow additional meta eg library construction approach, species
}
