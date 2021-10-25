/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component responsible for displaying get manifest component, and handling the corresponding functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { ConfigService } from "../../../config/config.service";
import { FacetTermSelectedEvent } from "../../facet/file-facet/facet-term-selected.event";
import { FileFacetName } from "../../facet/file-facet/file-facet-name.model";
import { ManifestResponse } from "../../file-manifest/manifest-response.model";
import { ManifestStatus } from "../../file-manifest/manifest-status.model";
import { FileTypeSummary } from "../../file-summary/file-type-summary.model";
import { ManifestDownloadState } from "./manifest-download.state";
import { AppState } from "../../../_ngrx/app.state";
import { ClearFileManifestFileTypeSummaries } from "../../_ngrx/file-manifest/clear-file-manifest-file-type.summaries";
import { FetchFileManifestFileTypeSummariesRequestAction } from "../../_ngrx/file-manifest/fetch-file-manifest-file-type-summaries-request.action";
import { ClearFileManifestUrlAction } from "../../_ngrx/file-manifest/clear-file-manifest-url.action";
import { selectFileManifestFileTypeSummaries, selectFileManifestManifestResponse } from "../../_ngrx/file-manifest/file-manifest.selectors";
import { SelectFileFacetTermAction } from "../../_ngrx/search/select-file-facet-term.action";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { SearchTerm } from "../../search/search-term.model";
import { GASource } from "../../../shared/analytics/ga-source.model";

@Component({
    selector: "base-manifest-download",
    template: "" // No template for base class
})
export class BaseManifestDownloadComponent implements OnDestroy, OnInit {

    // Template variables
    public portalURL: string;
    public state$: Observable<ManifestDownloadState>;

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {ConfigService} configService
     * @param {Store<AppState>} store
     */
    constructor(
        protected configService: ConfigService,
        protected store: Store<AppState>) {

        this.portalURL = this.configService.getPortalUrl();
    }

    /**
     * Returns true if any "fileFormat" facet terms are selected.
     * @param {SearchTerm[]} selectedSearchTerms
     * @returns {boolean}
     */
    public isAnyFileFormatSelected(selectedSearchTerms: SearchTerm[]): boolean {

        return selectedSearchTerms.some(selectedSearchTerm => 
            selectedSearchTerm.getSearchKey() === FileFacetName.FILE_FORMAT);
    }

    /**
     * Returns true if there no file type summaries.
     */
    public isFileTypeSummariesEmpty(fileTypeSummaries: FileTypeSummary[]): boolean {

        return fileTypeSummaries.length === 0;
    }

    /**
     * Returns true if download has completed.
     *
     * @param {ManifestResponse} manifestResponse
     * @returns {boolean}
     */
    public isDownloadComplete(manifestResponse: ManifestResponse): boolean {

        return manifestResponse.status === ManifestStatus.COMPLETE;
    }

    /**
     * Returns true if download has been initiated but is not yet complete.
     *
     * @param {ManifestResponse} manifestResponse
     * @returns {boolean}
     */
    public isDownloadInProgress(manifestResponse: ManifestResponse): boolean {

        return manifestResponse.status === ManifestStatus.IN_PROGRESS;
    }

    /**
     * Returns true if download has not yet been initiated.
     *
     * @param {ManifestResponse} manifestResponse
     * @returns {boolean}
     */
    public isDownloadNotStarted(manifestResponse: ManifestResponse): boolean {

        return manifestResponse.status === ManifestStatus.NOT_STARTED;
    }

    /**
     * Handle click on term in list of terms - update store to toggle selected value of term.
     *
     * @param facetTermSelectedEvent {FacetTermSelectedEvent}
     */
    public onFacetTermSelected(facetTermSelectedEvent: FacetTermSelectedEvent) {

        const action = new SelectFileFacetTermAction(
            facetTermSelectedEvent.facetName,
            facetTermSelectedEvent.termName,
            facetTermSelectedEvent.selected,
            GASource.COHORT_MANIFEST);
        this.store.dispatch(action);
    }

    /**
     * Clear summary and kill subscriptions on exit of component.
     */
    public ngOnDestroy() {

        // Clear file manifest download-specific file summary from store
        this.store.dispatch(new ClearFileManifestFileTypeSummaries());
        
        // Clear file manifest download request status, if any, from store
        this.store.dispatch(new ClearFileManifestUrlAction());

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // Kick off request for file summaries, ignoring any currently selected file types. Required for displaying
        // file types form.
        this.store.dispatch(new FetchFileManifestFileTypeSummariesRequestAction());

        // Grab the current set of selected search terms. Required for display in ride side stats.
        const selectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));

        // Grab file summary for populating file type counts. Required for display in ride side stats.
        const fileTypeSummaries$ = this.store.pipe(select(selectFileManifestFileTypeSummaries));

        // Update the UI with any changes in the download request request status and URL.
        const fileManifestManifestResponse$ = this.store.pipe(select(selectFileManifestManifestResponse));

        this.state$ = combineLatest([
            selectedSearchTerms$,
            fileTypeSummaries$,
            fileManifestManifestResponse$
        ]).pipe(
            map(([selectedSearchTerms, fileTypeSummaries, manifestResponse]) => {

                const selectedSearchTermNames = selectedSearchTerms
                    .map(searchTerm => searchTerm.getDisplayValue());

                return {
                    selectedSearchTermNames: selectedSearchTermNames,
                    selectedSearchTerms,
                    fileTypeSummaries,
                    manifestResponse
                };
            })
        );
    }
}
