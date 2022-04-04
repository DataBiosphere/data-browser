/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action triggered when file file location download is requested and a response has been received from Azul.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { FileLocation } from "../../file-location/file-location.model";

export class FetchFileFileLocationSuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FETCH_FILE_FILE_LOCATION_SUCCESS";
    public readonly type = FetchFileFileLocationSuccessAction.ACTION_TYPE;

    constructor(
        public readonly fileUrl: string,
        public readonly fileLocation: FileLocation
    ) {}
}
