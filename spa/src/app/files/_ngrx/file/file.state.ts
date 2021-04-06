/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Representation of file state.
 */

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";
import { FetchFileFileLocationRequestAction } from "./fetch-file-file-location-request.action";
import { FetchFileFileLocationSuccessAction } from "./fetch-file-file-location-success.action";
import { ClearFileFileLocationsAction } from "./clear-file-file-locations.action";
import { FileLocationStatus } from "../../file-location/file-location-status.model";

// Default file model
const DEFAULT_FILE = {
    fileFileLocationsByFileUrl: new Map<string, FileLocation>()
};

export class FileState {

    fileFileLocationsByFileUrl: Map<string, FileLocation>;

    constructor(file = DEFAULT_FILE) {

        Object.assign(this, file);
    }

    /**
     * Remove file file locations from the store.
     *
     * @param {ClearFileFileLocationsAction} action
     * @returns {FilesState}
     */
    public clearFileFileLocation(action: ClearFileFileLocationsAction): FileState {

        return new FileState({
            fileFileLocationsByFileUrl: new Map()
        });
    }

    /**
     * Create default file file location in state for the specified file location request, if a request
     * hasn't already been created for the selected file.
     *
     * @param {FetchFileFileLocationRequestAction} action
     * @returns {ProjectState}
     */
    public fetchFileFileLocationRequest(action: FetchFileFileLocationRequestAction): FileState {

        const { fileUrl } = action;

        const updatedFileLocationsByFileUrl = new Map(this.fileFileLocationsByFileUrl);
        updatedFileLocationsByFileUrl.set(fileUrl, {
            status: FileLocationStatus.REQUESTED
        });

        return new FileState({
            fileFileLocationsByFileUrl: updatedFileLocationsByFileUrl
        });
    }

    /**
     * Project manifest file location successfully been retrieved from server - store in state.
     *
     * @param {FetchFileFileLocationSuccessAction} action
     * @returns {ProjectState}
     */
    public fetchFileFileLocationSuccess(action: FetchFileFileLocationSuccessAction): FileState {

        const { fileLocation, fileUrl } = action as FetchFileFileLocationSuccessAction;
        const updatedFileLocationsByFileUrl =
            new Map(this.fileFileLocationsByFileUrl).set(fileUrl, action.fileLocation);

        return new FileState({
            fileFileLocationsByFileUrl: updatedFileLocationsByFileUrl
        });
    }

    /**
     * @returns {FilesState}
     */
    public static getDefaultState(): FileState {

        return new FileState();
    }
}
