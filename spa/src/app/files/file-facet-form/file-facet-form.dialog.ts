// Core dependencies
import { Component, OnInit } from "@angular/core";
import { MdDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

// App dependencies
import { SelectFileFacetAction } from "../actions/file-actions";
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { selectFileFacetByName } from "../files.reducer";
import { FileFacet } from "../shared/file-facet.model";
import { BoardwalkStore } from "../../shared/boardwalk.model";

/**
 * Component for displaying facet edit mode (displayed inside MD dialog).
 */
@Component({
    selector: "file-facet-form",
    templateUrl: "./file-facet-form.dialog.html",
    styleUrls: ["./file-facet-form.dialog.scss"]
})
export class FileFacetFormDialog implements OnInit {

    // Public variables
    public fileFacetName: string;

    // Privates
    private dialogRef: MdDialogRef<FileFacetFormDialog>;
    private store: Store<BoardwalkStore>;
    private fileFacet$: Observable<FileFacet>;

    /**
     * Inject dialog ref so we can close dialog from template, as well as store so we can get the latest state of the
     * facet.
     *
     * @param dialogRef {MdDialogRef<FileFacetFormDialog>}
     * @param store {Store}
     */
    constructor (dialogRef: MdDialogRef<FileFacetFormDialog>, store: Store<BoardwalkStore>) {

        this.dialogRef = dialogRef;
        this.store = store;
    }

    /**
     * Public API
     */

    /**
     * Handle selection of facet term - dispatch update of state to store.
     *
     * @param fileFacetSelectedEvent {FileFacetSelectedEvent}
     */
    onFacetTermSelected(fileFacetSelectedEvent: FileFacetSelectedEvent): void {

        this.store.dispatch(new SelectFileFacetAction(fileFacetSelectedEvent));
    }

    /**
     * Hooks
     */

    /**
     * Set up selector to retrieve latest state of selected facet, from store.
     */
    public ngOnInit() {

        // TODO revisit selector/reducer/function thingo here.
        this.fileFacet$ = selectFileFacetByName(this.store, this.fileFacetName);
    }
}