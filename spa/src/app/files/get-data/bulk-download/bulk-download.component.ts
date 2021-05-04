/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { BaseManifestDownloadComponent } from "../base-manifest-download.component.ts/base-manifest-download.component";
import { BulkDownloadExecutionEnvironment } from "./bulk-download-execution-environment.model";
import { ConfigService } from "../../../config/config.service";
import { FileManifestService } from "../../file-manifest/file-manifest.service";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { AppState } from "../../../_ngrx/app.state";
import { CopyToClipboardBulkDownloadAction } from "../../_ngrx/get-data/copy-to-clipboard-bulk-download.action";
import { RequestBulkDownloadAction } from "../../_ngrx/get-data/request-bulk-download.action";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";
import { SearchTerm } from "../../search/search-term.model";

@Component({
    selector: "bulk-download",
    templateUrl: "./bulk-download.component.html",
    styleUrls: ["./bulk-download.component.scss"]
})
export class BulkDownloadComponent extends BaseManifestDownloadComponent implements OnDestroy, OnInit {

    // Template variables
    public executionEnvironment: BulkDownloadExecutionEnvironment = BulkDownloadExecutionEnvironment.BASH;

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
     * Return the curl command for the generated manifest.
     * 
     * @param {ManifestResponse} manifestResponse
     * @param {BulkDownloadExecutionEnvironment} executionEnvironment
     * @returns {string}
     */
    public getCurlCommand(manifestResponse: ManifestResponse, executionEnvironment: BulkDownloadExecutionEnvironment): string {

        return manifestResponse.commandLine[executionEnvironment];
    }

    /**
     * Returns true if bulk download request form is valid. That is, at least one file format as well as the operating
     * system (for the curl command) are selected.
     * 
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} os
     * @returns {boolean}
     */
    public isRequestFormValid(selectedSearchTerms: SearchTerm[], os: BulkDownloadExecutionEnvironment): boolean {
        
        return this.isAnyFileFormatSelected(selectedSearchTerms) && !!os;
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
     * Track click on copy of bulk download data link.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} shell
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(selectedSearchTerms: SearchTerm[],  shell: BulkDownloadExecutionEnvironment, manifestUrl: string) {

        this.store.dispatch(new CopyToClipboardBulkDownloadAction(shell, manifestUrl));
    }

    /**
     * Dispatch action to generate bulk download URL. Also track export action with GA.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} shell
     */
    public onRequestCurl(selectedSearchTerms: SearchTerm[], shell: BulkDownloadExecutionEnvironment) {

        this.store.dispatch(new FetchFileManifestUrlRequestAction(ManifestDownloadFormat.CURL)); //  
        this.store.dispatch(new RequestBulkDownloadAction(shell)); // Tracking action
    }
}
