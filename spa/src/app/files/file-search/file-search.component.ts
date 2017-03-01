// Core dependencies
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from "@angular/core";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { CcTypeaheadComponent } from "../../cc-typeahead/cc-typeahead.component";
import { CCTypeaheadSearchEvent } from "../../cc-typeahead/cc-typeahead-search.event";

/**
 * Component for displaying file ID autosuggest, and handling the corresponding behavior.
 *
 * TODO split file and donor searches into separate components, remove donor specific code from here as well as
 * selectFilter function. Also remove donors$-related functionality from files.component.
 */
@Component({
    selector: "bw-file-search",
    templateUrl: "./file-search.component.html",
    styleUrls: ["./file-search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSearchComponent {

    // set type

    // Inputs
    @Input() files: any[] = [];

    // Outputs
    @Output() search = new EventEmitter<{ searchTerm: string; type: string }>();
    @Output() termSelected = new EventEmitter<FileFacetSelectedEvent>();

    // Child/ren components focus this dude on open and clear him on close.
    @ViewChild(CcTypeaheadComponent) ccTypeahead: CcTypeaheadComponent;

    /**
     * Public API
     */

    /**
     * Returns true if there are no files found matching the specified search criteria.
     *
     * @returns {boolean}
     */
    isEmptyResultSet(): boolean {

        return !!this.files && !!this.files.length;
    }

    /**
     * Emit search event to parent component.
     *
     * @param event {CCTypeaheadSearchEvent}
     */
    onSearchFiles(event: CCTypeaheadSearchEvent) {

        this.search.emit({
            searchTerm: event.searchTerm,
           // type: "file"
              type: "file"
        });
    }

    // onSearchDonors(searchTerm: string) {
    //
    //     this.search.emit({
    //         searchTerm: searchTerm,
    //         type: "file-donor"
    //     });
    // }

    /**
     * File has been selected from options, clear the current value of the typeahead and emit selected event.
     *
     * @param term {any}
     */
    onSelectFile(term: any) {

        // if (type === "file") {
        //     filter.facet = "id";
        // }
        // else if (type === "donor") {
        //     filter.facet = "donorId";
        // }

        this.termSelected.emit(new FileFacetSelectedEvent("fileId", term.id));
        this.ccTypeahead.clear();
    }

    clear() {
        this.ccTypeahead.clear();
    }

    focus() {
        this.ccTypeahead.focus();
    }
}
