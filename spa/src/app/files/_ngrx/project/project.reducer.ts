/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Reducer handling project-related actions.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ClearProjectManifestFileLocationAction } from "./clear-project-manifest-file-location.action";
import { ClearProjectMatrixFileLocationsAction } from "./clear-project-matrix-file-locations.action";
import { FetchProjectManifestFileLocationRequestAction } from "./fetch-project-manifest-file-location-request.action";
import { FetchProjectManifestFileLocationSuccessAction } from "./fetch-project-manifest-file-location-success.action";
import { FetchProjectMatrixFileLocationRequestAction } from "./fetch-project-matrix-file-location-request.action";
import { FetchProjectMatrixFileLocationSuccessAction } from "./fetch-project-matrix-file-location-success.action";
import { ProjectState } from "./project.state";
import { ClearProjectMatrixArchivePreviewAction } from "./clear-project-matrix-archive-preview.action";
import { FetchProjectMatrixArchivePreviewRequestAction } from "./fetch-project-matrix-archive-preview-request.action";
import { FetchProjectMatrixArchivePreviewSuccessAction } from "./fetch-project-matrix-archive-preview-success.action";
import { FetchProjectFullManifestExistsSuccessAction } from "./fetch-project-full-manifest-exists-success.action";

export function reducer(
    state: ProjectState = ProjectState.getDefaultState(),
    action: Action
): ProjectState {
    switch (action.type) {
        // Clear project matrix archive previews
        case ClearProjectMatrixArchivePreviewAction.ACTION_TYPE:
            return state.clearProjectMatrixArchivePreviews(
                action as ClearProjectMatrixFileLocationsAction
            );

        // Clear project matrix file locations
        case ClearProjectMatrixFileLocationsAction.ACTION_TYPE:
            return state.clearProjectMatrixFileLocations(
                action as ClearProjectMatrixFileLocationsAction
            );

        // Clear project manifest file location
        case ClearProjectManifestFileLocationAction.ACTION_TYPE:
            return state.clearProjectManifestFileLocation(
                action as ClearProjectManifestFileLocationAction
            );

        // Project manifest file location has been requested - update store
        case FetchProjectManifestFileLocationRequestAction.ACTION_TYPE:
            return state.fetchProjectManifestFileLocationRequest(
                action as FetchProjectManifestFileLocationRequestAction
            );

        // Project manifest file location has been successfully received from server - update store
        case FetchProjectManifestFileLocationSuccessAction.ACTION_TYPE:
            return state.fetchProjectManifestFileLocationSuccess(
                action as FetchProjectManifestFileLocationSuccessAction
            );

        // Fetch manifest spreadsheet has been requested - update store.
        case FetchProjectFullManifestExistsSuccessAction.ACTION_TYPE:
            return state.fetchProjectManifestSpreadsheetSuccess(
                action as FetchProjectFullManifestExistsSuccessAction
            );

        // Project matrix archive preview has been requested - update store
        case FetchProjectMatrixArchivePreviewRequestAction.ACTION_TYPE:
            return state.fetchProjectMatrixArchivePreviewRequest(
                action as FetchProjectMatrixArchivePreviewRequestAction
            );

        // Project matrix archive preview has been successfully retrieved from server - update store
        case FetchProjectMatrixArchivePreviewSuccessAction.ACTION_TYPE:
            return state.fetchProjectMatrixArchivePreviewSuccess(
                action as FetchProjectMatrixArchivePreviewSuccessAction
            );

        // Project matrix file location has been requested - update store
        case FetchProjectMatrixFileLocationRequestAction.ACTION_TYPE:
            return state.fetchProjectMatrixFileLocationRequest(
                action as FetchProjectMatrixFileLocationRequestAction
            );

        // Project matrix file location has been successfully retrieved from server - update store
        case FetchProjectMatrixFileLocationSuccessAction.ACTION_TYPE:
            return state.fetchProjectMatrixFileLocationSuccess(
                action as FetchProjectMatrixFileLocationSuccessAction
            );

        default:
            return state;
    }
}
