/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Test suite for file state.
 */

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";
import { FileState } from "./file.state";
import { ClearFileFileLocationsAction } from "./clear-file-file-locations.action";
import { FileLocationStatus } from "../../file-location/file-location-status.model";
import { FetchFileFileLocationRequestAction } from "./fetch-file-file-location-request.action";
import { FetchFileFileLocationSuccessAction } from "./fetch-file-file-location-success.action";

describe("FileState", () => {
    /**
     * Confirm file locations are reset correctly.
     */
    it("clears file locations", () => {
        const fileState = new FileState({
            fileFileLocationsByFileUrl: new Map<string, FileLocation>([
                ["foo", { status: FileLocationStatus.REQUESTED }],
            ]),
        });

        const updatedFileState = fileState.clearFileFileLocation(
            new ClearFileFileLocationsAction()
        );
        expect(updatedFileState.fileFileLocationsByFileUrl.size).toEqual(0);
    });

    /**
     * Confirm requested state of file location is set correctly.
     */
    it("sets file location as requested", () => {
        const fileState = new FileState({
            fileFileLocationsByFileUrl: new Map<string, FileLocation>(),
        });

        const fileUrl = "foo";
        const requestAction = new FetchFileFileLocationRequestAction(
            fileUrl,
            "bar",
            "baz"
        );
        const updatedFileState =
            fileState.fetchFileFileLocationRequest(requestAction);

        const fileFileLocationsByFileUrl =
            updatedFileState.fileFileLocationsByFileUrl;
        expect(fileFileLocationsByFileUrl.size).toEqual(1);

        const fileLocation = fileFileLocationsByFileUrl.get(fileUrl);
        expect(fileLocation).toBeDefined();
        expect(fileLocation.status).toEqual(FileLocationStatus.REQUESTED);
    });

    /**
     * Confirm success state of file location is set correctly.
     */
    it("updates file location on fetch success", () => {
        const fileState = new FileState({
            fileFileLocationsByFileUrl: new Map<string, FileLocation>(),
        });

        const fileUrl = "foo"; // Initial request URL
        const downloadUrl = "bar";
        const successAction = new FetchFileFileLocationSuccessAction(fileUrl, {
            fileUrl: downloadUrl,
            status: FileLocationStatus.COMPLETED,
        });
        const updatedFileState =
            fileState.fetchFileFileLocationSuccess(successAction);

        const fileFileLocationsByFileUrl =
            updatedFileState.fileFileLocationsByFileUrl;
        expect(fileFileLocationsByFileUrl.size).toEqual(1);

        const fileLocation = fileFileLocationsByFileUrl.get(fileUrl);
        expect(fileLocation).toBeDefined();
        expect(fileLocation.status).toEqual(FileLocationStatus.COMPLETED);
        expect(fileLocation.fileUrl).toEqual(downloadUrl);
    });
});
