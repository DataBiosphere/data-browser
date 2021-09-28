/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested file manifest URL as part of a get data or project-specific download.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";

export class FetchFileManifestUrlRequestAction implements Action {
    
    public static ACTION_TYPE = "FILE_MANIFEST.FETCH_FILE_MANIFEST_URL_REQUEST";
    public readonly type = FetchFileManifestUrlRequestAction.ACTION_TYPE;

    /**
     * @param {ManifestDownloadFormat} manifestFormat
     * @param {boolean} projectDownload - True if request is for project-specific downloads. This can be removed once
     * selected search terms for get data downloads is moved to use the download-specific selected search terms and
     * not the app-wide selected search terms.
     */
    constructor(public readonly manifestFormat = ManifestDownloadFormat.COMPACT,
                public readonly projectDownload?: boolean) {}
}
