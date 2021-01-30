/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related values in state.
 */

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";

export interface Project {
    matrixFileLocationsByProjectId: Map<string, Map<string, FileLocation>>;
    projectTSVUrlResponsesByProjectId: Map<string, ProjectTSVUrlResponse>
}
