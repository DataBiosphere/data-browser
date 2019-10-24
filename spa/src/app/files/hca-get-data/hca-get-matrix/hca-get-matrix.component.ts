/**
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Component handling get matrix.
 */

// Core dependencies
import { Component, OnDestroy, OnInit } from "@angular/core";
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
    selectMatrixUrlRequestsBySpecies
} from "../../_ngrx/matrix/matrix.selectors";
import { selectSelectedSearchTerms } from "../../_ngrx/search/search.selectors";
import { MatrixFormat } from "../../shared/matrix-format.model";
import { MatrixUrlRequest } from "../../shared/matrix-url-request.model";
import { MatrixService } from "../../shared/matrix.service";
import { FetchMatrixPartialQueryMatchRequestAction } from "../../_ngrx/matrix/fetch-matrix-partial-query-match-request.action";
import { ClearMatrixPartialQueryMatchAction } from "../../_ngrx/matrix/clear-matrix-partial-query-match.action";
import { MatrixUrlRequestStatus } from "../../shared/matrix-url-request-status.model";

@Component({
    selector: "hca-get-matrix",
    templateUrl: "./hca-get-matrix.component.html",
    styleUrls: ["./hca-get-matrix.component.scss"]
})
export class HCAGetMatrixComponent implements OnDestroy, OnInit {

    // Template variables
    public state$: Observable<HCAGetMatrixState>;

    // Locals
    private ngDestroy$ = new Subject<boolean>();

    /**
     * @param {MatrixService} matrixService
     * @param {Store<AppState>} store
     */
    constructor(private matrixService: MatrixService,
                private store: Store<AppState>) {
    }

    /**
     * Return the possible set of file formats for downloading the matrix.
     * 
     * @param {string[]} matrixFileFormats
     * @returns {string[]}
     */
    public getFileFormats(matrixFileFormats: string[]): string[] {

        const formats = matrixFileFormats.filter((fileFormat: string) => {
            return fileFormat !== MatrixFormat.zarr;
        });
        return formats.sort();
    }

    /**
     * Return the MatrixUrlRequestStatus MANIFEST_IN_PROGRESS, used for switching in the template
     */
    public getStatusManifestInProgress(): MatrixUrlRequestStatus {

        return MatrixUrlRequestStatus.MANIFEST_IN_PROGRESS;
    }

    /**
     * Return the MatrixUrlRequestStatus NOT_STARTED, used for switching in the template
     */
    public getStatusNotStarted(): MatrixUrlRequestStatus {

        return MatrixUrlRequestStatus.NOT_STARTED;
    }

    /**
     * Request matrix.
     *
     * @param {MatrixFormat} fileFormat
     */
    public onMatrixUrlRequested(fileFormat: MatrixFormat) {

        this.store.dispatch(new FetchMatrixUrlRequestAction(fileFormat, this.ngDestroy$));
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

        // Request possible set of file types
        this.store.dispatch(new FetchMatrixFileFormatsRequestAction());

        // Determine the matrix partial query match status
        this.store.dispatch(new FetchMatrixPartialQueryMatchRequestAction());

        // Update state
        this.state$ =
            combineLatest(
                // Grab the file summary for displaying on the modal
                this.store.pipe(select(selectFileSummary)),
                // Grab the selected facets for displaying on the modal
                this.store.pipe(select(selectSelectedSearchTerms)),
                // Grab the set of matrix file formats
                this.store.pipe(select(selectMatrixFileFormats)),
                // Get the status of each matrix URL request
                this.store.pipe(select(selectMatrixUrlRequestsBySpecies)),
                // Grab the partial query match status
                this.store.pipe(select(selectMatrixPartialQueryMatch))
            )
            .pipe(
                map(([
                    fileSummary, selectedSearchTerms, matrixFileFormats, matrixUrlRequestsBySpecies, matrixPartialQueryMatch]) => {

                    const matrixPartialQueryMatchCompleted =
                        (matrixPartialQueryMatch === true || matrixPartialQueryMatch === false);

                    const matrixUrlRequests = Array.from(matrixUrlRequestsBySpecies.values()) as MatrixUrlRequest[];
                    const matrixUrlRequestStatus =
                        this.matrixService.calculateOverallMatrixUrlRequestStatus(matrixUrlRequests);

                    return {
                        fileSummary,
                        matrixPartialQueryMatch,
                        matrixPartialQueryMatchCompleted,
                        matrixFileFormats,
                        matrixUrlRequests,
                        selectedSearchTerms,
                        matrixUrlRequestStatus
                    };
                })
            );
    }
}
