/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related values in state.
 */

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";

export interface Project {
    matrixFileLocationsByProjectId: Map<string, Map<string, FileLocation>>;
    manifestFileLocationsByProjectId: Map<string, FileLocation>
}
