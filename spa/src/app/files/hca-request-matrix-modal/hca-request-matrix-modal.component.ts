// Core dependencies
import { AppState } from "../../_ngrx/app.state";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

// App dependencies
import { FileFacet } from "../shared/file-facet.model";
import { FileSummary } from "../file-summary/file-summary";
import { MatDialogRef } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { selectFileSummary, selectSelectedFileFacets } from "../_ngrx/file.selectors";

@Component({
    templateUrl: "./hca-request-matrix-modal.component.html",
    styleUrls: ["./hca-request-matrix-modal.component.scss"]
})
export class HCARequestMatrixModalComponent implements OnInit {

    // Privates
    public selectFileSummary$: Observable<FileSummary>;
    public selectedFileFacets$: Observable<FileFacet[]>;
    public step: number;
    private store: Store<AppState>;

    // Template variables
    hideDownload = false;

    constructor(store: Store<AppState>, public dialogRef: MatDialogRef<HCARequestMatrixModalComponent>) {
        this.step = 1;
        this.store = store;
    }

    /**
     * Close the dialog on click of view instructions.
     */
    public closeDialog() {

        this.dialogRef.close();
    }

    /**
     * Dispatch action to download matrix expression.
     */
    public onDownloadMatrix() {
        // Download Matrix
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * Dispatch action to request matrix expression.
     */
    public onRequestMatrix() {

        // Request the matrix expression.
        this.step = 2;
    }

    /**
     * Returns true - if user has requested matrix, is waiting for matrix, or can download matrix.
     * @param step
     * @returns {boolean}
     */
    public isStep(step): boolean {

        return step === this.step;
    }

    /**
     * Set up selectors and request initial data set.
     */
    public ngOnInit() {

        // File Summary
        this.selectFileSummary$ = this.store.select(selectFileSummary);

        // Selected facets
        this.selectedFileFacets$ = this.store.select(selectSelectedFileFacets);

    }
}
