/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of project TSV URL response.
 */

// App dependencies
import { ProjectTSVUrlRequestStatus } from "./project-tsv-url-request-status.model";

export interface ProjectTSVUrlResponse {

    fileUrl?: string;
    retryAfter?: number;
    projectId: string;
    status: ProjectTSVUrlRequestStatus;
}
