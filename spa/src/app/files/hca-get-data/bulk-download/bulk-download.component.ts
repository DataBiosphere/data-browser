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
import { BulkDownloadExecutionEnvironment } from "./bulk-download-execution-environment.model";
import { SearchTerm } from "../../search/search-term.model";
import { FetchFileManifestUrlRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-url-request.action";
import { ManifestDownloadFormat } from "../../shared/manifest-download-format.model";
import { ManifestResponse } from "../../shared/manifest-response.model";

@Component({
    selector: "bulk-download",
    templateUrl: "./bulk-download.component.html",
    styleUrls: ["./bulk-download.component.scss"]
})
export class BulkDownloadComponent extends BaseGetManifestComponent implements OnDestroy, OnInit {

    // Template variables
    public executionEnvironment: BulkDownloadExecutionEnvironment = BulkDownloadExecutionEnvironment.BASH; // Default to bash for now as this is currently the only option

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
     * Returns the set of radio button options representing the supported shells that the bulk download curl command can
     * run on.
     * 
     * TODO not currently visible (see isShellOptionsVisible)
     *
     * @returns {BulkDownloadExecutionEnvironment[]}
     */
    public getShellOptions(): BulkDownloadExecutionEnvironment[] {

        return [
            BulkDownloadExecutionEnvironment.BASH,
            BulkDownloadExecutionEnvironment.CMD_EXE
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
    public isRequestFormValid(selectedSearchTerms: SearchTerm[], os: BulkDownloadExecutionEnvironment): boolean {
        
        return this.isAnyFileFormatSelected(selectedSearchTerms) && !!os;
    }

    /**
     * Shell options are currently disabled until exe curl is implemented.
     * 
     * TODO disable radio buttons once Windows option is available (and remove default value for executionEnvironment)
     * 
     * @returns {boolean}
     */
    public isShellOptionsVisible(): boolean {
        
        return false;
    }

    /**
     * Track click on copy of bulk download data link.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     * @param {string} manifestUrl
     */
    public onDataLinkCopied(selectedSearchTerms: SearchTerm[], manifestUrl: string) {

        // this.fileManifestService.trackCopyToClipboardCohortManifestLink(selectedSearchTerms, manifestUrl); TODO (mim) - add tracking of copy to clipboard, review providers in spec
    }

    /**
     * Dispatch action to generate bulk download URL. Also track export action with GA.
     *
     * @param {SearchTerm[]} selectedSearchTerms
     */
    public onRequestManifest(selectedSearchTerms: SearchTerm[]) {

        // this.fileManifestService.trackRequestCohortManifest(selectedSearchTerms); TODO (mim) - add tracking of bulk download, review providers in spec
        this.store.dispatch(new FetchFileManifestUrlRequestAction(ManifestDownloadFormat.CURL));
    }
}
