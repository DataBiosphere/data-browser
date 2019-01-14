import { Action } from "@ngrx/store";
import { FileManifestSummary } from "../../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "app/shared/dictionary";
import { ManifestResponse } from "../../shared/manifest-response.model";

export class FetchFileManifestSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchFileManifestSummaryRequestAction.ACTION_TYPE;
    constructor() {}
}

export class FetchFileManifestSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.FETCH_SUCCESS";
    public readonly type = FetchFileManifestSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileManifestSummary: Dictionary<FileManifestSummary>) {}
}

export class DownloadFileManifestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.DOWNLOAD";
    public readonly type = DownloadFileManifestAction.ACTION_TYPE;
    constructor() {}
}

// Action dispatched on request of manifest download
export class DownloadFileManifestRequestedAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.DOWNLOAD_REQUESTED";
    public readonly type = DownloadFileManifestRequestedAction.ACTION_TYPE;
    constructor(public readonly response: ManifestResponse) {}
}

export type All
    = FetchFileManifestSummaryRequestAction
    | FetchFileManifestSummarySuccessAction
    | DownloadFileManifestAction
    | DownloadFileManifestRequestedAction;
