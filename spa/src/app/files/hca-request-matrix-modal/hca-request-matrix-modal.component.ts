/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component handling matrix request modal-related functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { combineLatest, interval, Observable, Subject } from "rxjs";
import { map, take, takeUntil, takeWhile } from "rxjs/operators";

// App dependencies
import { HCARequestMatrixModalState } from "./hca-request-matrix-modal.state";
import { AppState } from "../../_ngrx/app.state";
import { FetchMatrixFileFormatsRequestAction } from "../_ngrx/matrix/matrix.actions";
import { selectFileSummary, selectMatrixFileFormats } from "../_ngrx/file.selectors";
import { selectSearchTerms } from "../_ngrx/search/search.selectors";
import { MatrixFormat } from "../shared/matrix-format.model";
import { MatrixResponse } from "../shared/matrix-response.model";
import { SearchTerm } from "../search/search-term.model";
import { MatrixService } from "../shared/matrix.service";

@Component({
    templateUrl: "./hca-request-matrix-modal.component.html",
    styleUrls: ["./hca-request-matrix-modal.component.scss"]
})
export class HCARequestMatrixModalComponent implements OnDestroy, OnInit {

    // Template variables
    public downloadAs = false;
    public fileFormat = MatrixFormat.loom;
    public matrixResponse$ = new Subject<MatrixResponse>();
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
     * Return the curl command to download the matrix.
     *
     * @returns {string}
     */
    public getMatrixCurlCommand(response: MatrixResponse): string {

        const link = this.getMatrixLink(response);
        const fileName = link.split("/").pop();
        return `curl ${link} --output ${fileName}`;
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

        return !!response && this.matrixService.isMatrixRequestCompleted(response);
    }

    /**
     * Returns true if matrix has been requested and request is completed.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestFailed(response: MatrixResponse): boolean {

        return !!response && this.matrixService.isMatrixRequestFailed(response);
    }

    /**
     * Returns true if matrix request is in progress.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestInProgress(response: MatrixResponse): boolean {

        return !!response &&
            this.matrixService.isMatrixRequestInProgress(response) &&
            !this.matrixService.isMatrixRequestCompleted(response);
    }

    /**
     * Returns true if matrix has not yet been requested.
     *
     * @param {MatrixResponse} response
     * @returns {boolean}
     */
    public isRequestNew(response: MatrixResponse): boolean {

        return !response;
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
     * @param {SearchTerm[]} searchTerms
     * @param {MatrixFormat} fileFormat
     */
    public onRequestMatrix(searchTerms: SearchTerm[], fileFormat: MatrixFormat) {

        // Request the matrix expression.
        this.matrixService
            .requestMatrix(searchTerms, fileFormat)
            .subscribe(response => { // Auto unsubscribes as there is only a single response from underlying HTTP call.
                this.matrixResponse$.next(response);
            });
    }

    /**
     * Privates
     */

    /**
     * Set up listener to poll for matrix request completion.
     */
    private initMatrixDownloadPoller() {

        this.matrixResponse$.pipe(
            // Kill subscription on destroy of component
            takeUntil(this.ngDestroy$),
            // Keep polling until request is completed or failed
            takeWhile((response: MatrixResponse) => {

                return this.matrixService.isMatrixRequestInProgress(response);
            })
        )
        // Request is still in progress - check status again
        .subscribe((response: MatrixResponse) => {

            return this.updateMatrixStatus(response.requestId);
        });
    }

    /**
     * Core polling functionality; request update of matrix request status, after a delay of five seconds.
     *
     * @param {string} matrixRequestKey
     */
    private updateMatrixStatus(matrixRequestKey: string) {

        interval(5000).pipe(
            take(1)
        )
        .subscribe(() => {

            this.matrixService.getMatrixStatus(matrixRequestKey)
                .subscribe(response => { // Auto unsubscribes as there is only a single response from underlying HTTP call.

                    this.matrixResponse$.next(response);
                });
        });
    }

    /**
     * Life cycle hooks
     */

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
        const selectSearchTerms$ = this.store.pipe(select(selectSearchTerms));

        // Request possible set of file types
        this.store.dispatch(new FetchMatrixFileFormatsRequestAction());
        const selectMatrixFileFormats$ = this.store.pipe(select(selectMatrixFileFormats));

        // Set up listener to poll for matrix request completion
        this.initMatrixDownloadPoller();

        // Grab file summary and selected facets for displaying on the modal
        this.state$ =
            combineLatest(selectFileSummary$, selectSearchTerms$, selectMatrixFileFormats$).pipe(
                    map((combined) => {

                        return {
                            fileSummary: combined[0],
                            matrixFileFormats: combined[2],
                            searchTerms: combined[1]
                        };
                    })
            );
    }
}
