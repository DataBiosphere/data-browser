import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "bw-file-search",
    templateUrl: "./file-search.component.html",
    styleUrls: ["./file-search.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSearchComponent {

    @Input() files: any[] = [];
    @Input() donors: any[] = [];

    @Output() search = new EventEmitter<{searchTerm: string; type: string}>();
    @Output() termSelected = new EventEmitter<{facet: string; term: string}>();

    constructor() {
        console.log("constructor");
    }

    onSearchFiles(searchTerm: string) {
        this.search.emit({
            searchTerm: searchTerm,
            type: "file"
        });
    }

    onSearchDonors(searchTerm: string) {

        this.search.emit({
            searchTerm: searchTerm,
            type: "file-donor"
        });
    }

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
