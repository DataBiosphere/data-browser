/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Spec of a visualization of a project matrix.  
 */

// App dependencies
import { ProjectMatrixAnalysisPortalName } from "./project-matrix-analysis-portal-name.model";

export interface ProjectMatrixAnalysisPortal {
    name: ProjectMatrixAnalysisPortalName;
    url: string;
}
