/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";

// App dependencies
import { BaseGetManifestComponent } from "../base-get-manifest.component.ts/base-get-manifest.component";
import { SearchTerm } from "../../search/search-term.model";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";
import { ManifestDownloadFormat } from "../../shared/manifest-download-format.model";
import { CurlEscapePipe } from "../../../pipe/curl-escape/curl-escape.pipe";

@Component({
    selector: "bulk-download",
    templateUrl: "./bulk-download.component.html",
    styleUrls: ["./bulk-download.component.scss"]
})
export class BulkDownloadComponent extends BaseGetManifestComponent implements OnDestroy, OnInit {
    
    private curlEscape = new CurlEscapePipe();

    /**
     * Return the curl command for the generated manifest.
     * 
     * @param {string} url
     * @returns {string}
     */
    public getUrlCommand(url: string): string {

        const escapedUrl = this.curlEscape.transform(url);
        return `curl "${escapedUrl}" | curl -K -`;
    }

    /**
     * Track click on copy of bulk download data link.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(selectedSearchTerms: SearchTerm[], manifestUrl: string) {

        // this.fileManifestService.trackCopyToClipboardCohortManifestLink(selectedSearchTerms, manifestUrl); TODO (mim) - add tracking of copy to clipboard
    }

    /**
     * Dispatch action to generate bulk download URL. Also track export action with GA.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     */
    public onRequestManifest(selectedSearchTerms: SearchTerm[]) {

        // this.fileManifestService.trackRequestCohortManifest(selectedSearchTerms); TODO (mim) - add tracking of bulk download
        this.store.dispatch(new FetchFileManifestUrlRequestAction(ManifestDownloadFormat.CURL));
    }
}
