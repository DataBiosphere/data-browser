/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { BaseManifestDownloadComponent } from "../base-manifest-download.component.ts/base-manifest-download.component";
import { Catalog } from "../../catalog/catalog.model";
import { ConfigService } from "../../../config/config.service";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";
import { AppState } from "../../../_ngrx/app.state";
import { SearchTerm } from "../../search/search-term.model";

@Component({
    selector: "manifest-download",
    templateUrl: "./manifest-download.component.html",
    styleUrls: ["./manifest-download.component.scss"]
})
export class ManifestDownloadComponent extends BaseManifestDownloadComponent implements OnDestroy, OnInit {

    @Input() catalog: Catalog;

    /**
     * @param {ConfigService} configService
     * @param {FileManifestService} fileManifestService
     * @param {Store<AppState>} store
     * @param {Router} router
     */
    constructor(protected configService: ConfigService,
                protected fileManifestService: FileManifestService,
                protected store: Store<AppState>,
                private router: Router) {
        super(configService, fileManifestService, store);
    }

    /**
     * Handle click on back button; return user to get data options.
     */
    public onBackClicked() {

        this.router.navigate(["/export"], {
            queryParamsHandling: "preserve"
        });
    }

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
