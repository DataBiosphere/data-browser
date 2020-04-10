/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Model of project edits-related state, persisted in local store.
 */

// App dependencies
import { Project } from "../../shared/project.model";

export interface ProjectEdits {
    projects: Project[];
    projectsById: Map<string, Project>;
}
