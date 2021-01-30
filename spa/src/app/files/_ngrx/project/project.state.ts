/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related state.
 */

// App dependencies
import { ClearProjectTSVUrlAction } from "./clear-project-tsv-url.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { FetchProjectTSVUrlSuccessAction } from "./fetch-project-tsv-url-success.action";
import { FileLocation } from "../../file-location/file-location.model";
import { Project } from "./project.model";
import { ProjectTSVUrlResponse } from "../../project/project-tsv-url-response.model";
import { FileLocationStatus } from "../../file-location/file-location-status.model";
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";

const DEFAULT_PROJECT = {
    matrixFileLocationsByProjectId: new Map<string, Map<string, FileLocation>>(),
    projectTSVUrlResponsesByProjectId: new Map<string, ProjectTSVUrlResponse>()
};

export class ProjectState implements Project {

    matrixFileLocationsByProjectId: Map<string, Map<string, FileLocation>>; // File locations keyed by project then file URL
    projectTSVUrlResponsesByProjectId: Map<string, ProjectTSVUrlResponse>;

    /**
     * @param {ProjectState} state
     */
    constructor(state: Project = DEFAULT_PROJECT) {
        Object.assign(this, state);
    }

    /**
     * Clear stored project matrix file locations.
     * 
     * @param {ClearProjectMatrixFileLocationsAction} action
     * @returns {ProjectState}
     */
    public clearProjectMatrixFileLocations(action: ClearProjectMatrixFileLocationsAction): ProjectState {

        const updatedLocationsByProjectId =
            new Map(this.matrixFileLocationsByProjectId);
        updatedLocationsByProjectId.delete(action.projectId);
        
        return new ProjectState({
            matrixFileLocationsByProjectId: updatedLocationsByProjectId,
            projectTSVUrlResponsesByProjectId: this.projectTSVUrlResponsesByProjectId
        });
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
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            projectTSVUrlResponsesByProjectId: updatedResponsesByProjectId
        });
    }

    /**
     * Create default project matrix file location in state for the specified file location request, if a request
     * hasn't already been created for the selected file.
     *
     * @param {FetchProjectMatrixFileLocationRequestAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixFileLocationRequest(action: FetchProjectMatrixFileLocationRequestAction): ProjectState {

        const { fileUrl, project } = action;
        const projectId = project.entryId;

        const updatedLocationsByProjectId =
            new Map(this.matrixFileLocationsByProjectId);

        if ( !updatedLocationsByProjectId.has(projectId) ) {
            updatedLocationsByProjectId.set(projectId, new Map<string, FileLocation>());
        }
        const fileLocationsByFileUrl = updatedLocationsByProjectId.get(projectId);
        fileLocationsByFileUrl.set(fileUrl, {
            status: FileLocationStatus.NOT_STARTED
        });

        return new ProjectState({
            matrixFileLocationsByProjectId: updatedLocationsByProjectId,
            projectTSVUrlResponsesByProjectId: this.projectTSVUrlResponsesByProjectId
        });
    }

    /**
     * Update project matrix file location in state.
     *
     * @param {FetchProjectMatrixFileLocationSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixFileLocationSuccess(action: FetchProjectMatrixFileLocationSuccessAction): ProjectState {

        const { fileLocation, fileUrl, projectId } = action;

        const updatedLocationsByProjectId =
            new Map(this.matrixFileLocationsByProjectId);
        
        
        if ( !updatedLocationsByProjectId.has(projectId) ) {
            updatedLocationsByProjectId.set(projectId, new Map<string, FileLocation>());
        }
        const fileLocationsByFileUrl = updatedLocationsByProjectId.get(projectId);
        fileLocationsByFileUrl.set(fileUrl, fileLocation);

        return new ProjectState({
            matrixFileLocationsByProjectId: updatedLocationsByProjectId,
            projectTSVUrlResponsesByProjectId: this.projectTSVUrlResponsesByProjectId
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
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
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
