/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related state.
 */

// App dependencies
import { ClearProjectManifestFileLocationAction } from "./clear-project-manifest-file-location.action";
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";
import { FetchProjectManifestFileLocationRequestAction } from "./fetch-project-manifest-file-location-request.action";
import { FetchProjectManifestFileLocationSuccessAction } from "./fetch-project-manifest-file-location-success.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { FileLocation } from "../../file-location/file-location.model";
import { FileLocationStatus } from "../../file-location/file-location-status.model";
import { Project } from "./project.model";

const DEFAULT_PROJECT = {
    matrixFileLocationsByProjectId: new Map<string, Map<string, FileLocation>>(),
    manifestFileLocationsByProjectId: new Map<string, FileLocation>()
};

export class ProjectState implements Project {

    matrixFileLocationsByProjectId: Map<string, Map<string, FileLocation>>; // File locations keyed by project then file URL
    manifestFileLocationsByProjectId: Map<string, FileLocation>;

    /**
     * @param {ProjectState} state
     */
    constructor(state: Project = DEFAULT_PROJECT) {

        Object.assign(this, state);
    }

    /**
     * Remove the specified project manifest file location from the store.
     *
     * @param {ClearProjectManifestFileLocationAction} action
     * @returns {ProjectState}
     */
    public clearProjectManifestFileLocation(action: ClearProjectManifestFileLocationAction): ProjectState {

        const updatedResponsesByProjectId = new Map(this.manifestFileLocationsByProjectId);
        updatedResponsesByProjectId.delete(action.projectId);

        return new ProjectState({
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId: updatedResponsesByProjectId
        });
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
            manifestFileLocationsByProjectId: this.manifestFileLocationsByProjectId
        });
    }

    /**
     * Create default project manifest file location in state for the specified file location request, if a request
     * hasn't already been created for the selected file.
     *
     * @param {FetchProjectManifestFileLocationRequestAction} action
     * @returns {ProjectState}
     */
    public fetchProjectManifestFileLocationRequest(action: FetchProjectManifestFileLocationRequestAction): ProjectState {

        const {project} = action;

        const updatedLocationsByProjectId = new Map(this.manifestFileLocationsByProjectId);
        updatedLocationsByProjectId.set(project.entryId, {
            status: FileLocationStatus.NOT_STARTED
        });

        return new ProjectState({
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId: updatedLocationsByProjectId
        });
    }

    /**
     * Project manifest file location successfully been retrieved from server - store in state.
     *
     * @param {FetchProjectManifestFileLocationSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectManifestFileLocationSuccess(action: FetchProjectManifestFileLocationSuccessAction): ProjectState {

        const updatedResponsesByProjectId =
            new Map(this.manifestFileLocationsByProjectId).set(action.projectId, action.fileLocation);

        return new ProjectState({
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId: updatedResponsesByProjectId
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
            manifestFileLocationsByProjectId: this.manifestFileLocationsByProjectId
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
            manifestFileLocationsByProjectId: this.manifestFileLocationsByProjectId
        });
    }

    /**
     * @returns {ProjectState}
     */
    public static getDefaultState() {

        return new ProjectState();
    }
}
