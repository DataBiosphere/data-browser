/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of project-related state.
 */

// App dependencies
import { ClearProjectManifestFileLocationAction } from "./clear-project-manifest-file-location.action";
import { ClearProjectMatrixArchivePreviewAction } from "./clear-project-matrix-archive-preview.action";
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";
import { FetchProjectManifestFileLocationRequestAction } from "./fetch-project-manifest-file-location-request.action";
import { FetchProjectManifestFileLocationSuccessAction } from "./fetch-project-manifest-file-location-success.action";
import { FetchProjectMatrixArchivePreviewRequestAction } from "./fetch-project-matrix-archive-preview-request.action";
import { FetchProjectMatrixArchivePreviewSuccessAction } from "./fetch-project-matrix-archive-preview-success.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { FileLocation } from "../../file-location/file-location.model";
import { FileLocationStatus } from "../../file-location/file-location-status.model";
import { Project } from "./project.model";
import { ArchivePreview } from "../../project-matrix/archive-preview.model";
import { ProjectManifestSpreadsheet } from "../../project-manifest-spreadsheet/project-manifest-spreadsheet.model";
import { FetchProjectFullManifestExistsSuccessAction } from "./fetch-project-full-manifest-exists-success.action";

const DEFAULT_PROJECT = {
    matrixArchivePreviewsByProjectId: new Map<
        string,
        Map<string, ArchivePreview>
    >(),
    matrixFileLocationsByProjectId: new Map<
        string,
        Map<string, FileLocation>
    >(),
    manifestFileLocationsByProjectId: new Map<string, FileLocation>(),
    manifestSpreadsheetsByProjectId: new Map<
        string,
        ProjectManifestSpreadsheet
    >(),
};

export class ProjectState implements Project {
    matrixArchivePreviewsByProjectId: Map<string, Map<string, ArchivePreview>>; // Archive preview keyed by project then matrix UUID
    matrixFileLocationsByProjectId: Map<string, Map<string, FileLocation>>; // File locations keyed by project then file URL
    manifestFileLocationsByProjectId: Map<string, FileLocation>;
    manifestSpreadsheetsByProjectId: Map<string, ProjectManifestSpreadsheet>;

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
    public clearProjectManifestFileLocation(
        action: ClearProjectManifestFileLocationAction
    ): ProjectState {
        const updatedResponsesByProjectId = new Map(
            this.manifestFileLocationsByProjectId
        );
        updatedResponsesByProjectId.delete(action.projectId);

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId: updatedResponsesByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Clear stored project matrix file locations.
     *
     * @param {ClearProjectMatrixFileLocationsAction} action
     * @returns {ProjectState}
     */
    public clearProjectMatrixFileLocations(
        action: ClearProjectMatrixFileLocationsAction
    ): ProjectState {
        const updatedLocationsByProjectId = new Map(
            this.matrixFileLocationsByProjectId
        );
        updatedLocationsByProjectId.delete(action.projectId);

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: updatedLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Clear stored project matrix archives.
     *
     * @param {ClearProjectMatrixArchivePreviewAction} action
     * @returns {ProjectState}
     */
    public clearProjectMatrixArchivePreviews(
        action: ClearProjectMatrixArchivePreviewAction
    ): ProjectState {
        const updatedArchivesByProjectId = new Map(
            this.matrixArchivePreviewsByProjectId
        );
        updatedArchivesByProjectId.delete(action.projectId);

        return new ProjectState({
            matrixArchivePreviewsByProjectId: updatedArchivesByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Create default project manifest file location in state for the specified file location request, if a request
     * hasn't already been created for the selected file.
     *
     * @param {FetchProjectManifestFileLocationRequestAction} action
     * @returns {ProjectState}
     */
    public fetchProjectManifestFileLocationRequest(
        action: FetchProjectManifestFileLocationRequestAction
    ): ProjectState {
        const { project } = action;

        const updatedLocationsByProjectId = new Map(
            this.manifestFileLocationsByProjectId
        );
        updatedLocationsByProjectId.set(project.entryId, {
            status: FileLocationStatus.NOT_STARTED,
        });

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId: updatedLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Project manifest file location successfully been retrieved from server - store in state.
     *
     * @param {FetchProjectManifestFileLocationSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectManifestFileLocationSuccess(
        action: FetchProjectManifestFileLocationSuccessAction
    ): ProjectState {
        const updatedResponsesByProjectId = new Map(
            this.manifestFileLocationsByProjectId
        ).set(action.projectId, action.fileLocation);

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId: updatedResponsesByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Fetch of project manifest spreadsheet successfully has completed - store in state.
     */
    public fetchProjectManifestSpreadsheetSuccess(
        action: FetchProjectFullManifestExistsSuccessAction
    ): ProjectState {
        const { projectManifestSpreadsheet } =
            action as FetchProjectFullManifestExistsSuccessAction;

        const updatedManifestSpreadsheetsByProjectId = new Map(
            this.manifestSpreadsheetsByProjectId
        );
        updatedManifestSpreadsheetsByProjectId.set(
            projectManifestSpreadsheet.projectId,
            projectManifestSpreadsheet
        );

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                updatedManifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Create project archive in state for the specified project matrix.
     *
     * @param {FetchProjectMatrixArchivePreviewRequestAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixArchivePreviewRequest(
        action: FetchProjectMatrixArchivePreviewRequestAction
    ): ProjectState {
        const { matrixId, project } = action;
        const { entryId: projectId } = project;

        // Noop if project matrix archive preview has already been requested for this project.
        if (
            this.matrixArchivePreviewsByProjectId.has(projectId) &&
            this.matrixArchivePreviewsByProjectId.get(projectId).has(matrixId)
        ) {
            return this;
        }

        const updatedArchivesByProjectId = new Map(
            this.matrixArchivePreviewsByProjectId
        );

        if (!updatedArchivesByProjectId.has(projectId)) {
            updatedArchivesByProjectId.set(
                projectId,
                new Map<string, ArchivePreview>()
            );
        }
        const archivesByMatrixId = updatedArchivesByProjectId.get(projectId);
        archivesByMatrixId.set(matrixId, {
            loading: true,
        });

        return new ProjectState({
            matrixArchivePreviewsByProjectId: updatedArchivesByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Update project matrix archive in state.
     *
     * @param {FetchProjectMatrixArchivePreviewSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixArchivePreviewSuccess(
        action: FetchProjectMatrixArchivePreviewSuccessAction
    ): ProjectState {
        const { archiveFiles, matrixId, projectId } = action;

        const updatedArchivesByProjectId = new Map(
            this.matrixArchivePreviewsByProjectId
        );

        if (!updatedArchivesByProjectId.has(projectId)) {
            updatedArchivesByProjectId.set(
                projectId,
                new Map<string, ArchivePreview>()
            );
        }
        const archivesByMatrixId = updatedArchivesByProjectId.get(projectId);
        archivesByMatrixId.set(matrixId, {
            archiveFiles,
            loading: false,
        });

        return new ProjectState({
            matrixArchivePreviewsByProjectId: updatedArchivesByProjectId,
            matrixFileLocationsByProjectId: this.matrixFileLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Create default project matrix file location in state for the specified file location request, if a request
     * hasn't already been created for the selected file.
     *
     * @param {FetchProjectMatrixFileLocationRequestAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixFileLocationRequest(
        action: FetchProjectMatrixFileLocationRequestAction
    ): ProjectState {
        const { fileUrl, project } = action;
        const projectId = project.entryId;

        const updatedLocationsByProjectId = new Map(
            this.matrixFileLocationsByProjectId
        );

        if (!updatedLocationsByProjectId.has(projectId)) {
            updatedLocationsByProjectId.set(
                projectId,
                new Map<string, FileLocation>()
            );
        }
        const fileLocationsByFileUrl =
            updatedLocationsByProjectId.get(projectId);
        fileLocationsByFileUrl.set(fileUrl, {
            status: FileLocationStatus.NOT_STARTED,
        });

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: updatedLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * Update project matrix file location in state.
     *
     * @param {FetchProjectMatrixFileLocationSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchProjectMatrixFileLocationSuccess(
        action: FetchProjectMatrixFileLocationSuccessAction
    ): ProjectState {
        const { fileLocation, fileUrl, projectId } = action;

        const updatedLocationsByProjectId = new Map(
            this.matrixFileLocationsByProjectId
        );

        if (!updatedLocationsByProjectId.has(projectId)) {
            updatedLocationsByProjectId.set(
                projectId,
                new Map<string, FileLocation>()
            );
        }
        const fileLocationsByFileUrl =
            updatedLocationsByProjectId.get(projectId);
        fileLocationsByFileUrl.set(fileUrl, fileLocation);

        return new ProjectState({
            matrixArchivePreviewsByProjectId:
                this.matrixArchivePreviewsByProjectId,
            matrixFileLocationsByProjectId: updatedLocationsByProjectId,
            manifestFileLocationsByProjectId:
                this.manifestFileLocationsByProjectId,
            manifestSpreadsheetsByProjectId:
                this.manifestSpreadsheetsByProjectId,
        });
    }

    /**
     * @returns {ProjectState}
     */
    public static getDefaultState() {
        return new ProjectState();
    }
}
