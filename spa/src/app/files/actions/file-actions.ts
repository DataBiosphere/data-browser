import { Action } from "@ngrx/store";
import { ACTIONS } from "../../shared/boardwalk.actions";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileFacet } from "../shared/file-facet.model";
import { FileFacetMetadata } from "../file-facet-metadata/file-facet-metadata.model";

export class RequestFileManifestSummaryAction implements Action {
    public readonly type = ACTIONS.REQUEST_FILE_MANIFEST_SUMMARY;
}


export class RequestDownloadFileManifestAction implements Action {
    public readonly type = ACTIONS.REQUEST_DOWNLOAD_FILE_MANIFEST;
}

export class RequestFileSummaryAction implements Action {
    public readonly type = ACTIONS.REQUEST_FILE_SUMMARY;
}


export class ReceiveDownloadFileManifestAction implements Action {
    public readonly type = ACTIONS.RECEIVE_DOWNLOAD_FILE_MANIFEST;
}


export class SelectFileFacetAction implements Action {
    public readonly type = ACTIONS.FILE_FACET_SELECTED;
    payload: FileFacetSelectedEvent;

    constructor(event: FileFacetSelectedEvent) {
        this.payload = event;
    }
}

export class FileFacetsReceivedAction implements Action {
    public readonly type = ACTIONS.FILE_FACETS_RECEIVED;
    public readonly payload: FileFacet[];

    constructor(fileFacets: FileFacet[]) {
        this.payload = fileFacets;
    }
}

export class ClearSelectedFacetAction implements Action {
    public readonly type = ACTIONS.CLEAR_SELECTED_FACET;

    constructor() {}
}

export class FileFacetMetadataSummaryRequestedAction implements Action {
    public readonly type = ACTIONS.FILE_FACET_METADATA_SUMMARY_REQUESTED;
}

export class FileFacetMetadataSummaryReceivedAction implements Action {
    public readonly type = ACTIONS.FILE_FACET_METADATA_SUMMARY_RECEIVED;
    public readonly payload: FileFacetMetadata[];

    constructor(fileFacetMetadata: FileFacetMetadata[]) {
        this.payload = fileFacetMetadata;
    }
}
