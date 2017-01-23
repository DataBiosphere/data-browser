// Core dependencies
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

/**
 * Component for displaying file ID autosuggest, and handling the corresponding behavior.
 *
 * TODO split file and donor searches into separate components, remove donor specific code from here as well as selectFilter function. Also remove donors$-related functionality from files.component.
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
    // @Input() donors: any[] = [];

    // Outputs
    @Output() search = new EventEmitter<{searchTerm: string; type: string}>();
    @Output() termSelected = new EventEmitter<{facet: string; term: string}>();

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
     * @param searchTerm {string}
     */
    onSearchFiles(searchTerm: string) {

        this.search.emit({
            searchTerm: searchTerm,
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

    selectFilter(term: any) {

        const filter = {
            facet: "id",
            term: term.id
        };
        // if (type === "file") {
        //     filter.facet = "id";
        // }
        // else if (type === "donor") {
        //     filter.facet = "donorId";
        // }

        // FileFacetSelectedEvent
        this.termSelected.emit(filter);
    }
}
