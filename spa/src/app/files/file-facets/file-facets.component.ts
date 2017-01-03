import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";
import { FileFacetSelectedEvent } from "./file-facet.events";
import { FileFacet } from "../shared/file-facet.model";
import { Term } from "../shared/term.model";

@Component({
    selector: "bw-file-facets",
    templateUrl: "./file-facets.component.html",
    styleUrls: ["./file-facets.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetsComponent {

    @Input() fileFacets: FileFacet[];

    @Output() termSelected = new EventEmitter<FileFacetSelectedEvent>();

    selectFacetTerm(fileFacet: FileFacet, term: Term) {

        this.termSelected.emit(new FileFacetSelectedEvent(fileFacet,term));
    }

    getTermStyle(termSelected:boolean) {

        if (termSelected) {
            return "hotpink";
        } else {
            return "black";
        }
    }
}
