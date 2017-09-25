import { Action } from "@ngrx/store";
import { FileManifestSummary } from "../../file-manifest-summary/file-manifest-summary";
import { Dictionary } from "app/shared/dictionary";

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

export type All
    = FetchFileManifestSummaryRequestAction
    | FetchFileManifestSummarySuccessAction
    | DownloadFileManifestAction;
