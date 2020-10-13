/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested file manifest URL.
 */

// Core dependencies
import { Action } from "@ngrx/store";
import { ManifestDownloadFormat } from "../../shared/manifest-download-format.model";

export class FetchFileManifestUrlRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.FETCH_FILE_MANIFEST_URL_REQUEST";
    public readonly type = FetchFileManifestUrlRequestAction.ACTION_TYPE;
    constructor(public readonly manifestFormat = ManifestDownloadFormat.COMPACT) {}
}
