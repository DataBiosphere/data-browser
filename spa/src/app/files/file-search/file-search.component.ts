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
    styleUrls: ["./file-search.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSearchComponent {

    // Inputs
    @Input() files: any[] = [];
    @Input() donors: any[] = [];

    // Outputs
    @Output() search = new EventEmitter<{searchTerm: string; type: string}>();
    @Output() termSelected = new EventEmitter<{facet: string; term: string}>();

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

    selectFilter(type: string, term: any) {

        const filter = {
            facet: "",
            term: term.id
        };
        if (type === "file") {
            filter.facet = "id";
        }
        else if (type === "donor") {
            filter.facet = "donorId";
        }
        this.termSelected.emit(filter);
    }
}
