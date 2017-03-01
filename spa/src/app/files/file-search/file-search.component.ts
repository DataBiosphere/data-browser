// Core dependencies
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild } from "@angular/core";

// App dependencies
import { FileFacetSelectedEvent } from "../file-facets/file-facet.events";
import { FileSearchConfig } from "./file-search-config.model";
import { CcTypeaheadComponent } from "../../cc-typeahead/cc-typeahead.component";
import { CCTypeaheadSearchEvent } from "../../cc-typeahead/cc-typeahead-search.event";

/**
 * Component for displaying search, and handling the corresponding behavior.
 */
@Component({
    selector: "bw-file-search",
    templateUrl: "./file-search.component.html",
    styleUrls: ["./file-search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSearchComponent {

    // Inputs
    @Input() files: any[] = [];
    @Input() fileSearchConfig: FileSearchConfig;

    // Outputs
    @Output() search = new EventEmitter<{ searchTerm: string; type: string }>();
    @Output() termSelected = new EventEmitter<FileFacetSelectedEvent>();

    // Child/ren components - focus this dude on open and clear him on close.
    @ViewChild(CcTypeaheadComponent) ccTypeahead: CcTypeaheadComponent;

    /**
     * Public API
     */

    /**
     * Remove any user input from search box.
     */
    public clear(): void {

        this.ccTypeahead.clear();
    }

    /**
     * Set focus on search box.
     */
    public focus(): void {

        this.ccTypeahead.focus();
    }

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
              type: this.fileSearchConfig.searchType
        });
    }

    /**
     * File has been selected from options, clear the current value of the typeahead and emit selected event.
     *
     * @param term {any}
     */
    onSelectFile(term: any) {

        this.termSelected.emit(new FileFacetSelectedEvent(this.fileSearchConfig.fileFacetName, term.id));
        this.ccTypeahead.clear();
    }
}
