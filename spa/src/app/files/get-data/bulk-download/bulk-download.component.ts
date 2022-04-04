/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying bulk download component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

// App dependencies
import { BaseManifestDownloadComponent } from "../base-manifest-download.component.ts/base-manifest-download.component";
import { BulkDownloadExecutionEnvironment } from "./bulk-download-execution-environment.model";
import { ConfigService } from "../../../config/config.service";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { AppState } from "../../../_ngrx/app.state";
import { CopyToClipboardBulkDownloadAction } from "../../_ngrx/get-data/copy-to-clipboard-bulk-download.action";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";
import { RequestBulkDownloadAction } from "../../_ngrx/get-data/request-bulk-download.action";
import EntitySpec from "../../shared/entity-spec";
import { SearchTerm } from "../../search/search-term.model";

@Component({
    selector: "bulk-download",
    templateUrl: "./bulk-download.component.html",
    styleUrls: ["./bulk-download.component.scss"],
})
export class BulkDownloadComponent
    extends BaseManifestDownloadComponent
    implements OnDestroy, OnInit
{
    // Template variables
    public executionEnvironment: BulkDownloadExecutionEnvironment =
        BulkDownloadExecutionEnvironment.BASH;

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     * @param {Router} router
     */
    constructor(
        protected configService: ConfigService,
        protected store: Store<AppState>,
        private router: Router
    ) {
        super(configService, store);
    }

    /**
     * Return the curl command for the generated manifest.
     *
     * @param {ManifestResponse} manifestResponse
     * @param {BulkDownloadExecutionEnvironment} executionEnvironment
     * @returns {string}
     */
    public getCurlCommand(
        manifestResponse: ManifestResponse,
        executionEnvironment: BulkDownloadExecutionEnvironment
    ): string {
        return manifestResponse.commandLine[executionEnvironment];
    }

    /**
     * Return user to species selection
     */
    public getBackButtonTab(): EntitySpec[] {
        const key = "Species Selection";
        return [
            {
                key,
                displayName: key,
            },
        ];
    }

    /**
     * Returns true if bulk download request form is valid. That is, at least one file format as well as the operating
     * system (for the curl command) are selected.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} os
     * @returns {boolean}
     */
    public isRequestFormValid(
        selectedSearchTerms: SearchTerm[],
        os: BulkDownloadExecutionEnvironment
    ): boolean {
        return this.isAnyFileFormatSelected(selectedSearchTerms) && !!os;
    }

    /**
     * Track click on copy of bulk download data link.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} shell
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(
        selectedSearchTerms: SearchTerm[],
        shell: BulkDownloadExecutionEnvironment,
        manifestUrl: string
    ) {
        this.store.dispatch(
            new CopyToClipboardBulkDownloadAction(shell, manifestUrl)
        );
    }

    /**
     * Dispatch action to generate bulk download URL. Also track export action with GA.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {BulkDownloadExecutionEnvironment} shell
     */
    public onRequestManifest(
        selectedSearchTerms: SearchTerm[],
        shell: BulkDownloadExecutionEnvironment
    ) {
        this.store.dispatch(
            new FetchFileManifestUrlRequestAction(ManifestDownloadFormat.CURL)
        );
        this.store.dispatch(new RequestBulkDownloadAction(shell));
    }

    /**
     * Handle click on back button.
     */
    public onTabSelected(): void {
        this.router.navigate(
            ["/export", "get-curl-command", "select-species"],
            {
                queryParamsHandling: "preserve",
            }
        );
    }
}
