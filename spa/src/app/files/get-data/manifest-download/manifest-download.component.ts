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
import { CopyToClipboardCohortManifestURLAction } from "../../_ngrx/cohort-manifest/copy-to-clipboard-cohort-manifest-url.action";
import { DownloadCohortManifestAction } from "../../_ngrx/cohort-manifest/download-cohort-manifest.action";
import { RequestCohortManifestAction } from "../../_ngrx/cohort-manifest/request-cohort-manifest.action";
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
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(manifestUrl: string) {

        this.store.dispatch(new CopyToClipboardCohortManifestURLAction(manifestUrl));
    }

    /**
     * Track click on manifest data link.
     *
     * @param {string} manifestUrl
     */
    public onDataLinkClicked(manifestUrl: string) {

        this.store.dispatch(new DownloadCohortManifestAction(manifestUrl));
    }

    /**
     * Dispatch action to generate manifest summary URL.  Also track request action with GA.
     */
    public onRequestManifest() {

        this.store.dispatch(new FetchFileManifestUrlRequestAction());
        this.store.dispatch(new RequestCohortManifestAction());
    }
}
