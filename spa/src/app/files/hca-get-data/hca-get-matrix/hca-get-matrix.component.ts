/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling get matrix.
 */

// Core dependencies
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { HCAGetMatrixState } from "./hca-get-matrix.state";
import { AppState } from "../../../_ngrx/app.state";
import { selectFileSummary } from "../../_ngrx/file.selectors";
import { CancelFetchMatrixUrlRequestAction } from "../../_ngrx/matrix/cancel-fetch-matrix-url-request.action";
import { FetchMatrixFileFormatsRequestAction } from "../../_ngrx/matrix/fetch-matrix-file-formats-request.action";
import { FetchMatrixUrlRequestAction } from "../../_ngrx/matrix/fetch-matrix-url-request.action";
import {
    selectMatrixFileFormats,
    selectMatrixPartialQueryMatch,
    selectMatrixResponse
} from "../../_ngrx/matrix/matrix.selectors";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { MatrixFormat } from "../../shared/matrix-format.model";
import { MatrixResponse } from "../../shared/matrix-response.model";
import { MatrixService } from "../../shared/matrix.service";
import { FetchMatrixPartialQueryMatchRequestAction } from "../../_ngrx/matrix/fetch-matrix-partial-query-match-request.action";
import { ClearMatrixPartialQueryMatchAction } from "../../_ngrx/matrix/clear-matrix-partial-query-match.action";

@Component({
    selector: "hca-get-matrix",
    templateUrl: "./hca-get-matrix.component.html",
    styleUrls: ["./hca-get-matrix.component.scss"]
})
export class HCAGetMatrixComponent implements OnDestroy, OnInit {

    // Template variables
    public fileFormat = MatrixFormat.loom;
    public state$: Observable<HCAGetMatrixState>;

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {MatrixService} matrixService
     * @param {Store<AppState>} store
     */
    constructor(private matrixService: MatrixService,
                private store: Store<AppState>) {
    }

    /**
     * Format time remaining into human-readable format.
     *
     * @param {string} eta
     * @returns {string}
     */
    public formatETA(eta: string): string {

        if ( !eta ) {
            return "";
        }

        return eta;
    }

    /**
     * Return the possible set of file formats for downloading the matrix.
     * @param {HCAGetMatrixState} state
     * @returns {string[]}
     */
    public getFileFormats(state: HCAGetMatrixState): string[] {

        const formats = state.matrixFileFormats.filter((fileFormat: string) => {
            return fileFormat !== MatrixFormat.zarr;
        });
        return formats.sort();
    }

    /**
     * Return the link to download the matrix.
     *
     * @returns {string}
     */
    public getMatrixLink(response: MatrixResponse): string {

        return response.matrixUrl;
    }


    /**
     * Return the file name of the download
     *
     * @returns {string}
     */
    public getMatrixDownloadFileName(response: MatrixResponse): string {

        const tokens = response.matrixUrl.split("/");
        return tokens[tokens.length - 1];
    }

    /**
     * Returns true if an ETA is specified in the matrix response.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isETASpecified(response: MatrixResponse): boolean {

        return !!response.eta;
    }

    /**
     * Returns true if request for partial query warnings is completed.
     *
     * @param {boolean} partialQueryMatch
     * @returns {boolean}
     */
    public isPartialQueryMatchCompleted(partialQueryMatch: boolean): boolean {

        return (partialQueryMatch === true || partialQueryMatch === false);
    }

    /**
     * Returns true if matrix has been requested and request is completed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestCompleted(response: MatrixResponse): boolean {

        return !!response && this.matrixService.isMatrixUrlRequestCompleted(response);
    }

    /**
     * Returns true if matrix has been requested and request is completed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestFailed(response: MatrixResponse): boolean {

        return !!response && this.matrixService.isMatrixUrlRequestFailed(response);
    }

    /**
     * Returns true if matrix request is in progress.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestInProgress(response: MatrixResponse): boolean {

        return !!response &&
            (this.matrixService.isMatrixUrlRequestInitiated(response) ||
                this.matrixService.isMatrixUrlRequestInProgress(response));
    }

    /**
     * Returns true if matrix has not yet been requested.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestNew(response: MatrixResponse): boolean {

        return !response || this.matrixService.isMatrixUrlRequestNotStarted(response);
    }

    /**
     * Request matrix.
     *
     * @param {MatrixFormat} fileFormat
     */
    public onRequestMatrix(fileFormat: MatrixFormat) {

        this.store.dispatch(new FetchMatrixUrlRequestAction(fileFormat));
    }

    /**
     * Kill subscriptions on destroy of component.
     */
    public ngOnDestroy() {

        this.store.dispatch(new ClearMatrixPartialQueryMatchAction());
        this.store.dispatch(new CancelFetchMatrixUrlRequestAction());
        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

    /**
     * Grab data to display on modal.
     */
    public ngOnInit() {

        // Grab the file summary for displaying on the modal
        const selectFileSummary$ = this.store.pipe(select(selectFileSummary));

        // Grab the selected facets for displaying on the modal
        const selectSelectedSearchTerms$ = this.store.pipe(select(selectSelectedSearchTerms));

        // Request possible set of file types
        this.store.dispatch(new FetchMatrixFileFormatsRequestAction());
        const selectMatrixFileFormats$ = this.store.pipe(select(selectMatrixFileFormats));

        // Update the UI with any changes in the matrix URL request status
        const selectMatrixResponse$ = this.store.pipe(select(selectMatrixResponse));

        // Determine the matrix partial query match status
        this.store.dispatch(new FetchMatrixPartialQueryMatchRequestAction());
        const selectMatrixPartialQueryMatch$ = this.store.pipe(select(selectMatrixPartialQueryMatch));

        // Update state
        this.state$ =
            combineLatest(
                selectFileSummary$,
                selectSelectedSearchTerms$,
                selectMatrixFileFormats$,
                selectMatrixResponse$,
                selectMatrixPartialQueryMatch$
            )
            .pipe(
                map(([
                    fileSummary, selectedSearchTerms, matrixFileFormats, matrixResponse, matrixPartialQueryMatch]) => {

                    return {
                        fileSummary,
                        matrixPartialQueryMatch,
                        matrixFileFormats,
                        matrixResponse,
                        selectedSearchTerms
                    };
                })
            );
    }
}
