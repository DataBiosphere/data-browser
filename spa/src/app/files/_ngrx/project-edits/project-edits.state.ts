/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project edits-related state persisted in local store.
 */

// App dependencies
import { FetchProjectEditsSuccessAction } from "./fetch-project-edits-success.action";
import { ProjectEdits } from "./project-edits.model";
import { Project } from "../../shared/project.model";

export class ProjectEditsState implements ProjectEdits {

    projects: Project[];
    projectsById: Map<string, Project>;

    /**
     * @param {Project[]} projects
     */
    constructor(projects) {
        this.projects = projects;
        this.projectsById = projects.reduce((accum, project) => {
            accum.set(project.entryId, project);
            return accum;
        }, new Map<string, Project>());
    }

    /**
     * @returns {ProjectEditsState}
     */
    public fetchProjectEditsRequest(): ProjectEditsState {
        return this;
    }

    /**
     * Project edits data has been successfully read from local JSON, store it.
     * 
     * @param {FetchProjectEditsSuccessAction} action
     * @returns {ProjectEditsState}
     */
    public fetchProjectEditsSuccess(action: FetchProjectEditsSuccessAction): ProjectEditsState {

        return new ProjectEditsState(action.projects);
    }

    /**
     * @returns {ProjectEditsState}
     */
    public static getDefaultState() {
        return new ProjectEditsState([]);
    }
}
