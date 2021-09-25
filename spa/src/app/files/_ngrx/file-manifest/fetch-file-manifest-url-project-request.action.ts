/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Action that is triggered when user has requested file manifest URL for a specific project.
 */

// Core dependencies
import { Action } from "@ngrx/store";

// App dependencies
import { Facet } from "../../facet/facet.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { SearchTerm } from "../../search/search-term.model";

export class FetchFileManifestUrlProjectRequestAction implements Action {

    public static ACTION_TYPE = "FILE.FILE_MANIFEST_SUMMARY.FETCH_FILE_MANIFEST_URL_PROJECT_REQUEST";
    public readonly type = FetchFileManifestUrlProjectRequestAction.ACTION_TYPE;

    /**
     * @param {string} projectId
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {Facet} fileFormatFacet
     * @param {ManifestDownloadFormat} manifestFormat
     */
    constructor(public readonly projectId: string, 
                public readonly selectedSearchTerms: SearchTerm[], 
                public readonly fileFormatFacet: Facet,
                public readonly manifestFormat = ManifestDownloadFormat.COMPACT) {}
}
