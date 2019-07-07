/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling matrix request modal-related functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

// App dependencies
import { HCARequestMatrixModalState } from "./hca-request-matrix-modal.state";
import { AppState } from "../../_ngrx/app.state";
import { FetchMatrixFileFormatsRequestAction } from "../_ngrx/matrix/fetch-matrix-file-formats-request.action";
import { selectFileSummary } from "../_ngrx/file.selectors";
import { selectSelectedSearchTerms } from "../_ngrx/search/search.selectors";
import { MatrixFormat } from "../shared/matrix-format.model";
import { selectMatrixFileFormats, selectMatrixResponse } from "../_ngrx/matrix/matrix.selectors";
import { FetchMatrixUrlRequestAction } from "../_ngrx/matrix/fetch-matrix-url-request.action";
import { MatrixResponse } from "../shared/matrix-response.model";
import { MatrixService } from "../shared/matrix.service";

@Component({
    templateUrl: "./hca-request-matrix-modal.component.html",
    styleUrls: ["./hca-request-matrix-modal.component.scss"]
})
export class HCARequestMatrixModalComponent implements OnDestroy, OnInit {

    // Template variables
    public downloadAs = false;
    public fileFormat = MatrixFormat.loom;
    public state$: Observable<HCARequestMatrixModalState>;

    // Locals
    private ngDestroy$ = new Subject();

    /**
     * @param {MatrixService} matrixService
     * @param {Store<AppState>} store
     * @param {MatDialogRef<HCARequestMatrixModalComponent>} dialogRef
     */
    constructor(private matrixService: MatrixService,
                private store: Store<AppState>,
                private dialogRef: MatDialogRef<HCARequestMatrixModalComponent>) {
    }

    /**
     * Close the dialog on click of view instructions.
     */
    public closeDialog() {

        this.dialogRef.close();
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
     *
     * @param {HCARequestMatrixModalState} state
     * @returns {string[]}
     */
    public getFileFormats(state: HCARequestMatrixModalState): string[] {

        const formats = state.matrixFileFormats.filter((fileFormat: string) => {
            return fileFormat !== MatrixFormat.zarr;
        });
        return formats.sort();
    }

    /**
     * Return the matrix URL when generating the value to back the copy to clipboard functionality.
     *
     * @returns {string}
     */
    public getCopyToClipboardValue(response: MatrixResponse): string {

        return this.getMatrixLink(response);
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
     * Returns true if an ETA is specified in the matrix response.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isETASpecified(response: MatrixResponse): boolean {

        return !!response.eta;
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
     * Shows/hides "save as" instructions.
     */
    public onDownloadAs() {

        this.downloadAs = !this.downloadAs;
    }

    /**
     * Download matrix from URL specified in matrix response.
     *
     * @param {MatrixResponse} response
     */
    public onDownloadMatrix(response: MatrixResponse) {

        window.location.href = this.getMatrixLink(response);
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

        // Grab file summary and selected facets for displaying on the modal
        this.state$ =
            combineLatest(selectFileSummary$, selectSelectedSearchTerms$, selectMatrixFileFormats$, selectMatrixResponse$)
                .pipe(
                    map(([fileSummary, selectedSearchTerms, matrixFileFormats, matrixResponse]) => {

                        return {
                            fileSummary,
                            matrixFileFormats,
                            matrixResponse,
                            selectedSearchTerms
                        };
                    })
            );
    }
}
