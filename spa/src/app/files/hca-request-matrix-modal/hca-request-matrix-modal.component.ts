/**
 * UCSC Genomics Institute - CGL
 * https://cgl.genomics.ucsc.edu/
 *
 * Component handling matrix request modal-related functionality.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import * as moment from "moment";
import { Store } from "@ngrx/store";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/takeWhile";

import { Observable } from "rxjs/Observable";

// App dependencies
import { HCARequestMatrixModalState } from "./hca-request-matrix-modal.state";
import { MatrixService } from "../shared/matrix.service";
import { AppState } from "../../_ngrx/app.state";
import { selectFileSummary, selectSelectedFileFacets } from "../_ngrx/file.selectors";
import { FileFacet } from "../shared/file-facet.model";
import { MatrixFormat } from "../shared/matrix-format.model";
import { MatrixResponse } from "../shared/matrix-response.model";
import { Subject } from "rxjs/Subject";

@Component({
    templateUrl: "./hca-request-matrix-modal.component.html",
    styleUrls: ["./hca-request-matrix-modal.component.scss"]
})
export class HCARequestMatrixModalComponent implements OnDestroy, OnInit {

    // Template variables
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

        return moment.duration(eta, "ms").humanize(false);
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
     * @param {FileFacet[]} selectedFacets
     */
    public onRequestMatrix(selectedFacets: FileFacet[]) {

        // Request the matrix expression.
        this.matrixService
            .requestMatrix(selectedFacets, MatrixFormat.zarr)
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

        this.matrixResponse$
            // Kill subscription on destroy of component
            .takeUntil(this.ngDestroy$)
            // Keep polling until request is completed or failed
            .takeWhile((response: MatrixResponse) => {

                return this.matrixService.isMatrixRequestInProgress(response);
            })
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

        Observable
            .interval(5000)
            .take(1)
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
        const selectFileSummary$ = this.store.select(selectFileSummary);

        // Grab the selected facets for displaying on the modal
        const selectSelectedFileFacets$ = this.store.select(selectSelectedFileFacets);

        // Set up listener to poll for matrix request completion
        this.initMatrixDownloadPoller();

        // Grab file summary and selected facets for displaying on the modal
        this.state$ = selectFileSummary$.combineLatest(selectSelectedFileFacets$, (fileSummary, selectedFileFacets) => {

            return {
                fileSummary,
                selectedFileFacets
            };
        });
    }
}
