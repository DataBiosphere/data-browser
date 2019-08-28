/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related values in state.
 */

// App dependencies
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";

export interface Project {
    projectTSVUrlResponsesByProjectId: Map<string, ProjectTSVUrlResponse>
}
