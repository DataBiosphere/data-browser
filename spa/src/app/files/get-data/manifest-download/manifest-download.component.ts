/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, Input, OnDestroy, OnInit } from "@angular/core";

// App dependencies
import { BaseManifestDownloadComponent } from "../base-manifest-download.component.ts/base-manifest-download.component";
import { Catalog } from "../../catalog/catalog.model";
import { SearchTerm } from "../../search/search-term.model";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";

@Component({
    selector: "manifest-download",
    templateUrl: "./manifest-download.component.html",
    styleUrls: ["./manifest-download.component.scss"]
})
export class ManifestDownloadComponent extends BaseManifestDownloadComponent implements OnDestroy, OnInit {

    @Input() catalog: Catalog;

    /**
     * Track click on copy of manifest data link.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(catalog: Catalog, selectedSearchTerms: SearchTerm[], manifestUrl: string) {

        this.fileManifestService.trackCopyToClipboardCohortManifestLink(catalog, selectedSearchTerms, manifestUrl);
    }

    /**
     * Track click on manifest data link.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} manifestUrl
     */
    public onDataLinkClicked(catalog: Catalog, selectedSearchTerms: SearchTerm[], manifestUrl: string) {

        this.fileManifestService.trackDownloadCohortManifest(catalog, selectedSearchTerms, manifestUrl);
    }

    /**
     * Dispatch action to generate manifest summary URL.  Also track export action with GA.
     *
     * @param {Catalog} catalog
     * @param {SearchTerm[]} selectedSearchTerms
     */
    public onRequestManifest(catalog: Catalog, selectedSearchTerms: SearchTerm[]) {

        this.fileManifestService.trackRequestCohortManifest(catalog, selectedSearchTerms);
        this.store.dispatch(new FetchFileManifestUrlRequestAction());
    }
}
