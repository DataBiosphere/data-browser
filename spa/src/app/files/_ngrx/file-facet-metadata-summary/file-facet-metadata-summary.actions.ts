import { Action } from "@ngrx/store";
import { FileFacetMetadata } from "../../file-facet-metadata/file-facet-metadata.model";

export class FetchFileFacetMetadataSummaryRequestAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_METADATA_SUMMARY.FETCH_REQUEST";
    public readonly type = FetchFileFacetMetadataSummaryRequestAction.ACTION_TYPE;
    constructor() {}
}

export class FetchFileFacetMetadataSummarySuccessAction implements Action {
    public static ACTION_TYPE = "FILE.FILE_FACET_METADATA_SUMMARY.FETCH_SUCCESS";
    public readonly type = FetchFileFacetMetadataSummarySuccessAction.ACTION_TYPE;
    constructor(public readonly fileFacetMetadataSummary: FileFacetMetadata[]) {}
}

export type All
    = FetchFileFacetMetadataSummaryRequestAction
    | FetchFileFacetMetadataSummarySuccessAction;
