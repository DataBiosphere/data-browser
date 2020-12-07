/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, Input, OnDestroy, OnInit } from "@angular/core";

// App dependencies
import { BaseGetManifestComponent } from "../base-get-manifest.component.ts/base-get-manifest.component";
import { SearchTerm } from "../../search/search-term.model";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";

@Component({
    selector: "hca-get-manifest",
    templateUrl: "./hca-get-manifest.component.html",
    styleUrls: ["./hca-get-manifest.component.scss"]
})
export class HCAGetManifestComponent extends BaseGetManifestComponent implements OnDestroy, OnInit {
    
    // Inputs
    @Input() v2: boolean;

    /**
     * Track click on copy of manifest data link.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(selectedSearchTerms: SearchTerm[], manifestUrl: string) {

        this.fileManifestService.trackCopyToClipboardCohortManifestLink(selectedSearchTerms, manifestUrl);
    }

    /**
     * Track click on manifest data link.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} manifestUrl
     */
    public onDataLinkClicked(selectedSearchTerms: SearchTerm[], manifestUrl: string) {

        this.fileManifestService.trackDownloadCohortManifest(selectedSearchTerms, manifestUrl);
    }

    /**
     * Dispatch action to generate manifest summary URL.  Also track export action with GA.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     */
    public onRequestManifest(selectedSearchTerms: SearchTerm[]) {

        this.fileManifestService.trackRequestCohortManifest(selectedSearchTerms);
        this.store.dispatch(new FetchFileManifestUrlRequestAction());
    }
}
