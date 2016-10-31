import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from "@angular/core";
import { FileFacet } from "./file-facets";

@Component({
    selector: "bw-file-facets",
    templateUrl: "./file-facets.component.html",
    styleUrls: ["./file-facets.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileFacetsComponent {

    @Input() facets: FileFacet[];

    @Output() termSelected = new EventEmitter<{facet: string; term: string}>();

    selectFacetTerm(facet: FileFacet, term: {name: string; count: number}) {
        this.termSelected.emit({facet: facet.name, term: term.name});
    }
}
