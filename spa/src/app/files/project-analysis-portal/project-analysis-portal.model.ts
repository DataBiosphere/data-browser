/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of an project-level analysis portal.
 */

// App dependencies
import { ProjectAnalysisPortalName } from "./project-analysis-portal-name.model";

export interface ProjectAnalysisPortal {
    name: ProjectAnalysisPortalName;
    url: string;
    uuid: string;
}
