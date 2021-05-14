/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of an project matrix analysis portal.  
 */

// App dependencies
import { ProjectMatrixAnalysisPortalName } from "./project-matrix-analysis-portal-name.model";

export interface ProjectMatrixAnalysisPortal {
    name: ProjectMatrixAnalysisPortalName;
    url: string;
    uuid: string;
}
