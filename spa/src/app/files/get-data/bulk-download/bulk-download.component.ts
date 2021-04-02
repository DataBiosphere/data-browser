/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";

// App dependencies
import { BaseManifestDownloadComponent } from "../base-manifest-download.component.ts/base-manifest-download.component";
import { BulkDownloadExecutionEnvironment } from "./bulk-download-execution-environment.model";
import { GetDataViewState } from "../get-data-view-state.model";
import { ManifestDownloadFormat } from "../../file-manifest/manifest-download-format.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
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
    public executionEnvironment: BulkDownloadExecutionEnvironment = BulkDownloadExecutionEnvironment.BASH; // Default to bash for now as this is currently the only option

    // Outputs
    @Output() manifestDownloadSelected = new EventEmitter<GetDataViewState>();
    
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
    public onRequestManifest(selectedSearchTerms: SearchTerm[], shell: BulkDownloadExecutionEnvironment) {

        this.store.dispatch(new FetchFileManifestUrlRequestAction(ManifestDownloadFormat.CURL));
        this.store.dispatch(new RequestBulkDownloadAction(shell));
    }

    /**
     * Let parent components know related manifest has been requested.
     */
    public onDownloadManifestClicked() {

        this.manifestDownloadSelected.emit(GetDataViewState.MANIFEST);
    }
}
