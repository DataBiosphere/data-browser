/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * View-specific model of matrix file associated with a project, either contributor-generated or DCP-generated.
 */

// App dependencies
import { ProjectAnalysisPortal } from "../project-analysis-portal/project-analysis-portal.model";

export interface ProjectMatrixView {
    analysisPortals?: ProjectAnalysisPortal[]; // Populated from project edits JSON
    fileName: string;
    size: number;
    url: string;
    [key: string]: any // Allow additional meta eg library construction approach, species
}
