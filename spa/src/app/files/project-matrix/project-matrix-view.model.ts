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
    contentDescription: string[];
    fileName: string;
    id: string; // Matrix uuid
    matrixCellCount?: number; // Count can be null or >= 0.
    size: number;
    url: string;
    version: string;
    [key: string]: any; // Allow additional meta eg library construction approach, species
}
