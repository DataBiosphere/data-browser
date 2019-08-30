/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related state.
 */

// App dependencies
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { Project } from "./project.model";
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";
import { ClearProjectTSVUrlAction } from "./clear-project-tsv-url.action";

const DEFAULT_PROJECT = {
    projectTSVUrlResponsesByProjectId: new Map<string, ProjectTSVUrlResponse>()
};

export class ProjectState implements Project {

    projectTSVUrlResponsesByProjectId: Map<string, ProjectTSVUrlResponse>;

    /**
     * @param {ProjectState} state
     */
    constructor(state: Project = DEFAULT_PROJECT) {
        Object.assign(this, state);
    }

    /**
     * Remove the specified project TSV URL from the state.
     * 
     * @param {ClearProjectTSVUrlAction} action
     * @returns {ProjectState}
     */
    public clearProjectTSVUrl(action: ClearProjectTSVUrlAction): ProjectState {

        const updatedResponsesByProjectId = new Map(this.projectTSVUrlResponsesByProjectId);
        updatedResponsesByProjectId.delete(action.projectId);

        return new ProjectState({
            projectTSVUrlResponsesByProjectId: updatedResponsesByProjectId
        });
    }

    /**
     * Project TSV URL has successfully been retrieved from server - store in state.
     * 
     * @param {FetchProjectTSVUrlSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectTSVUrlSuccess(action: FetchProjectTSVUrlSuccessAction): ProjectState {

        const response = action.response;

        const updatedResponsesByProjectId =
            new Map(this.projectTSVUrlResponsesByProjectId).set(response.projectId, response);

        return new ProjectState({
            projectTSVUrlResponsesByProjectId: updatedResponsesByProjectId
        });
    }

    /**
     * @returns {ProjectState}
     */
    public static getDefaultState() {
        return new ProjectState();
    }
}
