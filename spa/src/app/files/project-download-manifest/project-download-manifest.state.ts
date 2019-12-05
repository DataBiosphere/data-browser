/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * State backing project manifest download component.
 */

// App dependencies
import { ProjectTSVUrlResponse } from "../project/project-tsv-url-response.model";

export interface ProjectDownloadManifestState {

    projectTSVUrlResponse?: ProjectTSVUrlResponse; // There may be no response yet if the request has not yet started
    projectTSVUrlCompleted: boolean;
    projectTSVUrlFailed: boolean;
    projectTSVUrlInitiated: boolean;
    projectTSVUrlInProgress: boolean;
    projectTSVUrlNotStarted: boolean;
}
